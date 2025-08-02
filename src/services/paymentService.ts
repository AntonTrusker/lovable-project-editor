import { supabase } from '@/integrations/supabase/client';
import { SecurityUtils, SecureErrorHandler } from '@/utils/security';

export interface PaymentIntentData {
  tierId: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, any>;
}

export interface PaymentIntentResult {
  clientSecret: string;
  paymentIntentId: string;
}

export class PaymentService {
  /**
   * Create a payment intent using Supabase edge function
   */
  static async createPaymentIntent(data: PaymentIntentData): Promise<PaymentIntentResult> {
    try {
      // Validate input
      if (!data.tierId || !data.amount) {
        throw new Error('Tier ID and amount are required');
      }

      if (data.amount < 50) {
        throw new Error('Invalid amount. Minimum amount is €0.50');
      }

      // Sanitize inputs
      const sanitizedData = {
        tierId: data.tierId.trim(),
        amount: Math.round(data.amount),
        currency: data.currency || 'EUR',
        metadata: data.metadata || {}
      };

      console.log('PaymentService: Creating payment intent with data:', sanitizedData);

      // Create payment intent via edge function
      const { data: result, error } = await supabase.functions.invoke('create-payment-intent', {
        body: sanitizedData
      });

      if (error) {
        console.error('PaymentService: Error in payment intent creation:', error);
        throw new Error(error.message || 'Failed to create payment intent');
      }

      if (!result?.clientSecret) {
        console.error('PaymentService: No client secret in response:', result);
        throw new Error('Failed to create payment intent - no client secret received');
      }

      console.log('PaymentService: Payment intent created successfully');
      return {
        clientSecret: result.clientSecret,
        paymentIntentId: result.paymentIntentId
      };

    } catch (error) {
      console.error('PaymentService: Payment service error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      throw new Error(errorMessage);
    }
  }

  /**
   * Save payment intent to database
   */
  static async savePaymentIntent(paymentIntentData: {
    stripe_payment_intent_id: string;
    member_id?: string;
    tier_id?: string;
    amount: number;
    currency: string;
    status: string;
    metadata?: any;
  }) {
    try {
      const { data, error } = await supabase
        .from('payment_intents')
        .insert(paymentIntentData)
        .select()
        .single();

      if (error) throw error;
      return data;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Save payment intent');
      throw new Error(errorMessage);
    }
  }

  /**
   * Update payment intent status
   */
  static async updatePaymentIntent(id: string, updates: { status?: string; metadata?: any }) {
    try {
      const { data, error } = await supabase
        .from('payment_intents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Update payment intent');
      throw new Error(errorMessage);
    }
  }

  /**
   * Create subscription record
   */
  static async createSubscription(subscriptionData: {
    member_id: string;
    tier_id: string;
    payment_intent_id?: string;
    status: string;
    start_date: string;
    end_date?: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('member_subscriptions')
        .insert(subscriptionData)
        .select()
        .single();

      if (error) throw error;
      return data;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Create subscription');
      throw new Error(errorMessage);
    }
  }
}
