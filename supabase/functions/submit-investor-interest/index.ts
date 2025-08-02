
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const requestData = await req.json();
    console.log('Received investor interest request:', requestData);

    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'email', 'country', 'user_type', 'company', 'title', 'investor_type'];
    for (const field of requiredFields) {
      if (!requestData[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Insert investor interest submission
    const { data, error } = await supabase
      .from('investor_interest_submissions')
      .insert({
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        email: requestData.email,
        phone: requestData.phone,
        country: requestData.country,
        user_type: requestData.user_type,
        company: requestData.company,
        title: requestData.title,
        investor_type: requestData.investor_type,
        additional_questions: requestData.additional_questions
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to submit interest' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Interest submitted successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Interest submitted successfully',
        id: data.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
