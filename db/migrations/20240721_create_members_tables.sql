-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50),
  country VARCHAR(100),
  startup_stage VARCHAR(50),
  linkedin_url VARCHAR(255),
  website_url VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create tiers table
CREATE TABLE IF NOT EXISTS tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  features JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create payment_intents table (updated to use UUID)
CREATE TABLE IF NOT EXISTS payment_intents (
  id VARCHAR(255) PRIMARY KEY, -- Stripe ID
  amount INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'usd',
  status VARCHAR(50) NOT NULL,
  client_secret TEXT,
  metadata JSONB,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  tier_id UUID REFERENCES tiers(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create member_subscriptions table
CREATE TABLE IF NOT EXISTS member_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  tier_id UUID NOT NULL REFERENCES tiers(id) ON DELETE RESTRICT,
  payment_intent_id VARCHAR(255) NOT NULL REFERENCES payment_intents(id) ON DELETE RESTRICT,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_member_tier UNIQUE (member_id, tier_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_member_subscriptions_member_id ON member_subscriptions(member_id);
CREATE INDEX IF NOT EXISTS idx_member_subscriptions_tier_id ON member_subscriptions(tier_id);
CREATE INDEX IF NOT EXISTS idx_member_subscriptions_status ON member_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payment_intents_member_id ON payment_intents(member_id);
CREATE INDEX IF NOT EXISTS idx_payment_intents_tier_id ON payment_intents(tier_id);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update updated_at columns
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tiers_updated_at
BEFORE UPDATE ON tiers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_intents_updated_at
BEFORE UPDATE ON payment_intents
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_member_subscriptions_updated_at
BEFORE UPDATE ON member_subscriptions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a view for active members
CREATE OR REPLACE VIEW active_members AS
SELECT 
  m.*,
  s.tier_id,
  s.status as subscription_status,
  s.start_date as subscription_start_date,
  s.end_date as subscription_end_date,
  t.name as tier_name,
  t.price as tier_price
FROM members m
JOIN member_subscriptions s ON m.id = s.member_id
JOIN tiers t ON s.tier_id = t.id
WHERE s.status = 'active' 
AND s.end_date > NOW();

-- Create a view for successful payments
CREATE OR REPLACE VIEW successful_payments AS
SELECT 
  pi.id as payment_intent_id,
  pi.amount,
  pi.currency,
  pi.status,
  pi.created_at as payment_date,
  m.id as member_id,
  m.first_name,
  m.last_name,
  m.email,
  t.id as tier_id,
  t.name as tier_name
FROM payment_intents pi
LEFT JOIN members m ON pi.member_id = m.id
LEFT JOIN tiers t ON pi.tier_id = t.id
WHERE pi.status = 'succeeded';
