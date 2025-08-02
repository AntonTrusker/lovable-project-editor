
import { supabase } from '@/integrations/supabase/client';
import { SecurityUtils, SecureErrorHandler } from '@/utils/security';
import type { UserType } from '@/types/supabase';

/**
 * Secure service layer for Supabase operations with enhanced security
 */
export class SecureSupabaseService {
  /**
   * Securely create a member with validation and sanitization
   */
  static async createMember(memberData: {
    user_type: UserType;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    country_id?: number;
    linkedin_url?: string;
    website_url?: string;
  }) {
    try {
      // Rate limiting check
      if (!SecurityUtils.checkRateLimit(`create_member_${memberData.email}`, 3, 60000)) {
        throw new Error('Too many registration attempts. Please wait before trying again.');
      }

      // Validate and sanitize input data
      const sanitizedData = {
        user_type: memberData.user_type,
        email: SecurityUtils.sanitizeText(memberData.email.toLowerCase()),
        first_name: SecurityUtils.sanitizeText(memberData.first_name),
        last_name: SecurityUtils.sanitizeText(memberData.last_name),
        phone: memberData.phone ? SecurityUtils.sanitizeText(memberData.phone) : null,
        country_id: memberData.country_id || null,
        linkedin_url: memberData.linkedin_url ? SecurityUtils.sanitizeText(memberData.linkedin_url) : null,
        website_url: memberData.website_url ? SecurityUtils.sanitizeText(memberData.website_url) : null,
      };

      // Additional validation
      if (!SecurityUtils.isValidEmail(sanitizedData.email)) {
        throw new Error('Invalid email format');
      }

      if (sanitizedData.linkedin_url && !SecurityUtils.isValidUrl(sanitizedData.linkedin_url)) {
        throw new Error('Invalid LinkedIn URL format');
      }

      if (sanitizedData.website_url && !SecurityUtils.isValidUrl(sanitizedData.website_url)) {
        throw new Error('Invalid website URL format');
      }

      if (sanitizedData.phone && !SecurityUtils.isValidPhone(sanitizedData.phone)) {
        throw new Error('Invalid phone number format');
      }

      // Use the secure database function for member creation
      const { data, error } = await supabase.rpc('create_member_with_validation', {
        p_user_type: sanitizedData.user_type,
        p_email: sanitizedData.email,
        p_first_name: sanitizedData.first_name,
        p_last_name: sanitizedData.last_name,
        p_phone: sanitizedData.phone,
        p_country_id: sanitizedData.country_id,
        p_linkedin_url: sanitizedData.linkedin_url,
        p_website_url: sanitizedData.website_url,
      });

      if (error) {
        throw error;
      }

      return data;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Member creation');
      throw new Error(errorMessage);
    }
  }

