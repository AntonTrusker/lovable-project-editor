
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tier, UserType } from '@/types/supabase';

export const useTiers = (userType?: UserType) => {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('tiers')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true });

        if (userType) {
          query = query.contains('user_types', [userType]);
        }

        const { data, error } = await query;

        if (error) throw error;
        setTiers(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tiers');
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, [userType]);

  return { tiers, loading, error };
};
