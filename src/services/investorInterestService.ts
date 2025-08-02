
import { supabase } from '@/integrations/supabase/client';
import { SecurityUtils, SecureErrorHandler } from '@/utils/security';

export interface InvestorInterestSubmission {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company: string;
  title: string;
  investor_type: string;
  additional_questions?: string;
}

export class InvestorInterestService {
  /**
   * Submit investor interest form data to Supabase
   */
  static async submitInvestorInterest(data: InvestorInterestSubmission) {
    try {
      // Rate limiting check
      if (!SecurityUtils.checkRateLimit(`investor_interest_${data.email}`, 3, 60000)) {
        throw new Error('Too many submissions. Please wait before trying again.');
      }

      // Validate and sanitize input data
      const sanitizedData = {
        first_name: SecurityUtils.sanitizeText(data.first_name),
        last_name: SecurityUtils.sanitizeText(data.last_name),
        email: SecurityUtils.sanitizeText(data.email.toLowerCase()),
        phone: data.phone ? SecurityUtils.sanitizeText(data.phone) : null,
        company: SecurityUtils.sanitizeText(data.company),
        title: SecurityUtils.sanitizeText(data.title),
        investor_type: SecurityUtils.sanitizeText(data.investor_type),
        additional_questions: data.additional_questions ? SecurityUtils.sanitizeText(data.additional_questions) : null,
      };

      // Additional validation
      if (!SecurityUtils.isValidEmail(sanitizedData.email)) {
        throw new Error('Invalid email format');
      }

      if (sanitizedData.phone && !SecurityUtils.isValidPhone(sanitizedData.phone)) {
        throw new Error('Invalid phone number format');
      }

      // Insert into database
      const { data: result, error } = await supabase
        .from('investor_interest_submissions')
        .insert(sanitizedData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return result;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Investor interest submission');
      throw new Error(errorMessage);
    }
  }

  /**
   * Get investor interest submissions (for admin/service use)
   */
  static async getInvestorInterestSubmissions() {
    try {
      const { data, error } = await supabase
        .from('investor_interest_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Get investor interest submissions');
      throw new Error(errorMessage);
    }
  }
}
