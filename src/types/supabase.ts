
export type UserType = 'founder' | 'partner' | 'investor';

export type PartnershipType = 
  | 'incubator-accelerator'
  | 'software-technology' 
  | 'large-corporation'
  | 'event-organizer'
  | 'professional-services'
  | 'venture-capital'
  | 'educational-institution'
  | 'other';

export type PartnershipInterest = 
  | 'early-partnership-membership'
  | 'sponsor-project' 
  | 'standard-partnership';

export interface Country {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  user_type: UserType;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  country_id?: number;
  linkedin_url?: string;
  website_url?: string;
  stripe_customer_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  country?: Country;
}

export interface Tier {
  id: string;
  name: string;
  description?: string;
  price: number;
  display_price: string;
  original_price?: number;
  currency: string;
  is_active: boolean;
  user_types: UserType[];
  features?: string[];
  created_at: string;
  updated_at: string;
}

export interface Founder {
  id: string;
  member_id: string;
  startup_stage?: string;
  company_name?: string;
  industry?: string;
  team_size?: number;
  funding_stage?: string;
  created_at: string;
  updated_at: string;
  member?: Member;
}

export interface Partner {
  id: string;
  member_id: string;
  company_name: string;
  company_type?: string;
  services_offered?: string;
  years_experience?: number;
  partnership_type?: PartnershipType;
  partnership_interest?: PartnershipInterest;
  partnership_goals?: string[];
  company_size?: string;
  expected_partnership_model?: string;
  additional_information?: string;
  created_at: string;
  updated_at: string;
  member?: Member;
}

export interface Investor {
  id: string;
  member_id: string;
  investor_type: string;
  investment_focus?: string;
  ticket_size_min?: number;
  ticket_size_max?: number;
  preferred_stages?: string;
  portfolio_size?: number;
  created_at: string;
  updated_at: string;
  member?: Member;
}

export interface PaymentIntent {
  id: string;
  stripe_payment_intent_id: string;
  member_id?: string;
  tier_id?: string;
  amount: number;
  currency: string;
  status: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
  member?: Member;
  tier?: Tier;
}

export interface MemberSubscription {
  id: string;
  member_id: string;
  tier_id: string;
  payment_intent_id?: string;
  status: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  member?: Member;
  tier?: Tier;
  payment_intent?: PaymentIntent;
}
