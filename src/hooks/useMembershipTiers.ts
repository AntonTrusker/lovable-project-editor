
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { MembershipTier, UserType } from '@/types/membership'

export const useMembershipTiers = (userType?: UserType) => {
  const [tiers, setTiers] = useState<MembershipTier[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('tiers')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true })

        if (userType) {
          query = query.contains('user_types', [userType])
        }

        const { data, error } = await query

        if (error) throw error

        const formattedTiers = data?.map(tier => ({
          ...tier,
          features: Array.isArray(tier.features) ? tier.features : []
        })) || []

        setTiers(formattedTiers)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tiers')
      } finally {
        setLoading(false)
      }
    }

    fetchTiers()
  }, [userType])

  return { tiers, loading, error }
}
