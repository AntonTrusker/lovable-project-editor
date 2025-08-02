
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Basic countries data
    const countries = [
      { name: 'United States', code: 'US', iso2_code: 'US', iso3_code: 'USA', continent: 'North America', region: 'Northern America', population: 331000000, area_sq_km: 9833517 },
      { name: 'United Kingdom', code: 'GB', iso2_code: 'GB', iso3_code: 'GBR', continent: 'Europe', region: 'Northern Europe', population: 67000000, area_sq_km: 242495 },
      { name: 'Germany', code: 'DE', iso2_code: 'DE', iso3_code: 'DEU', continent: 'Europe', region: 'Western Europe', population: 83000000, area_sq_km: 357114 },
      { name: 'France', code: 'FR', iso2_code: 'FR', iso3_code: 'FRA', continent: 'Europe', region: 'Western Europe', population: 68000000, area_sq_km: 643801 },
      { name: 'Canada', code: 'CA', iso2_code: 'CA', iso3_code: 'CAN', continent: 'North America', region: 'Northern America', population: 38000000, area_sq_km: 9984670 },
      { name: 'Australia', code: 'AU', iso2_code: 'AU', iso3_code: 'AUS', continent: 'Oceania', region: 'Australia and New Zealand', population: 26000000, area_sq_km: 7692024 },
      { name: 'Netherlands', code: 'NL', iso2_code: 'NL', iso3_code: 'NLD', continent: 'Europe', region: 'Western Europe', population: 17000000, area_sq_km: 41850 },
      { name: 'Portugal', code: 'PT', iso2_code: 'PT', iso3_code: 'PRT', continent: 'Europe', region: 'Southern Europe', population: 10000000, area_sq_km: 92090 },
      { name: 'Spain', code: 'ES', iso2_code: 'ES', iso3_code: 'ESP', continent: 'Europe', region: 'Southern Europe', population: 47000000, area_sq_km: 505370 },
      { name: 'Italy', code: 'IT', iso2_code: 'IT', iso3_code: 'ITA', continent: 'Europe', region: 'Southern Europe', population: 60000000, area_sq_km: 301340 },
      { name: 'Belgium', code: 'BE', iso2_code: 'BE', iso3_code: 'BEL', continent: 'Europe', region: 'Western Europe', population: 11000000, area_sq_km: 30528 },
      { name: 'Switzerland', code: 'CH', iso2_code: 'CH', iso3_code: 'CHE', continent: 'Europe', region: 'Western Europe', population: 9000000, area_sq_km: 41285 },
      { name: 'Sweden', code: 'SE', iso2_code: 'SE', iso3_code: 'SWE', continent: 'Europe', region: 'Northern Europe', population: 10000000, area_sq_km: 450295 },
      { name: 'Norway', code: 'NO', iso2_code: 'NO', iso3_code: 'NOR', continent: 'Europe', region: 'Northern Europe', population: 5000000, area_sq_km: 323802 },
      { name: 'Denmark', code: 'DK', iso2_code: 'DK', iso3_code: 'DNK', continent: 'Europe', region: 'Northern Europe', population: 6000000, area_sq_km: 43094 },
      { name: 'Ireland', code: 'IE', iso2_code: 'IE', iso3_code: 'IRL', continent: 'Europe', region: 'Northern Europe', population: 5000000, area_sq_km: 70273 },
      { name: 'Finland', code: 'FI', iso2_code: 'FI', iso3_code: 'FIN', continent: 'Europe', region: 'Northern Europe', population: 6000000, area_sq_km: 338424 },
      { name: 'Austria', code: 'AT', iso2_code: 'AT', iso3_code: 'AUT', continent: 'Europe', region: 'Western Europe', population: 9000000, area_sq_km: 83871 },
      { name: 'Poland', code: 'PL', iso2_code: 'PL', iso3_code: 'POL', continent: 'Europe', region: 'Eastern Europe', population: 38000000, area_sq_km: 312696 },
      { name: 'Czech Republic', code: 'CZ', iso2_code: 'CZ', iso3_code: 'CZE', continent: 'Europe', region: 'Eastern Europe', population: 11000000, area_sq_km: 78867 }
    ]

    // Check if countries already exist
    const { data: existingCountries } = await supabase
      .from('countries')
      .select('name')
      .limit(1)

    if (!existingCountries || existingCountries.length === 0) {
      // Insert countries
      const { error: insertError } = await supabase
        .from('countries')
        .insert(countries)

      if (insertError) {
        throw insertError
      }

      return new Response(
        JSON.stringify({ message: 'Countries seeded successfully', count: countries.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      return new Response(
        JSON.stringify({ message: 'Countries already exist', count: existingCountries.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

  } catch (error) {
    console.error('Error seeding countries:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
