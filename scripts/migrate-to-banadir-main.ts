/**
 * Database Migration for Banadir Main Integration
 * 
 * This script applies all schema changes needed to integrate with the Banadir Main system.
 * It adds necessary tables and columns to store synchronized data from the central system.
 */

import { db } from '../server/db';
import { sql } from 'drizzle-orm';

async function runMigrations() {
  console.log('Starting Banadir Main integration migration...');
  
  try {
    // Add columns to contact_submissions table
    await db.execute(sql`
      ALTER TABLE contact_submissions 
      ADD COLUMN IF NOT EXISTS synced_with_main BOOLEAN DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS main_system_id TEXT;
    `);
    console.log('✅ Updated contact_submissions table');
    
    // Add columns to users table
    await db.execute(sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS main_user_id TEXT,
      ADD COLUMN IF NOT EXISTS main_system_token TEXT,
      ADD COLUMN IF NOT EXISTS main_system_token_expiry TIMESTAMP,
      ADD COLUMN IF NOT EXISTS is_main_system_linked BOOLEAN DEFAULT FALSE;
    `);
    console.log('✅ Updated users table');
    
    // Create main_appointments table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS main_appointments (
        id SERIAL PRIMARY KEY,
        main_appointment_id TEXT NOT NULL UNIQUE,
        user_id INTEGER REFERENCES users(id),
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        appointment_date TIMESTAMP NOT NULL,
        service_type TEXT NOT NULL,
        vehicle_info JSONB,
        notes TEXT,
        status TEXT DEFAULT 'pending',
        last_synced TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created main_appointments table');
    
    // Create main_service_history table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS main_service_history (
        id SERIAL PRIMARY KEY,
        main_service_id TEXT NOT NULL UNIQUE,
        user_id INTEGER REFERENCES users(id),
        vehicle_info JSONB NOT NULL,
        service_date TIMESTAMP NOT NULL,
        service_details JSONB,
        cost INTEGER,
        last_synced TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created main_service_history table');
    
    // Create system_config table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS system_config (
        id SERIAL PRIMARY KEY,
        config_key TEXT NOT NULL UNIQUE,
        config_value TEXT,
        last_updated TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    console.log('✅ Created system_config table');
    
    // Insert initial configuration values
    await db.execute(sql`
      INSERT INTO system_config (config_key, config_value)
      VALUES 
        ('main_system_api_url', 'https://api.banadirmain.com/v1'),
        ('main_system_api_version', '1.0.0'),
        ('main_system_app_id', 'auto-repair-site'),
        ('main_system_sync_interval', '30'),
        ('main_system_features_enabled', 'true')
      ON CONFLICT (config_key) DO NOTHING;
    `);
    console.log('✅ Inserted initial configuration values');
    
    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration function
runMigrations().then(() => process.exit(0));