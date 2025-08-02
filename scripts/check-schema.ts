import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.NEON_DB_URL,
  ssl: {
    rejectUnauthorized: false // For development only
  }
});

async function checkSchema() {
  const client = await pool.connect();
  try {
    console.log('Checking database schema...');
    
    // Check if tables exist
    const tables = ['members', 'tiers', 'payment_intents', 'member_subscriptions'];
    
    for (const table of tables) {
      const res = await client.query(
        `SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = $1
        )`,
        [table]
      );
      
      console.log(`Table ${table} exists:`, res.rows[0].exists);
      
      if (res.rows[0].exists) {
        // Get table columns
        const columns = await client.query(
          `SELECT column_name, data_type 
           FROM information_schema.columns 
           WHERE table_name = $1`,
          [table]
        );
        
        console.log(`Columns in ${table}:`);
        console.table(columns.rows);
      }
    }
    
    // Check views
    const views = ['active_members', 'successful_payments'];
    
    for (const view of views) {
      const res = await client.query(
        `SELECT definition 
         FROM pg_views 
         WHERE viewname = $1`,
        [view]
      );
      
      console.log(`View ${view} exists:`, res.rows.length > 0);
    }
    
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

checkSchema().catch(console.error);