  /**
   * Securely get member by ID with proper authorization
   */
  static async getMemberById(id: string) {
    try {
      // Validate UUID format
      if (!this.isValidUuid(id)) {
        throw new Error('Invalid member ID format');
      }

      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          country:countries(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Get member');
      throw new Error(errorMessage);
    }
  }

  /**
   * Securely get tiers with caching and validation
   */
  static async getTiers(userType?: UserType) {
    try {
      let query = supabase
        .from('tiers')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (userType) {
        // Validate user type
        const validUserTypes: UserType[] = ['founder', 'partner', 'investor'];
        if (!validUserTypes.includes(userType)) {
          throw new Error('Invalid user type');
        }
        query = query.contains('user_types', [userType]);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Sanitize tier data before returning
      return data?.map(tier => ({
        ...tier,
        name: SecurityUtils.sanitizeText(tier.name),
        description: tier.description ? SecurityUtils.sanitizeText(tier.description) : null,
        features: Array.isArray(tier.features) 
          ? tier.features.map(feature => SecurityUtils.sanitizeText(feature))
          : []
      })) || [];

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Get tiers');
      throw new Error(errorMessage);
    }
  }

  /**
   * Securely create payment intent with validation
   */
  static async createPaymentIntent(paymentData: {
    stripe_payment_intent_id: string;
    member_id?: string;
    tier_id?: string;
    amount: number;
    currency: string;
    status: string;
    metadata?: any;
  }) {
    try {
      // Rate limiting check
      const rateLimitKey = `payment_${paymentData.member_id || 'anonymous'}`;
      if (!SecurityUtils.checkRateLimit(rateLimitKey, 5, 60000)) {
        throw new Error('Too many payment attempts. Please wait before trying again.');
      }

      // Validate input data
      if (!paymentData.stripe_payment_intent_id || !paymentData.stripe_payment_intent_id.startsWith('pi_')) {
        throw new Error('Invalid payment intent ID');
      }

      if (paymentData.amount <= 0 || paymentData.amount > 1000000) { // Max $10,000
        throw new Error('Invalid payment amount');
      }

      if (!['USD', 'EUR', 'GBP'].includes(paymentData.currency.toUpperCase())) {
        throw new Error('Unsupported currency');
      }

      if (paymentData.member_id && !this.isValidUuid(paymentData.member_id)) {
        throw new Error('Invalid member ID format');
      }

      // Sanitize metadata
      const sanitizedMetadata = paymentData.metadata 
        ? SecurityUtils.maskSensitiveData(paymentData.metadata)
        : null;

      const { data, error } = await supabase
        .from('payment_intents')
        .insert({
          stripe_payment_intent_id: SecurityUtils.sanitizeText(paymentData.stripe_payment_intent_id),
          member_id: paymentData.member_id || null,
          tier_id: paymentData.tier_id ? SecurityUtils.sanitizeText(paymentData.tier_id) : null,
          amount: Math.round(paymentData.amount), // Ensure integer
          currency: paymentData.currency.toUpperCase(),
          status: SecurityUtils.sanitizeText(paymentData.status),
          metadata: sanitizedMetadata
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Create payment intent');
      throw new Error(errorMessage);
    }
  }

  /**
   * Validate UUID format
   */
  private static isValidUuid(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Get current user's profile securely
   */
  static async getCurrentUserProfile() {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User not authenticated');
      }

      // Get member profile using RLS-protected query
      const { data: member, error: memberError } = await supabase
        .from('members')
        .select(`
          *,
          country:countries(*)
        `)
        .eq('id', user.id)
        .single();

      if (memberError) {
        // User might not have a member profile yet
        return null;
      }

      return member;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Get user profile');
      throw new Error(errorMessage);
    }
  }

  /**
   * Securely update member data
   */
  static async updateMember(memberId: string, updates: Record<string, any>) {
    try {
      // Validate UUID format
      if (!this.isValidUuid(memberId)) {
        throw new Error('Invalid member ID format');
      }

      // Sanitize update data
      const sanitizedUpdates: Record<string, any> = {};
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined) {
          sanitizedUpdates[key] = value;
          continue;
        }

        switch (key) {
          case 'email':
            const email = SecurityUtils.sanitizeText(String(value)).toLowerCase();
            if (!SecurityUtils.isValidEmail(email)) {
              throw new Error('Invalid email format');
            }
            sanitizedUpdates[key] = email;
            break;
          case 'phone':
            const phone = SecurityUtils.sanitizeText(String(value));
            if (phone && !SecurityUtils.isValidPhone(phone)) {
              throw new Error('Invalid phone format');
            }
            sanitizedUpdates[key] = phone;
            break;
          case 'linkedin_url':
          case 'website_url':
            const url = SecurityUtils.sanitizeText(String(value));
            if (url && !SecurityUtils.isValidUrl(url)) {
              throw new Error(`Invalid ${key.replace('_', ' ')} format`);
            }
            sanitizedUpdates[key] = url;
            break;
          default:
            sanitizedUpdates[key] = typeof value === 'string' 
              ? SecurityUtils.sanitizeText(value) 
              : value;
            break;
        }
      }

      const { data, error } = await supabase
        .from('members')
        .update(sanitizedUpdates)
        .eq('id', memberId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Update member');
      throw new Error(errorMessage);
    }
  }
}
