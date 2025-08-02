
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Mail, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const [tier, setTier] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const tierParam = searchParams.get('tier');
    const typeParam = searchParams.get('type');
    
    if (tierParam) setTier(tierParam);
    if (typeParam) setType(typeParam);
  }, [searchParams]);

  const getTierDetails = () => {
    switch (tier) {
      case 'explorer':
        return { 
          name: 'Explorer', 
          description: 'Free Community Access',
          benefits: [
            'Digital Explorer Badge',
            'Dynamic QR Art',
            'Premium Sticker Pack',
            'Event Directory Access',
            'Monthly Digest Updates'
          ]
        };
      case 'ignite':
        return { 
          name: 'Ignite Member', 
          description: '€79 Circle Tier',
          benefits: [
            'Ignite Card with QR profile link',
            'Welcome Merch Pack',
            'Ignite Zone Community access',
            'Exclusive quarterly events',
            'Wall of Founding Sparks recognition'
          ]
        };
      case 'forge':
        return { 
          name: 'Forge Member', 
          description: '€299 Builder Tier',
          benefits: [
            'Numbered Forge Card (NFC-enabled)',
            'Premium T-shirt & Hoodie',
            'Private mastermind groups',
            'Priority event access',
            'Early platform tool access',
            'Complimentary 12-month Pro Plan'
          ]
        };
      case 'vanguard':
        return { 
          name: 'Vanguard Member', 
          description: '€699 Scale Tier',
          benefits: [
            'Gold titanium card with NFC',
            'Elite merch capsule',
            'Vanguard Council access',
            'VIP event privileges',
            'Featured founder showcase',
            'Lifetime 25% discount'
          ]
        };
      case 'legacy':
        return { 
          name: 'Legacy Founder', 
          description: '€1,399 Ultimate Tier',
          benefits: [
            'Black steel diamond-accent card',
            'Exclusive legacy capsule',
            'Strategic advisory group seat',
            'Lifetime event access',
            'Permanent legacy recognition'
          ]
        };
      default:
        return { 
          name: 'Membership', 
          description: 'Thank you for joining!',
          benefits: []
        };
    }
  };

  const tierDetails = getTierDetails();
  const isFree = type === 'free';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {isFree ? 'Welcome to the Waiting List!' : 'Welcome to TheFounders!'}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-2">
              You're now part of the {tierDetails.name} tier
            </p>
            
            <p className="text-lg text-muted-foreground">
              {tierDetails.description}
            </p>
          </div>

          <div className="bg-card rounded-2xl border shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              {isFree ? 'What happens next?' : 'Your Benefits Include:'}
            </h2>
            
            {isFree ? (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Check Your Email</h3>
                    <p className="text-muted-foreground">
                      We've sent a confirmation email with your Explorer membership details and what to expect as we build the platform.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Stay Updated</h3>
                    <p className="text-muted-foreground">
                      You'll receive monthly updates about our progress, exclusive previews, and early access opportunities.
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    <strong>Your Explorer benefits:</strong> Digital badge, QR art, sticker pack, event access, and monthly updates
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {tierDetails.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-8 text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Confirmation Email Sent
            </h3>
            <p className="text-muted-foreground mb-6">
              We've sent all the details to your email address. Keep an eye on your inbox for next steps and exclusive updates!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/">
                <Button size="lg" className="min-w-[160px]">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              {!isFree && (
                <Link to="/join-us">
                  <Button variant="outline" size="lg" className="min-w-[160px]">
                    View All Tiers
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Questions or need help?{' '}
              <a 
                href="mailto:support@thefounders.space" 
                className="text-primary hover:underline font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ThankYouPage;
