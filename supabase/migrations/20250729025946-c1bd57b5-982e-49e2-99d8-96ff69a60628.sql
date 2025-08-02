
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_type AS ENUM ('founder', 'partner', 'investor');
CREATE TYPE partnership_type AS ENUM (
  'incubator-accelerator',
  'software-technology', 
  'large-corporation',
  'event-organizer',
  'professional-services',
  'venture-capital',
  'educational-institution',
  'other'
);
CREATE TYPE partnership_interest AS ENUM (
  'early-partnership-membership',
  'sponsor-project', 
  'standard-partnership'
);

-- Countries table
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code VARCHAR(2) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Main members table
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_type user_type NOT NULL,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  country_id INTEGER REFERENCES countries(id) ON DELETE SET NULL,
  linkedin_url TEXT,
  website_url TEXT,
  stripe_customer_id TEXT UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Membership tiers table
CREATE TABLE IF NOT EXISTS tiers (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  display_price TEXT NOT NULL,
  original_price NUMERIC,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  is_active BOOLEAN DEFAULT TRUE,
  user_types user_type[] NOT NULL DEFAULT ARRAY[]::user_type[],
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Founders specific data
CREATE TABLE IF NOT EXISTS founders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  startup_stage TEXT,
  company_name TEXT,
  industry TEXT,
  team_size INTEGER,
  funding_stage TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners specific data  
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_type TEXT,
  services_offered TEXT,
  years_experience INTEGER,
  partnership_type partnership_type,
  partnership_interest partnership_interest,
  partnership_goals TEXT[],
  company_size TEXT,
  expected_partnership_model TEXT,
  additional_information TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investors specific data
CREATE TABLE IF NOT EXISTS investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  investor_type TEXT NOT NULL,
  investment_focus TEXT,
  ticket_size_min INTEGER,
  ticket_size_max INTEGER,
  preferred_stages TEXT,
  portfolio_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment intents table
CREATE TABLE IF NOT EXISTS payment_intents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_payment_intent_id TEXT NOT NULL UNIQUE,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  tier_id VARCHAR(50) REFERENCES tiers(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Member subscriptions table
CREATE TABLE IF NOT EXISTS member_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  tier_id VARCHAR(50) NOT NULL REFERENCES tiers(id) ON DELETE RESTRICT,
  payment_intent_id UUID REFERENCES payment_intents(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'active',
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_user_type ON members(user_type);
CREATE INDEX IF NOT EXISTS idx_members_stripe_customer_id ON members(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_founders_member_id ON founders(member_id);
CREATE INDEX IF NOT EXISTS idx_partners_member_id ON partners(member_id);
CREATE INDEX IF NOT EXISTS idx_investors_member_id ON investors(member_id);
CREATE INDEX IF NOT EXISTS idx_payment_intents_status ON payment_intents(status);
CREATE INDEX IF NOT EXISTS idx_member_subscriptions_member_id ON member_subscriptions(member_id);
CREATE INDEX IF NOT EXISTS idx_member_subscriptions_status ON member_subscriptions(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tiers_updated_at BEFORE UPDATE ON tiers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_founders_updated_at BEFORE UPDATE ON founders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investors_updated_at BEFORE UPDATE ON investors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_intents_updated_at BEFORE UPDATE ON payment_intents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_member_subscriptions_updated_at BEFORE UPDATE ON member_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample countries
INSERT INTO countries (name, code) VALUES 
('United States', 'US'),
('United Kingdom', 'GB'), 
('Germany', 'DE'),
('France', 'FR'),
('Canada', 'CA'),
('Australia', 'AU'),
('Netherlands', 'NL'),
('Singapore', 'SG'),
('Switzerland', 'CH'),
('Sweden', 'SE')
ON CONFLICT (code) DO NOTHING;

-- Insert membership tiers
INSERT INTO tiers (id, name, description, price, display_price, currency, user_types, features) VALUES 
(
  'founder-free', 
  'Founder - Free', 
  'Perfect for getting started with basic networking and resources',
  0,
  'Free',
  'USD',
  ARRAY['founder']::user_type[],
  ARRAY[
    'Access to founder community',
    'Basic networking tools', 
    'Monthly virtual events',
    'Startup resources library',
    'Email support'
  ]
),
(
  'founder-pro', 
  'Founder - Pro', 
  'Advanced features for growing startups and serious entrepreneurs',
  29,
  '$29/month',
  'USD', 
  ARRAY['founder']::user_type[],
  ARRAY[
    'Everything in Free',
    'AI-powered mentor matching',
    'Pitch deck reviews',
    'Investor introductions',
    'Priority support',
    'Exclusive pro events'
  ]
),
(
  'partner-standard',
  'Partner - Standard',
  'For organizations looking to connect with the startup ecosystem',
  99,
  '$99/month',
  'USD',
  ARRAY['partner']::user_type[],
  ARRAY[
    'Partner directory listing',
    'Access to founder network',
    'Event hosting capabilities',
    'Brand visibility',
    'Lead generation tools'
  ]
),
(
  'investor-access',
  'Investor - Access', 
  'For investors seeking quality deal flow and startup connections',
  149,
  '$149/month',
  'USD',
  ARRAY['investor']::user_type[],
  ARRAY[
    'Curated deal flow',
    'Startup database access',
    'AI-powered matching',
    'Due diligence tools',
    'Portfolio management',
    'Exclusive investor events'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  display_price = EXCLUDED.display_price,
  features = EXCLUDED.features,
  updated_at = NOW();
