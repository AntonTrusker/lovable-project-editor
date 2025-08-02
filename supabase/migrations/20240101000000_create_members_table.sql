-- Create members table
CREATE TABLE IF NOT EXISTS public.members (
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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_members_email ON public.members (email);
CREATE INDEX IF NOT EXISTS idx_members_status ON public.members (status);

-- Add row level security
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Create policies for row level security
CREATE POLICY "Enable read access for authenticated users" 
ON public.members 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Enable insert for service role"
ON public.members
FOR INSERT
TO service_role
WITH CHECK (true);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at column
CREATE TRIGGER update_members_updated_at
BEFORE UPDATE ON public.members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a function to notify when a new member is added
CREATE OR REPLACE FUNCTION notify_new_member()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('new_member', json_build_object(
        'id', NEW.id,
        'email', NEW.email,
        'tier', NEW.membership_tier,
        'amount', NEW.amount_paid
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to send notification when a new member is added
CREATE TRIGGER new_member_notification
AFTER INSERT ON public.members
FOR EACH ROW
EXECUTE FUNCTION notify_new_member();
