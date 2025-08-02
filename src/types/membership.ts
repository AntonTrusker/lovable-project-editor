
export interface BaseFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

export interface MembershipData extends BaseFormData {
  tier_id: string;
  payment_method_id?: string;
  coupon_code?: string;
  referral_code?: string;
  company_name?: string;
  company_website?: string;
  job_title?: string;
  linkedin_url?: string;
  twitter_url?: string;
  how_did_you_hear?: string;
  additional_info?: string;
}

// Add missing type exports
export type UserType = 'founder' | 'partner' | 'investor';

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  display_price: string;
  description: string;
  features: string[];
  user_types: UserType[];
  is_active: boolean;
}

// Base member data interface
export interface MemberData extends BaseFormData {
  user_type: UserType;
  linkedin_url?: string;
  website_url?: string;
}

// Founder-specific data
export interface FounderData extends MemberData {
  user_type: 'founder';
  company_name?: string;
  industry?: string;
  startup_stage?: string;
  team_size?: number;
  funding_stage?: string;
}

// Updated InvestorData with all required fields
export interface InvestorData extends BaseFormData {
  country: string;
  company: string;
  title: string;
  investor_type: string;
  investment_focus?: string;
  ticket_size_min?: number;
  ticket_size_max?: number;
  preferred_stages?: string;
  portfolio_size?: number;
  additional_questions?: string;
}

// Updated PartnerData with all required fields
export interface PartnerData extends BaseFormData {
  country: string;
  company_name: string;
  partnership_type?: PartnershipType;
  company_size?: string;
  partnership_interest?: PartnershipInterest;
  services_offered?: string;
  years_experience?: number;
  expected_partnership_model?: string;
  additional_information?: string;
}

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
