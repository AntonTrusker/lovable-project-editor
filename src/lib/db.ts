
import { Pool } from '@neondatabase/serverless';

// Create a connection pool with the connection string from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.NEON_DB_URL,
  ssl: {
    rejectUnauthorized: false // For development only, use proper SSL in production
  },
  max: process.env.NEON_POOL_MAX ? parseInt(process.env.NEON_POOL_MAX) : 10,
  min: process.env.NEON_POOL_MIN ? parseInt(process.env.NEON_POOL_MIN) : 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the database connection
async function testConnection() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('Database connected successfully:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;
  } finally {
    client.release();
  }
}

// Run the test connection when this module is imported
testConnection().catch(console.error);

// Export the pool for use in API routes
export { pool };

// Helper function to execute a query
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', { text, error });
    throw error;
  }
}

// Helper function to get a client from the pool
export async function getClient() {
  const client = await pool.connect();
  const originalQuery = client.query;
  const originalRelease = client.release;

  // Set a timeout of 5 seconds
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
  }, 5000);

  // Enhanced client with query tracking
  const enhancedClient = {
    ...client,
    query: originalQuery,
    release: () => {
      clearTimeout(timeout);
      return originalRelease.apply(client);
    }
  };

  return enhancedClient;
}

// Helper function to run a transaction
export async function withTransaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}
