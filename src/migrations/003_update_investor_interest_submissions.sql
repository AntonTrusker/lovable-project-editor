
-- Add user_type field to investor_interest_submissions table
ALTER TABLE investor_interest_submissions 
ADD COLUMN IF NOT EXISTS user_type TEXT;

-- Add country field to investor_interest_submissions table  
ALTER TABLE investor_interest_submissions 
ADD COLUMN IF NOT EXISTS country TEXT;

-- Make phone field nullable (it should already be nullable)
ALTER TABLE investor_interest_submissions 
ALTER COLUMN phone DROP NOT NULL;

-- Update RLS policies to allow service role to insert
DROP POLICY IF EXISTS "Service role can manage investor interest submissions" ON investor_interest_submissions;

CREATE POLICY "Service role can manage investor interest submissions"
ON investor_interest_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow anonymous users to insert investor interest submissions
CREATE POLICY "Anyone can submit investor interest"
ON investor_interest_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
