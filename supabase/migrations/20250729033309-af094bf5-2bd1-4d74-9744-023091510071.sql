
-- Enable Row Level Security on all tables
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiers ENABLE ROW LEVEL SECURITY;

-- Create policies for members table
CREATE POLICY "Users can view their own member data" 
  ON public.members 
  FOR SELECT 
  USING (auth.uid()::text = id::text);

CREATE POLICY "Service role can insert members" 
  ON public.members 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own member data" 
  ON public.members 
  FOR UPDATE 
  USING (auth.uid()::text = id::text);

-- Create policies for founders table
CREATE POLICY "Users can view their own founder data" 
  ON public.founders 
  FOR SELECT 
  USING (auth.uid()::text = member_id::text);

CREATE POLICY "Service role can insert founders" 
  ON public.founders 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own founder data" 
  ON public.founders 
  FOR UPDATE 
  USING (auth.uid()::text = member_id::text);

-- Create policies for partners table
CREATE POLICY "Users can view their own partner data" 
  ON public.partners 
  FOR SELECT 
  USING (auth.uid()::text = member_id::text);

CREATE POLICY "Service role can insert partners" 
  ON public.partners 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own partner data" 
  ON public.partners 
  FOR UPDATE 
  USING (auth.uid()::text = member_id::text);

-- Create policies for investors table
CREATE POLICY "Users can view their own investor data" 
  ON public.investors 
  FOR SELECT 
  USING (auth.uid()::text = member_id::text);

CREATE POLICY "Service role can insert investors" 
  ON public.investors 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own investor data" 
  ON public.investors 
  FOR UPDATE 
  USING (auth.uid()::text = member_id::text);

-- Create policies for payment_intents table
CREATE POLICY "Users can view their own payment intents" 
  ON public.payment_intents 
  FOR SELECT 
  USING (auth.uid()::text = member_id::text);

CREATE POLICY "Service role can manage payment intents" 
  ON public.payment_intents 
  FOR ALL 
  WITH CHECK (true);

-- Create policies for member_subscriptions table
CREATE POLICY "Users can view their own subscriptions" 
  ON public.member_subscriptions 
  FOR SELECT 
  USING (auth.uid()::text = member_id::text);

CREATE POLICY "Service role can manage subscriptions" 
  ON public.member_subscriptions 
  FOR ALL 
  WITH CHECK (true);

-- Create policies for tiers table (public read access)
CREATE POLICY "Anyone can view tiers" 
  ON public.tiers 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only service role can modify tiers" 
  ON public.tiers 
  FOR ALL 
  USING (false) 
  WITH CHECK (false);

-- Create a security definer function to safely get user role
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID AS $$
  SELECT auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create a function to handle new user registration with proper validation
CREATE OR REPLACE FUNCTION public.create_member_with_validation(
  p_user_type text,
  p_email text,
  p_first_name text,
  p_last_name text,
  p_phone text DEFAULT NULL,
  p_country_id integer DEFAULT NULL,
  p_linkedin_url text DEFAULT NULL,
  p_website_url text DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_member_id uuid;
  v_email_pattern text := '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
  v_url_pattern text := '^https?://[^\s/$.?#].[^\s]*$';
BEGIN
  -- Input validation
  IF p_user_type IS NULL OR p_user_type = '' THEN
    RAISE EXCEPTION 'User type is required';
  END IF;
  
  IF p_email IS NULL OR p_email = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  
  IF p_email !~ v_email_pattern THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  IF p_first_name IS NULL OR p_first_name = '' THEN
    RAISE EXCEPTION 'First name is required';
  END IF;
  
  IF p_last_name IS NULL OR p_last_name = '' THEN
    RAISE EXCEPTION 'Last name is required';
  END IF;
  
  -- Validate URLs if provided
  IF p_linkedin_url IS NOT NULL AND p_linkedin_url != '' AND p_linkedin_url !~ v_url_pattern THEN
    RAISE EXCEPTION 'Invalid LinkedIn URL format';
  END IF;
  
  IF p_website_url IS NOT NULL AND p_website_url != '' AND p_website_url !~ v_url_pattern THEN
    RAISE EXCEPTION 'Invalid website URL format';
  END IF;
  
  -- Check if email already exists
  IF EXISTS (SELECT 1 FROM public.members WHERE email = p_email) THEN
    RAISE EXCEPTION 'Email already exists';
  END IF;
  
  -- Insert member
  INSERT INTO public.members (
    user_type,
    email,
    first_name,
    last_name,
    phone,
    country_id,
    linkedin_url,
    website_url
  ) VALUES (
    p_user_type::user_type,
    p_email,
    p_first_name,
    p_last_name,
    p_phone,
    p_country_id,
    p_linkedin_url,
    p_website_url
  ) RETURNING id INTO v_member_id;
  
  RETURN v_member_id;
END;
$$;

-- Create audit trigger for sensitive operations
CREATE OR REPLACE FUNCTION public.audit_member_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Log new member creation
    RAISE LOG 'New member created: %', NEW.email;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Log member updates
    RAISE LOG 'Member updated: %', NEW.email;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Log member deletion
    RAISE LOG 'Member deleted: %', OLD.email;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for audit logging
CREATE TRIGGER audit_members_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.audit_member_changes();
