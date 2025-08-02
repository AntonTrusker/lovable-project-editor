import { Pool, neonConfig } from '@neondatabase/serverless';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';
import ws from 'ws';

// Configure WebSocket support for Node.js
neonConfig.webSocketConstructor = ws;

async function checkSchema() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log('Checking database schema...');
    
    // Check if tables exist
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('\nTables in database:');
    console.table(tables.rows);
    
    // Check columns in payment_intents
    if (tables.rows.some(t => t.table_name === 'payment_intents')) {
      const columns = await pool.query(`
        SELECT column_name, data_type, column_default, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'payment_intents'
        ORDER BY ordinal_position;
      `);
      
      console.log('\nColumns in payment_intents:');
      console.table(columns.rows);
    }
    
    // Check columns in member_subscriptions
    if (tables.rows.some(t => t.table_name === 'member_subscriptions')) {
      const columns = await pool.query(`
        SELECT column_name, data_type, column_default, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'member_subscriptions'
        ORDER BY ordinal_position;
      `);
      
      console.log('\nColumns in member_subscriptions:');
      console.table(columns.rows);
    }
    
  } catch (error) {
    console.error('Error checking schema:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

checkSchema().catch(console.error).finally(() => process.exit(0));
