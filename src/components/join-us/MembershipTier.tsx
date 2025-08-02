import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, Star, Zap, Users, Gift, Crown, Flame, Hammer, Shield, Trophy, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { MembershipSignupForm } from './MembershipSignupForm';
import { Tier } from '@/types/supabase';

interface MembershipTierProps {
  tier: Tier;
  popular?: boolean;
  recommended?: boolean;
  isMobile?: boolean;
}

const MembershipTier = ({ tier, popular = false, recommended = false, isMobile = false }: MembershipTierProps) => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isMobile); // Desktop shows all details by default

  const getCardGradient = () => {
    if (popular) return 'border-primary shadow-xl scale-[1.02] bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 ring-2 ring-primary/20';
    if (recommended) return 'border-accent shadow-lg bg-gradient-to-br from-accent/8 to-secondary/5 ring-1 ring-accent/30';
    return 'hover:shadow-lg transition-all duration-300 hover:scale-[1.01] bg-gradient-to-br from-card to-card/50';
  };

  const getTierIcon = () => {
    switch (tier.id) {
      case 'explorer': return <Users className="w-6 h-6 text-blue-500" />;
      case 'ignite': return <Flame className="w-6 h-6 text-orange-500" />;
      case 'forge': return <Hammer className="w-6 h-6 text-purple-500" />;
      case 'vanguard': return <Shield className="w-6 h-6 text-green-500" />;
      case 'legacy': return <Crown className="w-6 h-6 text-yellow-500" />;
      default: return <Sparkles className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStripePaymentLink = () => {
    switch (tier.id) {
      case 'legacy': return 'https://buy.stripe.com/bJe28tdwNdCT3pb0V48g003';
      case 'vanguard': return 'https://buy.stripe.com/eVq6oJeAReGX1h37js8g002';
      case 'forge': return 'https://buy.stripe.com/5kQaEZfEV8iz3pb8nw8g001';
      case 'ignite': return 'https://buy.stripe.com/6oU5kF9gx1Ube3P1Z88g000';
      default: return null;
    }
  };

  const handlePaymentClick = () => {
    // Always show the signup form first
    setShowSignupForm(true);
  };

  const handleFormComplete = () => {
    // After form completion, redirect to Stripe for paid tiers
    const stripeLink = getStripePaymentLink();
    
    if (stripeLink) {
      // Open Stripe payment link in a new tab
      window.open(stripeLink, '_blank');
    }
    
    // Close the form
    setShowSignupForm(false);
  };

  const getButtonText = () => {
    if (tier.price > 0) {
      return `Continue to Payment - ${tier.display_price}`;
    }
    return `Join ${tier.name}`;
  };

  // Extract capacity from tiers data or default text
  const capacity = (tier as any).capacity || 'Limited spots available';

  return (
    <>
      <Card className={`relative transition-all duration-300 ${getCardGradient()}`}>
        {popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-1.5 shadow-lg border-0 font-semibold">
              <Star className="w-4 h-4 mr-1.5 fill-current" />
              POPULAR
            </Badge>
          </div>
        )}
        
        {recommended && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Badge variant="secondary" className="bg-gradient-to-r from-accent to-accent/80 px-4 py-1.5 shadow-md border-0 font-semibold">
              <Zap className="w-4 h-4 mr-1.5" />
              RECOMMENDED
            </Badge>
          </div>
        )}

        {/* Header - Always Visible */}
        <CardHeader className="text-center pb-4 pt-8">
          <div className="flex justify-center mb-3">
            {getTierIcon()}
          </div>
          
          <CardTitle className="text-2xl font-bold mb-2">
            {tier.name}
          </CardTitle>
          
          <div className="text-sm text-muted-foreground font-medium mb-4 px-2 py-1 bg-muted/50 rounded-full">
            {capacity}
          </div>
          
          <div className="mb-4">
            <div className="text-4xl font-bold text-primary mb-1">{tier.display_price}</div>
            {tier.price > 0 && (
              <div className="text-sm text-muted-foreground">one-time payment</div>
            )}
          </div>
        </CardHeader>

        {/* Button - Always Visible */}
        <CardContent className="px-6 pb-4">
          <Button
            onClick={handlePaymentClick}
            className={`w-full h-12 font-semibold text-base transition-all duration-300 mb-4 ${
              popular 
                ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl' 
                : recommended 
                ? 'bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent shadow-md hover:shadow-lg' 
                : 'hover:shadow-md'
            }`}
          >
            {getButtonText()}
          </Button>

          {/* Collapsible Details - Only on mobile */}
          {isMobile ? (
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isExpanded ? (
                    <>
                      Hide Details <ChevronUp className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      View Details <ChevronDown className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-4">
                <CardDescription className="text-base leading-relaxed px-2 mb-6">
                  {tier.description}
                </CardDescription>

                <div className="mb-6">
                  <div className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Your Support Includes:
                  </div>
                  <ul className="space-y-3">
                    {tier.features?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-primary stroke-2" />
                        </div>
                        <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {tier.price > 0 && (
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      Secure payment • No recurring charges
                    </p>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            /* Desktop - Always show details */
            <div className="mt-4">
              <CardDescription className="text-base leading-relaxed px-2 mb-6">
                {tier.description}
              </CardDescription>

              <div className="mb-6">
                <div className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Your Support Includes:
                </div>
                <ul className="space-y-3">
                  {tier.features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-primary stroke-2" />
                      </div>
                      <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {tier.price > 0 && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Secure payment • No recurring charges
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {showSignupForm && (
        <MembershipSignupForm
          selectedTier={tier}
          onClose={() => setShowSignupForm(false)}
          onFormComplete={handleFormComplete}
        />
      )}
    </>
  );
};

export default MembershipTier;
