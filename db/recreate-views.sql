-- Recreate the successful_payments view
DROP VIEW IF EXISTS successful_payments;

CREATE VIEW successful_payments AS
SELECT 
    p.id AS payment_id,
    p.stripe_payment_intent_id,
    p.amount,
    p.currency,
    p.status,
    p.created_at AS payment_date,
    m.id AS member_id,
    m.email AS member_email,
    m.first_name,
    m.last_name,
    t.id AS tier_id,
    t.name AS tier_name,
    t.price AS tier_price
FROM 
    payment_intents p
JOIN 
    members m ON p.member_id = m.id
LEFT JOIN 
    tiers t ON p.tier_id = t.id
WHERE 
    p.status = 'succeeded';

-- Recreate the active_members view to ensure it's up to date
DROP VIEW IF EXISTS active_members;

CREATE VIEW active_members AS
SELECT 
    m.*,
    t.name AS current_tier_name,
    ms.start_date AS membership_start_date,
    ms.end_date AS membership_end_date,
    ms.status AS membership_status
FROM 
    members m
LEFT JOIN 
    member_subscriptions ms ON m.id = ms.member_id
LEFT JOIN 
    tiers t ON ms.tier_id = t.id
WHERE 
    ms.is_active = true;
