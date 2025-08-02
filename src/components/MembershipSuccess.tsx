import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MembershipSuccessProps {
  memberName: string;
  tierName: string;
  onClose: () => void;
}

export function MembershipSuccess({ memberName, tierName, onClose }: MembershipSuccessProps) {
  return (
    <div className="text-center p-6">
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
        <CheckCircle2 className="h-12 w-12 text-green-600" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-gray-900">Welcome to the community, {memberName}!</h3>
      
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-left max-w-2xl mx-auto">
        <h4 className="text-lg font-medium text-green-800 mb-2">Your {tierName} Membership is Active</h4>
        <p className="text-green-700">
          Thank you for joining our community of founders. We're excited to have you on board!
        </p>
        
        <div className="mt-4 space-y-2 text-sm text-green-700">
          <p>✓ Full access to member benefits</p>
          <p>✓ Exclusive resources and tools</p>
          <p>✓ Invitation to our private community</p>
          <p>✓ 24/7 support via email</p>
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <p className="text-gray-600">
          We've sent a confirmation email with all the details about your membership.
          Keep an eye on your inbox for next steps!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 px-6 py-3 text-base"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base"
          >
            Close
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          Need help?{' '}
          <a href="mailto:support@founderspace.com" className="text-green-600 hover:text-green-700 font-medium">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}
