
import { supabase } from '@/integrations/supabase/client';

export interface Country {
  id: number;
  name: string;
  code: string;
  iso2_code: string;
  iso3_code: string;
  continent: string;
  region: string;
  population: number;
  area_sq_km: number;
}

export const getCountryList = async (): Promise<Country[]> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching countries:', error);
    return [];
  }

  return data || [];
};

export const getCountriesByContinent = async (): Promise<Record<string, Country[]>> => {
  const countries = await getCountryList();
  
  return countries.reduce((acc, country) => {
    const continent = country.continent;
    if (!acc[continent]) {
      acc[continent] = [];
    }
    acc[continent].push(country);
    return acc;
  }, {} as Record<string, Country[]>);
};

export const getCountriesByRegion = async (): Promise<Record<string, Country[]>> => {
  const countries = await getCountryList();
  
  return countries.reduce((acc, country) => {
    const region = country.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(country);
    return acc;
  }, {} as Record<string, Country[]>);
};

export const searchCountries = async (query: string): Promise<Country[]> => {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .or(`name.ilike.%${query}%,iso2_code.ilike.%${query}%,iso3_code.ilike.%${query}%`)
    .order('name');

  if (error) {
    console.error('Error searching countries:', error);
    return [];
  }

  return data || [];
};
