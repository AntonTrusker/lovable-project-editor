
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import MembershipTier from './MembershipTier';
import { tiers, getPopularTier, getRecommendedTier } from '@/data/tiers';

const CollapsibleMembershipTiers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // On desktop, always show tiers
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Choose Your Founding Member Tier
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us in building the future of entrepreneurship. Each tier offers exclusive benefits and helps support our mission.
          </p>
        </div>

        {/* Mobile: Collapsible Section */}
        {isMobile && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full mb-4 sm:mb-6 text-sm sm:text-base font-semibold h-10 sm:h-12"
              >
                {isOpen ? 'Hide' : 'View'} Membership Tiers
                <span className="ml-2 text-lg">
                  {isOpen ? '▲' : '▼'}
                </span>
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {tiers.map((tier, index) => (
                  <MembershipTier
                    key={tier.id}
                    tier={tier}
                    popular={tier.id === 'forge'}
                    recommended={tier.id === 'explorer'}
                    isMobile={true}
                  />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Desktop: Always Visible */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
            {tiers.map((tier, index) => (
              <MembershipTier
                key={tier.id}
                tier={tier}
                popular={tier.id === 'forge'}
                recommended={tier.id === 'explorer'}
                isMobile={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CollapsibleMembershipTiers;
