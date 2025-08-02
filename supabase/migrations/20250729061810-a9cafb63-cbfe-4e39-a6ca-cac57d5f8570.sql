
-- Create table for investor interest submissions
CREATE TABLE public.investor_interest_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  investor_type TEXT NOT NULL,
  additional_questions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.investor_interest_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to manage submissions
CREATE POLICY "Service role can manage investor interest submissions" 
  ON public.investor_interest_submissions 
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create policy for authenticated users to view their own submissions
CREATE POLICY "Users can view their own investor interest submissions" 
  ON public.investor_interest_submissions 
  FOR SELECT 
  TO authenticated 
  USING (auth.jwt() ->> 'email' = email);

-- Add trigger to update updated_at column
CREATE TRIGGER update_investor_interest_submissions_updated_at
  BEFORE UPDATE ON public.investor_interest_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for faster queries
CREATE INDEX idx_investor_interest_submissions_email ON public.investor_interest_submissions(email);
CREATE INDEX idx_investor_interest_submissions_created_at ON public.investor_interest_submissions(created_at);
