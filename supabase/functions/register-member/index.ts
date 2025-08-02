
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      linkedin,
      tier,
      paymentIntentId,
      amount = 0,
    } = await req.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !country || !tier) {
      throw new Error('Missing required fields')
    }

    // Create Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Check if member already exists
    const { data: existingMember } = await supabaseAdmin
      .from('members')
      .select('id')
      .eq('email', email)
      .single()

    if (existingMember) {
      throw new Error('An account with this email already exists')
    }

    // Insert new member
    const { data: member, error: memberError } = await supabaseAdmin
      .from('members')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        country: country,
        linkedin_url: linkedin || null,
        membership_tier: tier,
        payment_intent_id: paymentIntentId || null,
        amount_paid: amount,
        status: paymentIntentId ? 'active' : 'pending',
      })
      .select()
      .single()

    if (memberError) {
      throw memberError
    }

    return new Response(
      JSON.stringify({
        success: true,
        memberId: member.id,
        message: 'Member registered successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message || 'Registration failed'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
