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

async function runSqlFile(filePath: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log(`Running SQL file: ${filePath}`);
    const sql = readFileSync(filePath, 'utf8');
    
    // Split the SQL file into individual statements and execute them one by one
    const statements = sql
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
      
      console.log('SQL file executed successfully!');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error running SQL file:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Get the file path from command line arguments
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a SQL file path as an argument');
  process.exit(1);
}

runSqlFile(filePath).catch(console.error).finally(() => process.exit(0));
