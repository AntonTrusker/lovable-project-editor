-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  startup_stage TEXT NOT NULL,
  linkedin_url TEXT,
  website TEXT,
  membership_tier TEXT NOT NULL,
  payment_intent_id TEXT,
  amount_paid INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_email UNIQUE (email)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members (email);
CREATE INDEX IF NOT EXISTS idx_members_status ON members (status);
CREATE INDEX IF NOT EXISTS idx_members_tier ON members (membership_tier);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at column
CREATE OR REPLACE TRIGGER update_members_updated_at
BEFORE UPDATE ON members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a function to notify when a new member is added
CREATE OR REPLACE FUNCTION notify_new_member()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('new_member', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to send notification when a new member is added
CREATE OR REPLACE TRIGGER new_member_notification
AFTER INSERT ON members
FOR EACH ROW
EXECUTE FUNCTION notify_new_member();

-- Add comments to the table and columns
COMMENT ON TABLE members IS 'Stores information about members and their membership details';
COMMENT ON COLUMN members.status IS 'Membership status: pending, active, cancelled, etc.';
COMMENT ON COLUMN members.amount_paid IS 'Amount paid in cents';
COMMENT ON COLUMN members.membership_tier IS 'The tier of membership the user has selected';

-- Create a view for active members
CREATE OR REPLACE VIEW active_members AS
SELECT id, first_name, last_name, email, membership_tier, amount_paid, created_at
FROM members
WHERE status = 'active';

-- Create a function to get member count by tier
CREATE OR REPLACE FUNCTION get_member_count_by_tier()
RETURNS TABLE(tier TEXT, member_count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT membership_tier, COUNT(*) as member_count
  FROM members
  WHERE status = 'active'
  GROUP BY membership_tier;
END;
$$ LANGUAGE plpgsql;
