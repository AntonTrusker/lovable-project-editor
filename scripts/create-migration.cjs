const fs = require('fs');
const path = require('path');

// Ensure migrations directory exists
const migrationsDir = path.join(process.cwd(), 'src/migrations');
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Get migration name from command line arguments
const migrationName = process.argv[2];
if (!migrationName) {
  console.error('Please provide a migration name');
  console.log('Usage: npm run migrate:create -- <migration-name>');
  process.exit(1);
}

// Create a timestamp for the migration
const timestamp = new Date()
  .toISOString()
  .replace(/[-:]/g, '')
  .replace(/\.\d+/, '')
  .replace('T', '_')
  .replace('Z', '');

// Create migration file name
const fileName = `${timestamp}_${migrationName.replace(/[^a-zA-Z0-9_]/g, '_')}.sql`;
const filePath = path.join(migrationsDir, fileName);

// Migration template
const template = `-- Migration: ${migrationName}
-- Created at: ${new Date().toISOString()}

BEGIN;

-- Add your SQL here

-- Example:
-- CREATE TABLE example (
--   id SERIAL PRIMARY KEY,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- Don't forget to create appropriate indexes!
-- CREATE INDEX IF NOT EXISTS idx_example_created ON example (created_at);

-- Update the updated_at column automatically
-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER update_example_updated_at
-- BEFORE UPDATE ON example
-- FOR EACH ROW
-- EXECUTE FUNCTION update_updated_at_column();

COMMIT;
`;

// Write the migration file
fs.writeFileSync(filePath, template, 'utf8');
console.log(`Created migration: ${filePath}`);
