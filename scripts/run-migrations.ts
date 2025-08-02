const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Enable Promise-based file system operations
const fsPromises = fs.promises;

// Database connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.NEON_DB_URL,
  ssl: {
    rejectUnauthorized: false, // For development only
  },
});

// Get all migration files in order
async function getMigrationFiles() {
  const migrationsDir = path.join(process.cwd(), 'src/migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Sort to ensure they run in order
  
  return files.map(file => ({
    name: file,
    path: path.join(migrationsDir, file)
  }));
}

// Check if a migration has already been run
async function isMigrationRun(client: any, name: string): Promise<boolean> {
  try {
    const result = await client.query(
      'SELECT 1 FROM migrations WHERE name = $1',
      [name]
    );
    return result.rowCount > 0;
  } catch (error) {
    // If the migrations table doesn't exist yet, return false
    if ((error as any).code === '42P01') { // 42P01 = undefined_table
      return false;
    }
    throw error;
  }
}

// Mark a migration as run
async function markMigrationAsRun(client: any, name: string) {
  await client.query(
    'INSERT INTO migrations (name, run_at) VALUES ($1, NOW())',
    [name]
  );
}

// Create migrations table if it doesn't exist
async function ensureMigrationsTable(client: any) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      run_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `);
}

// Run migrations
async function runMigrations() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Ensure migrations table exists
    await ensureMigrationsTable(client);
    
    // Get all migration files
    const migrations = await getMigrationFiles();
    let migrationsRun = 0;
    
    console.log('Checking for pending migrations...');
    
    for (const migration of migrations) {
      const alreadyRun = await isMigrationRun(client, migration.name);
      
      if (!alreadyRun) {
        console.log(`Running migration: ${migration.name}`);
        
        // Read and execute the migration SQL
        const sql = fs.readFileSync(migration.path, 'utf8');
        await client.query(sql);
        
        // Record the migration
        await markMigrationAsRun(client, migration.name);
        migrationsRun++;
        console.log(`✓ Applied migration: ${migration.name}`);
      } else {
        console.log(`✓ Already applied: ${migration.name}`);
      }
    }
    
    await client.query('COMMIT');
    console.log(`\nMigrations complete. Applied ${migrationsRun} new migration(s).`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error running migrations:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the migrations
runMigrations().catch(error => {
  console.error('Failed to run migrations:', error);
  process.exit(1);
});
