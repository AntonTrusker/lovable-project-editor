import { Pool, neonConfig } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';
import ws from 'ws';

// Configure WebSocket support for Node.js
neonConfig.webSocketConstructor = ws;

// Get the current module's directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runFix() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log('Running database fix...');
    
    // Read and execute the fix script
    console.log('Applying fix-payment-intents.sql...');
    const fixPath = join(__dirname, 'fix-payment-intents.sql');
    const fixSql = readFileSync(fixPath, 'utf8');
    
    // Split the SQL file into individual statements and execute them one by one
    const statements = fixSql
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    const client = await pool.connect();
    try {
      for (const statement of statements) {
        if (statement) {
          try {
            console.log('Executing:', statement.split('\n')[0], '...');
            await client.query(statement);
          } catch (error) {
            console.error('Error executing statement:', statement);
            throw error;
          }
        }
      }
      
      console.log('Database fix completed successfully!');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fixing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

runFix().catch(console.error).finally(() => process.exit(0));
