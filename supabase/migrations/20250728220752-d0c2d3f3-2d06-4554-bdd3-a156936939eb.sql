
-- Create user type enum
CREATE TYPE public.user_type AS ENUM ('founder', 'partner', 'investor');

-- Create enhanced members table
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type public.user_type NOT NULL DEFAULT 'founder',
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  linkedin_url VARCHAR(255),
  website_url VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create founders table for founder-specific data
CREATE TABLE IF NOT EXISTS public.founders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  startup_stage VARCHAR(50),
  company_name VARCHAR(255),
  industry VARCHAR(100),
  team_size INTEGER,
  funding_stage VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create partners table for partner-specific data
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  company_type VARCHAR(100),
  services_offered TEXT,
  years_experience INTEGER,
  partnership_type VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create investors table for investor-specific data
CREATE TABLE IF NOT EXISTS public.investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  investor_type VARCHAR(50) NOT NULL,
  investment_focus TEXT,
  ticket_size_min INTEGER,
  ticket_size_max INTEGER,
  preferred_stages TEXT,
  portfolio_size INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create enhanced tiers table
CREATE TABLE IF NOT EXISTS public.tiers (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  display_price VARCHAR(20),
  original_price DECIMAL(10, 2),
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  is_active BOOLEAN DEFAULT TRUE,
  user_types public.user_type[] DEFAULT ARRAY['founder', 'partner', 'investor'],
  features JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create payment_intents table
CREATE TABLE IF NOT EXISTS public.payment_intents (
  id VARCHAR(255) PRIMARY KEY,
  member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
  tier_id VARCHAR(20) REFERENCES public.tiers(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'usd',
  status VARCHAR(50) NOT NULL,
  client_secret TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create member_subscriptions table
CREATE TABLE IF NOT EXISTS public.member_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  tier_id VARCHAR(20) NOT NULL REFERENCES public.tiers(id) ON DELETE RESTRICT,
  payment_intent_id VARCHAR(255) REFERENCES public.payment_intents(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for members
CREATE POLICY "Users can view their own member profile" ON public.members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own member profile" ON public.members
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow member creation" ON public.members
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for founders
CREATE POLICY "Users can view their own founder profile" ON public.founders
  FOR SELECT USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own founder profile" ON public.founders
  FOR UPDATE USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Allow founder profile creation" ON public.founders
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for partners
CREATE POLICY "Users can view their own partner profile" ON public.partners
  FOR SELECT USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own partner profile" ON public.partners
  FOR UPDATE USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Allow partner profile creation" ON public.partners
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for investors
CREATE POLICY "Users can view their own investor profile" ON public.investors
  FOR SELECT USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their own investor profile" ON public.investors
  FOR UPDATE USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Allow investor profile creation" ON public.investors
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for tiers (public read)
CREATE POLICY "Tiers are publicly readable" ON public.tiers
  FOR SELECT USING (is_active = true);

-- Create RLS policies for payment_intents
CREATE POLICY "Users can view their own payment intents" ON public.payment_intents
  FOR SELECT USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Allow payment intent creation" ON public.payment_intents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow payment intent updates" ON public.payment_intents
  FOR UPDATE USING (true);

-- Create RLS policies for member_subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.member_subscriptions
  FOR SELECT USING (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));

CREATE POLICY "Allow subscription creation" ON public.member_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow subscription updates" ON public.member_subscriptions
  FOR UPDATE USING (true);

-- Insert default tiers
INSERT INTO public.tiers (id, name, description, price, display_price, user_types, features) VALUES
('free', 'Free', 'Perfect for getting started', 0.00, 'Free', ARRAY['founder', 'partner', 'investor'], '["Community access", "Basic networking", "Resource library"]'),
('explorer', 'Explorer', 'Perfect for early-stage founders', 49.00, '$49', ARRAY['founder'], '["All Free features", "Monthly expert sessions", "Priority support"]'),
('ignite', 'Ignite', 'For founders ready to accelerate', 99.00, '$99', ARRAY['founder'], '["All Explorer features", "Weekly mentorship", "Investor introductions"]'),
('forge', 'Forge', 'For serious founders building scalable businesses', 199.00, '$199', ARRAY['founder'], '["All Ignite features", "1:1 coaching", "Advanced analytics"]'),
('partner', 'Partner', 'For service providers and partners', 149.00, '$149', ARRAY['partner'], '["Partner directory listing", "Lead generation", "Co-marketing opportunities"]'),
('investor', 'Investor', 'For angel investors and VCs', 299.00, '$299', ARRAY['investor'], '["Deal flow access", "Startup analytics", "Portfolio management tools"]');

-- Create indexes for better performance
CREATE INDEX idx_members_user_id ON public.members(user_id);
CREATE INDEX idx_members_email ON public.members(email);
CREATE INDEX idx_members_user_type ON public.members(user_type);
CREATE INDEX idx_founders_member_id ON public.founders(member_id);
CREATE INDEX idx_partners_member_id ON public.partners(member_id);
CREATE INDEX idx_investors_member_id ON public.investors(member_id);
CREATE INDEX idx_payment_intents_member_id ON public.payment_intents(member_id);
CREATE INDEX idx_member_subscriptions_member_id ON public.member_subscriptions(member_id);

-- Create update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_founders_updated_at BEFORE UPDATE ON public.founders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investors_updated_at BEFORE UPDATE ON public.investors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tiers_updated_at BEFORE UPDATE ON public.tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_intents_updated_at BEFORE UPDATE ON public.payment_intents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_member_subscriptions_updated_at BEFORE UPDATE ON public.member_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
