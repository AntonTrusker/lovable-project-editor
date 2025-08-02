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

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log('Running database initialization...');
    
    // Read and execute schema
    console.log('Executing schema...');
    const schemaPath = join(__dirname, 'schema.sql');
    const schemaSql = readFileSync(schemaPath, 'utf8');
    
    // Split the SQL file into individual statements and execute them one by one
    const schemaStatements = schemaSql
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    const client = await pool.connect();
    try {
      for (const statement of schemaStatements) {
        if (statement) {
          try {
            await client.query(statement);
          } catch (error) {
            console.error('Error executing statement:', statement);
            throw error;
          }
        }
      }
      
      // Read and execute seed data
      console.log('Seeding initial data...');
      const seedPath = join(__dirname, 'seed.sql');
      const seedSql = readFileSync(seedPath, 'utf8');
      
      // Split the SQL file into individual statements and execute them one by one
      const seedStatements = seedSql
        .split(';')
        .map(statement => statement.trim())
        .filter(statement => statement.length > 0);
      
      for (const statement of seedStatements) {
        if (statement) {
          try {
            await client.query(statement);
          } catch (error) {
            console.error('Error executing statement:', statement);
            throw error;
          }
        }
      }
    } finally {
      client.release();
    }
    
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

runMigrations().catch(console.error).finally(() => process.exit(0));
