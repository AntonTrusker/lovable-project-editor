
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { query } from '@/lib/db';

// Initialize Stripe with TypeScript type
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// Input sanitization helper
function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, 1000)
}

// Rate limiting store (in-memory for development)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(clientIP: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const key = `payment_${clientIP}`
  
  const record = rateLimitStore.get(key)
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown'
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const { tierId, amount } = req.body;

    // Validate input
    if (!tierId || !amount) {
      return res.status(400).json({ 
        error: 'Missing required fields: tierId and amount are required' 
      });
    }

    // Validate and sanitize inputs
    const sanitizedTierId = sanitizeInput(tierId)
    const amountInCents = parseInt(amount);
    
    if (isNaN(amountInCents) || amountInCents < 50 || amountInCents > 10000000) {
      return res.status(400).json({ 
        error: 'Invalid amount. Must be between $0.50 and $100,000.' 
      });
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(sanitizedTierId)) {
      return res.status(400).json({ 
        error: 'Invalid tier ID format' 
      });
    }

    // Optional: Verify the tier exists in your database
    try {
      const tier = await query(
        'SELECT id, name, price FROM membership_tiers WHERE id = $1',
        [sanitizedTierId]
      );
      
      if (!tier.rows.length) {
        console.warn(`Attempted to create payment intent for non-existent tier: ${sanitizedTierId}`);
        // Continue anyway in case tiers are managed elsewhere
      }
    } catch (dbError) {
      console.error('Error verifying tier in database:', dbError);
      // Continue with payment intent creation even if tier verification fails
    }
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: { 
        integration_check: 'accept_a_payment', 
        tier_id: sanitizedTierId,
        created_by: 'membership-registration',
        client_ip: clientIP,
        timestamp: new Date().toISOString()
      },
      // Enable automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
      // Add statement descriptor
      statement_descriptor: 'MEMBERSHIP REG',
    });

    // Log the payment intent creation for auditing
    try {
      await query(
        `INSERT INTO payment_intents 
         (intent_id, amount, currency, status, metadata)
         VALUES ($1, $2, $3, $4, $5::jsonb)
         ON CONFLICT (intent_id) DO UPDATE
         SET status = EXCLUDED.status, updated_at = NOW()`,
        [
          paymentIntent.id,
          paymentIntent.amount,
          paymentIntent.currency,
          paymentIntent.status,
          JSON.stringify({
            tierId: sanitizedTierId,
            clientIp: clientIP,
            userAgent: req.headers['user-agent'],
            timestamp: new Date().toISOString()
          }),
        ]
      );
    } catch (logError) {
      console.error('Error logging payment intent:', logError);
      // Don't fail the request if logging fails
    }

    // Return the client secret to complete the payment
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err: any) {
    console.error('Error creating payment intent:', {
      message: err.message,
      type: err.type,
      timestamp: new Date().toISOString()
    });
    
    // More specific error handling
    if (err.type === 'StripeInvalidRequestError') {
      return res.status(400).json({ 
        error: 'Invalid request to payment processor'
      });
    }
    
    if (err.type === 'StripeAuthenticationError') {
      console.error('Stripe authentication error - check your API keys');
      return res.status(500).json({ 
        error: 'Payment processor configuration error' 
      });
    }
    
    // Generic error response
    res.status(500).json({ 
      error: 'Error creating payment intent'
    });
  }
}
