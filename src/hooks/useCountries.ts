
import { useState, useEffect } from 'react';
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

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('countries')
          .select('*')
          .order('name');

        if (error) throw error;
        setCountries(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const getCountriesByContinent = () => {
    return countries.reduce((acc, country) => {
      const continent = country.continent;
      if (!acc[continent]) {
        acc[continent] = [];
      }
      acc[continent].push(country);
      return acc;
    }, {} as Record<string, Country[]>);
  };

  const getCountriesByRegion = () => {
    return countries.reduce((acc, country) => {
      const region = country.region;
      if (!acc[region]) {
        acc[region] = [];
      }
      acc[region].push(country);
      return acc;
    }, {} as Record<string, Country[]>);
  };

  const searchCountries = (query: string) => {
    if (!query.trim()) return countries;
    
    const lowercaseQuery = query.toLowerCase();
    return countries.filter(country =>
      country.name.toLowerCase().includes(lowercaseQuery) ||
      country.iso2_code.toLowerCase().includes(lowercaseQuery) ||
      country.iso3_code.toLowerCase().includes(lowercaseQuery) ||
      country.continent.toLowerCase().includes(lowercaseQuery) ||
      country.region.toLowerCase().includes(lowercaseQuery)
    );
  };

  return { 
    countries, 
    loading, 
    error, 
    getCountriesByContinent,
    getCountriesByRegion,
    searchCountries
  };
};
