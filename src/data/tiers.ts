
import { Tier } from '@/types/supabase';

export const tiers: Tier[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Step inside & watch the sparks fly.',
    price: 0,
    display_price: 'Free',
    original_price: 0,
    currency: 'EUR',
    is_active: true,
    user_types: ['founder'],
    features: [
      'Digital Explorer Badge: Shareable proof you were here first',
      'Dynamic QR Art: Personalised graphic linking to your referral profile',
      'Premium Sticker Pack',
      'Event Directory Access: Browse all public events',
      'Monthly Digest: Roadmap updates and partner promotions'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ignite',
    name: 'Ignite',
    description: 'You\'ve sparked the flame—welcome to the Circle.',
    price: 79,
    display_price: '€79',
    original_price: 0,
    currency: 'EUR',
    is_active: true,
    user_types: ['founder'],
    features: [
      'Ignite Card: Matte-graphite PVC card with QR profile link',
      'Welcome Merch Pack: Minimalist T-shirt (black or white) and sticker trio',
      'Ignite Zone Community: Private channel for idea-stage builders',
      'Exclusive Event Access: Quarterly virtual meet-ups and early-bird registration',
      'Permanent Recognition: Name on the digital Wall of Founding Sparks'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'forge',
    name: 'Forge',
    description: 'You\'re shaping something real—let\'s build it together.',
    price: 299,
    display_price: '€299',
    original_price: 0,
    currency: 'EUR',
    is_active: true,
    user_types: ['founder'],
    features: [
      'Forge Card: Brushed-aluminium, NFC-enabled card, individually numbered',
      'Forge Merch Kit: Premium T-shirt & Hoodie with TheFounders branding',
      'Forge Circle Masterminds: Private, industry-specific mastermind groups',
      'Priority Event Access: Regional meet-ups, Beta Weekend, closed workshops',
      'Advanced Tools: Early access to co-founder matcher, pitch vault, investor discovery',
      'Complimentary 6-month Pro Plan upon launch'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    description: 'You\'re on the front-lines of scale—lead with others like you.',
    price: 699,
    display_price: '€699',
    original_price: 0,
    currency: 'EUR',
    is_active: true,
    user_types: ['founder'],
    features: [
      'Vanguard Card: Gold-tinted titanium card with NFC & dynamic QR',
      'Elite Merch Capsule: Premium T-shirt, Hoodie, plus numbered field notebook',
      'Vanguard Council: High-signal peer group with curated introductions',
      'VIP Event Access: VIP check-in, complimentary tickets, exclusive quarterly meetups',
      'Platform Showcase: Featured profile in Founders of 2025 showcase',
      'Lifetime 25% discount on all future TF services'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'legacy',
    name: 'Legacy',
    description: 'You\'ve walked the road—now help define it for others.',
    price: 1399,
    display_price: '€1,399',
    original_price: 0,
    currency: 'EUR',
    is_active: true,
    user_types: ['founder'],
    features: [
      'Legacy Card: Black steel card with diamond-accent and personalised Founder Code',
      'Legacy Capsule: Premium merch, special present, and framed Legacy Letter',
      'The Hall: Lifetime seat in strategic advisory group, nominate Founder-in-Residence',
      'Ultimate Event Access: Lifetime ticket-free access to every TF event',
      'Permanent Legacy: Founder story in Legacy Library, lifetime tool access'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Helper function to get popular tier
export const getPopularTier = () => tiers.find(tier => tier.id === 'forge');

// Helper function to get recommended tier  
export const getRecommendedTier = () => tiers.find(tier => tier.id === 'explorer');
