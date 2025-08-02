
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
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

// Enhanced email validation
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return emailRegex.test(email) && email.length <= 254
}

// URL validation
function isValidUrl(url: string): boolean {
  if (!url) return true // Optional field
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

// Rate limiting store (in-memory for Edge Functions)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(key: string, maxRequests: number = 5, windowMs: number = 300000): boolean {
  const now = Date.now()
  
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
    const requestData = await req.json()
    console.log('Received request data:', requestData)

    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const email = requestData.memberData?.email || requestData.email
    const sanitizedEmail = email ? sanitizeInput(email.toLowerCase()) : ''
    const rateLimitKey = `register_${sanitizedEmail || clientIP}`
    
    if (!checkRateLimit(rateLimitKey)) {
      return new Response(
        JSON.stringify({ error: 'Too many registration attempts. Please wait before trying again.' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        }
      )
    }

    // Extract member data from the request
    const memberData = requestData.memberData || requestData
    const userType = (memberData.user_type || memberData.userType || 'founder').toLowerCase()
    const firstName = sanitizeInput(memberData.first_name || memberData.firstName)
    const lastName = sanitizeInput(memberData.last_name || memberData.lastName)
    const phone = sanitizeInput(memberData.phone)
    const countryId = memberData.country_id || memberData.countryId || memberData.country

    // Validate required fields
    if (!['founder', 'partner', 'investor'].includes(userType)) {
      console.error('Invalid user type:', userType)
      throw new Error('Invalid user type')
    }

    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      throw new Error('Valid email is required')
    }

    if (!firstName || firstName.length < 2 || firstName.length > 100) {
      throw new Error('First name must be between 2 and 100 characters')
    }

    if (!lastName || lastName.length < 2 || lastName.length > 100) {
      throw new Error('Last name must be between 2 and 100 characters')
    }

    // Validate optional URLs
    const linkedinUrl = memberData.linkedin_url || memberData.linkedin
    const websiteUrl = memberData.website_url || memberData.website
    const sanitizedLinkedinUrl = linkedinUrl ? sanitizeInput(linkedinUrl) : null
    const sanitizedWebsiteUrl = websiteUrl ? sanitizeInput(websiteUrl) : null

    if (sanitizedLinkedinUrl && !isValidUrl(sanitizedLinkedinUrl)) {
      throw new Error('Invalid LinkedIn URL')
    }

    if (sanitizedWebsiteUrl && !isValidUrl(sanitizedWebsiteUrl)) {
      throw new Error('Invalid website URL')
    }

    // Create Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing')
      throw new Error('Service configuration error')
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Check if member already exists
    const { data: existingMember } = await supabaseAdmin
      .from('members')
      .select('id')
      .eq('email', sanitizedEmail)
      .single()

    if (existingMember) {
      throw new Error('An account with this email already exists')
    }

    // Validate country if provided
    let validatedCountryId = null
    if (countryId) {
      const countryIdInt = parseInt(countryId.toString())
      if (!isNaN(countryIdInt)) {
        const { data: country } = await supabaseAdmin
          .from('countries')
          .select('id')
          .eq('id', countryIdInt)
          .single()
        
        if (country) {
          validatedCountryId = countryIdInt
        }
      }
    }

    // Create member record
    const { data: memberRecord, error: memberError } = await supabaseAdmin
      .from('members')
      .insert({
        user_type: userType,
        email: sanitizedEmail,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        country_id: validatedCountryId,
        linkedin_url: sanitizedLinkedinUrl,
        website_url: sanitizedWebsiteUrl
      })
      .select()
      .single()

    if (memberError) {
      console.error('Member creation error:', memberError)
      throw new Error(memberError.message || 'Failed to create member')
    }

    const memberId = memberRecord.id

    // Create user-specific data based on type
    let specificData = null
    
    if (userType === 'founder') {
      // For founders, we don't need additional specific data for basic registration
      // This can be extended later if needed
      specificData = { type: 'founder' }
    }

    // Create subscription if payment was successful
    const tierId = requestData.tierId
    const paymentIntentId = requestData.paymentIntentId
    
    if (tierId) {
      const subscriptionData: any = {
        member_id: memberId,
        tier_id: tierId,
        status: 'active',
        start_date: new Date().toISOString(),
      }

      if (paymentIntentId) {
        subscriptionData.payment_intent_id = paymentIntentId
      }

      // Set end date for paid tiers (30 days from now)
      if (paymentIntentId) {
        subscriptionData.end_date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }

      const { error: subscriptionError } = await supabaseAdmin
        .from('member_subscriptions')
        .insert(subscriptionData)

      if (subscriptionError) {
        console.error('Subscription creation error:', subscriptionError)
        // Don't throw here as member was created successfully
      }
    }

    // Log successful registration (without sensitive data)
    console.log('Member registered successfully:', {
      id: memberId,
      userType,
      timestamp: new Date().toISOString(),
      clientIP: clientIP
    })

    return new Response(
      JSON.stringify({
        success: true,
        memberId: memberId,
        message: 'Member registered successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error: any) {
    console.error('Registration error:', {
      message: error.message,
      timestamp: new Date().toISOString()
    })
    
    // Return sanitized error message
    const sanitizedMessage = error.message && error.message.includes('email already exists')
      ? error.message
      : error.message || 'Registration failed'
    
    return new Response(
      JSON.stringify({
        error: sanitizedMessage
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message?.includes('already exists') ? 409 : 500,
      }
    )
  }
})
