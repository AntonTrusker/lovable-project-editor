-- Fix payment_intents table to use UUID for id

-- First, drop the foreign key constraint if it exists
ALTER TABLE member_subscriptions 
DROP CONSTRAINT IF EXISTS fk_payment_intent;

-- Drop the payment_intents table
DROP TABLE IF EXISTS payment_intents;

-- Recreate the payment_intents table with UUID id
CREATE TABLE payment_intents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stripe_payment_intent_id TEXT NOT NULL UNIQUE,
    member_id UUID REFERENCES members(id) ON DELETE SET NULL,
    tier_id VARCHAR(20) REFERENCES tiers(id) ON DELETE SET NULL,
    amount INTEGER NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Recreate the foreign key constraint
ALTER TABLE member_subscriptions 
ADD CONSTRAINT fk_payment_intent 
FOREIGN KEY (payment_intent_id) 
REFERENCES payment_intents(id) 
ON DELETE SET NULL;
