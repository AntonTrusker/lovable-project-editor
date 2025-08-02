
-- Update the tiers table with the proper tier data
DELETE FROM public.tiers;

INSERT INTO public.tiers (
  id, 
  name, 
  description, 
  price, 
  display_price, 
  original_price, 
  currency, 
  is_active, 
  user_types, 
  features
) VALUES 
(
  'explorer',
  'Explorer',
  'Step inside & watch the sparks fly.',
  0,
  'Free',
  0,
  'EUR',
  true,
  ARRAY['founder']::user_type[],
  ARRAY[
    'Digital Explorer Badge: Shareable proof you were here first',
    'Dynamic QR Art: Personalised graphic linking to your referral profile',
    'Premium Sticker Pack',
    'Event Directory Access: Browse all public events',
    'Monthly Digest: Roadmap updates and partner promotions'
  ]
),
(
  'ignite',
  'Ignite',
  'You''ve sparked the flame—welcome to the Circle.',
  79,
  '€79',
  0,
  'EUR',
  true,
  ARRAY['founder']::user_type[],
  ARRAY[
    'Ignite Card: Matte-graphite PVC card with QR profile link',
    'Welcome Merch Pack: Minimalist T-shirt (black or white) and sticker trio',
    'Ignite Zone Community: Private channel for idea-stage builders',
    'Exclusive Event Access: Quarterly virtual meet-ups and early-bird registration',
    'Permanent Recognition: Name on the digital Wall of Founding Sparks'
  ]
),
(
  'forge',
  'Forge',
  'You''re shaping something real—let''s build it together.',
  299,
  '€299',
  0,
  'EUR',
  true,
  ARRAY['founder']::user_type[],
  ARRAY[
    'Forge Card: Brushed-aluminium, NFC-enabled card, individually numbered',
    'Forge Merch Kit: Premium T-shirt & Hoodie with TheFounders branding',
    'Forge Circle Masterminds: Private, industry-specific mastermind groups',
    'Priority Event Access: Regional meet-ups, Beta Weekend, closed workshops',
    'Advanced Tools: Early access to co-founder matcher, pitch vault, investor discovery',
    'Complimentary 6-month Pro Plan upon launch'
  ]
),
(
  'vanguard',
  'Vanguard',
  'You''re on the front-lines of scale—lead with others like you.',
  699,
  '€699',
  0,
  'EUR',
  true,
  ARRAY['founder']::user_type[],
  ARRAY[
    'Vanguard Card: Gold-tinted titanium card with NFC & dynamic QR',
    'Elite Merch Capsule: Premium T-shirt, Hoodie, plus numbered field notebook',
    'Vanguard Council: High-signal peer group with curated introductions',
    'VIP Event Access: VIP check-in, complimentary tickets, exclusive quarterly meetups',
    'Platform Showcase: Featured profile in Founders of 2025 showcase',
    'Lifetime 25% discount on all future TF services'
  ]
),
(
  'legacy',
  'Legacy',
  'You''ve walked the road—now help define it for others.',
  1399,
  '€1,399',
  0,
  'EUR',
  true,
  ARRAY['founder']::user_type[],
  ARRAY[
    'Legacy Card: Black steel card with diamond-accent and personalised Founder Code',
    'Legacy Capsule: Premium merch, special present, and framed Legacy Letter',
    'The Hall: Lifetime seat in strategic advisory group, nominate Founder-in-Residence',
    'Ultimate Event Access: Lifetime ticket-free access to every TF event',
    'Permanent Legacy: Founder story in Legacy Library, lifetime tool access'
  ]
);
