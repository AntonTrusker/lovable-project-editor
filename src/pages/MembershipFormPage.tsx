
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import EnhancedMembershipForm from '@/components/EnhancedMembershipForm'
import { useMembershipTiers } from '@/hooks/useMembershipTiers'
import { UserType } from '@/types/membership'

const MembershipFormPage = () => {
  const { tierId } = useParams<{ tierId: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const userType = (searchParams.get('type') || 'founder') as UserType
  const { tiers, loading, error } = useMembershipTiers(userType)
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading membership tiers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/join-us')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Membership Tiers
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  // Find the tier by ID
  const tier = tiers.find(t => t.id === tierId)
  
  if (!tier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Invalid Membership Tier</h2>
          <p className="text-gray-600 text-center mb-6">
            The selected membership tier could not be found or is not available for {userType}s.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/join-us')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Membership Tiers
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedMembershipForm 
        tier={tier} 
        userType={userType} 
        onClose={() => navigate('/join-us')} 
      />
    </div>
  )
}

export default MembershipFormPage
