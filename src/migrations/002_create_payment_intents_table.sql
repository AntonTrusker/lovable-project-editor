-- Create payment_intents table
drop table if exists payment_intents cascade;
CREATE TABLE payment_intents (
  id SERIAL PRIMARY KEY,
  intent_id TEXT NOT NULL UNIQUE,
  amount INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payment_intents_intent_id ON payment_intents (intent_id);
CREATE INDEX IF NOT EXISTS idx_payment_intents_status ON payment_intents (status);
CREATE INDEX IF NOT EXISTS idx_payment_intents_created ON payment_intents (created_at);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update the updated_at column
CREATE OR REPLACE TRIGGER update_payment_intents_updated_at
BEFORE UPDATE ON payment_intents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a view for successful payments
CREATE OR REPLACE VIEW successful_payments AS
SELECT 
  pi.id,
  pi.intent_id,
  pi.amount,
  pi.currency,
  pi.created_at as payment_date,
  m.id as member_id,
  m.email,
  m.membership_tier
FROM payment_intents pi
LEFT JOIN members m ON m.payment_intent_id = pi.intent_id
WHERE pi.status = 'succeeded';

-- Create a function to get payment statistics
CREATE OR REPLACE FUNCTION get_payment_statistics()
RETURNS TABLE(
  total_payments BIGINT,
  total_amount BIGINT,
  avg_amount NUMERIC,
  payment_count_by_status JSONB
) AS $$
BEGIN
  RETURN QUERY
  WITH stats AS (
    SELECT 
      COUNT(*) as total_payments,
      COALESCE(SUM(amount), 0) as total_amount,
      COALESCE(AVG(amount), 0) as avg_amount
    FROM payment_intents
    WHERE status = 'succeeded'
  ),
  status_counts AS (
    SELECT 
      jsonb_object_agg(
        status, 
        COUNT(*)::text
      ) as counts
    FROM payment_intents
    GROUP BY true
  )
  SELECT 
    s.total_payments,
    s.total_amount,
    s.avg_amount,
    COALESCE(sc.counts, '{}'::jsonb) as payment_count_by_status
  FROM stats s
  CROSS JOIN status_counts sc;
END;
$$ LANGUAGE plpgsql;
