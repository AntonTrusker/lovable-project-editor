import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

const SuccessPage = () => {
  const router = useRouter();
  const [tier, setTier] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Get the tier from the URL query parameters
    const { tier: tierParam, payment_intent } = router.query;
    
    if (tierParam) {
      setTier(Array.isArray(tierParam) ? tierParam[0] : tierParam);
    }
    
    // In a real app, you might want to fetch the member's email using the payment_intent
    // For now, we'll use a generic email
    setEmail('your-email@example.com');
  }, [router.query]);

  const getTierDetails = () => {
    switch (tier) {
      case 'explorer':
        return { name: 'Explorer', description: 'Free Community Access' };
      case 'ignite':
        return { name: 'Ignite', description: 'Essential Tools & Resources' };
      case 'forge':
        return { name: 'Forge', description: 'Growth & Scaling Support' };
      case 'vanguard':
        return { name: 'Vanguard', description: 'Elite Founder Network' };
      case 'legacy':
        return { name: 'Legacy', description: 'Founding Member Status' };
      default:
        return { name: 'Membership', description: 'Thank you for joining us!' };
    }
  };

  const tierDetails = getTierDetails();

  return (
    <>
      <Head>
        <title>Welcome to The Founders Space! | {tierDetails.name} Tier</title>
        <meta name="description" content={`Thank you for joining The Founders Space ${tierDetails.name} Tier. ${tierDetails.description}`} />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Welcome to The Founders Space!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              You're now part of the {tierDetails.name} Tier
            </p>
            <p className="mt-2 text-muted-foreground">
              {tierDetails.description}
            </p>
          </div>

          <div className="mt-12 bg-card rounded-lg shadow-sm border p-6 sm:p-8">
            <h2 className="text-lg font-medium text-foreground">What's next?</h2>
            
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600">
                    1
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">Check your email</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We've sent a confirmation to <span className="font-medium">{email}</span> with your membership details and next steps.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                    2
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">Join our community</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Access our private community platform to connect with other founders.
                  </p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/community">
                        Go to Community <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-600">
                    3
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">Explore your member benefits</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get started with your membership benefits right away.
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/resources">
                        Resources
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/events">
                        Upcoming Events
                      </Link>
                    </Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Need help?{' '}
              <a href="mailto:support@thefounders.space" className="font-medium text-primary hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
