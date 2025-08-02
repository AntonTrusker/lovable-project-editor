
import { supabase } from '@/integrations/supabase/client';
import { SecurityUtils, SecureErrorHandler } from '@/utils/security';
import { MemberData, FounderData, PartnerData, InvestorData } from '@/types/membership';

export interface MemberSubmissionData {
  memberData: MemberData;
  tierId: string;
  paymentIntentId?: string;
}

export class MemberService {
  /**
   * Create a new member with type-specific data
   */
  static async createMember(submissionData: MemberSubmissionData) {
    try {
      const { memberData, tierId, paymentIntentId } = submissionData;
      
      // Rate limiting check
      if (!SecurityUtils.checkRateLimit(`member_creation_${memberData.email}`, 3, 60000)) {
        throw new Error('Too many registration attempts. Please wait before trying again.');
      }

      // Validate and sanitize input data
      const sanitizedData = this.sanitizeMemberData(memberData);
      
      // Additional validation
      if (!SecurityUtils.isValidEmail(sanitizedData.email)) {
        throw new Error('Invalid email format');
      }

      if (sanitizedData.phone && !SecurityUtils.isValidPhone(sanitizedData.phone)) {
        throw new Error('Invalid phone number format');
      }

      // Create member using edge function for consistent processing
      const { data: result, error } = await supabase.functions.invoke('register-member-new', {
        body: {
          memberData: sanitizedData,
          tierId,
          paymentIntentId
        }
      });

      if (error) {
        throw error;
      }

      return result;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Member registration');
      throw new Error(errorMessage);
    }
  }

  /**
   * Sanitize member data input
   */
  private static sanitizeMemberData(data: MemberData): MemberData {
    const sanitized = {
      ...data,
      email: SecurityUtils.sanitizeText(data.email.toLowerCase()),
      first_name: SecurityUtils.sanitizeText(data.first_name),
      last_name: SecurityUtils.sanitizeText(data.last_name),
      phone: data.phone ? SecurityUtils.sanitizeText(data.phone) : undefined,
      linkedin_url: data.linkedin_url ? SecurityUtils.sanitizeText(data.linkedin_url) : undefined,
      website_url: data.website_url ? SecurityUtils.sanitizeText(data.website_url) : undefined,
    };

    // Type-specific sanitization
    if (data.user_type === 'founder') {
      const founderData = data as any;
      if (founderData.company_name) {
        (sanitized as any).company_name = SecurityUtils.sanitizeText(founderData.company_name);
      }
      if (founderData.industry) {
        (sanitized as any).industry = SecurityUtils.sanitizeText(founderData.industry);
      }
    } else if (data.user_type === 'partner') {
      const partnerData = data as any;
      if (partnerData.company_name) {
        (sanitized as any).company_name = SecurityUtils.sanitizeText(partnerData.company_name);
      }
      if (partnerData.country) {
        (sanitized as any).country = SecurityUtils.sanitizeText(partnerData.country);
      }
    } else if (data.user_type === 'investor') {
      const investorData = data as any;
      if (investorData.investor_type) {
        (sanitized as any).investor_type = SecurityUtils.sanitizeText(investorData.investor_type);
      }
      if (investorData.country) {
        (sanitized as any).country = SecurityUtils.sanitizeText(investorData.country);
      }
      if (investorData.company) {
        (sanitized as any).company = SecurityUtils.sanitizeText(investorData.company);
      }
      if (investorData.title) {
        (sanitized as any).title = SecurityUtils.sanitizeText(investorData.title);
      }
    }

    return sanitized;
  }

  /**
   * Get member submissions (for admin/service use)
   */
  static async getMemberSubmissions() {
    try {
      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          country:countries(*),
          founders(*),
          partners(*),
          investors(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Get member submissions');
      throw new Error(errorMessage);
    }
  }
}
