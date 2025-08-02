
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

// Rate limiting store (in-memory for Edge Functions)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(clientIP: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const key = `payment_intent_${clientIP}`
  
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        }
      )
    }

    // Input validation and sanitization
    const requestData = await req.json()
    console.log('Received request data:', requestData)
    
    const { tierId, amount, metadata = {} } = requestData

    if (!tierId || !amount) {
      console.error('Missing required fields:', { tierId, amount })
      throw new Error('Missing required fields: tierId and amount are required')
    }

    // Validate amount
    const amountInCents = parseInt(amount)
    if (isNaN(amountInCents) || amountInCents < 50 || amountInCents > 10000000) {
      console.error('Invalid amount:', amount)
      throw new Error('Invalid amount. Must be between €0.50 and €100,000.')
    }

    // Validate tierId format
    if (!/^[a-zA-Z0-9_-]+$/.test(tierId)) {
      console.error('Invalid tier ID format:', tierId)
      throw new Error('Invalid tier ID format')
    }

    // Sanitize inputs
    const sanitizedTierId = sanitizeInput(tierId)

    // Initialize Stripe
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY not configured')
      throw new Error('Payment processing not configured')
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      typescript: true,
    })

    // Verify tierId exists in Supabase (optional security check)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      const { data: tier, error: tierError } = await supabase
        .from('tiers')
        .select('id, price')
        .eq('id', sanitizedTierId)
        .eq('is_active', true)
        .single()

      if (tierError || !tier) {
        console.error('Invalid tier ID:', sanitizedTierId, tierError)
        throw new Error('Invalid tier selected')
      }

      // Verify amount matches tier price (security check)
      const tierPriceInCents = Math.round(parseFloat(tier.price.toString()) * 100)
      if (amountInCents !== tierPriceInCents) {
        console.error('Amount mismatch for tier:', { tierId: sanitizedTierId, expected: tierPriceInCents, received: amountInCents })
        throw new Error('Amount does not match tier price')
      }
    }

    console.log('Creating payment intent for:', { tierId: sanitizedTierId, amount: amountInCents })

    // Create a PaymentIntent with enhanced security
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      metadata: { 
        tier_id: sanitizedTierId,
        created_by: 'membership-registration',
        client_ip: clientIP,
        timestamp: new Date().toISOString(),
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true,
      },
      // Add statement descriptor for better user experience
      statement_descriptor: 'THEFOUNDR MEMBER',
    })

    // Log successful creation
    console.log('Payment intent created successfully:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      tier_id: sanitizedTierId,
      timestamp: new Date().toISOString()
    })

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (err: any) {
    console.error('Payment intent creation error:', {
      message: err.message,
      type: err.type,
      stack: err.stack,
      timestamp: new Date().toISOString()
    })
    
    // Return sanitized error message
    const sanitizedMessage = err.message.includes('Invalid') || err.message.includes('Missing') 
      ? err.message 
      : 'Error creating payment intent'
    
    return new Response(
      JSON.stringify({ 
        error: sanitizedMessage
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: err.message.includes('Invalid') || err.message.includes('Missing') ? 400 : 500,
      }
    )
  }
})
