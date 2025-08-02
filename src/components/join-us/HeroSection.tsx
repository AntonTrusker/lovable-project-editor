
import { Crown, Star, Building2, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onScrollToTiers?: () => void;
}

const HeroSection = ({ onScrollToTiers }: HeroSectionProps) => {
  const handleScrollToTiers = () => {
    if (onScrollToTiers) {
      onScrollToTiers();
    } else {
      // Default scroll behavior - scroll to the membership tiers section
      const tiersSection = document.querySelector('[data-section="membership-tiers"]');
      if (tiersSection) {
        tiersSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full pt-20 sm:pt-32 pb-16 sm:pb-20 bg-gradient-to-br from-background via-muted/5 to-background overflow-hidden min-h-[85vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 sm:bottom-40 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-primary/15 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6 sm:mb-8">
            <Building2 className="w-4 h-4 text-primary mr-2" />
            <span className="text-xs sm:text-sm font-medium text-primary">Support Our Development • Limited Availability</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 sm:mb-8 leading-tight">
            <span className="text-gradient">Choose Your</span><br />
            <span className="text-foreground">Founding Tier</span>
          </h1>
          
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            Your contribution directly funds our platform development and scaling. 
            In return, you receive <span className="text-primary font-semibold">lifetime exclusive access</span> 
            and founding member status. <span className="text-primary font-semibold">One-time contribution for lifetime benefits.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto btn-primary text-lg px-8 sm:px-10 py-4 sm:py-5 font-semibold group shadow-luxury hover:shadow-glow"
              onClick={handleScrollToTiers}
            >
              <span>Choose Your Founding Tier</span>
              <Crown className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Link to="/partner">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto bg-white/5 backdrop-blur-sm border border-white/20 text-foreground hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-5 text-lg"
                >
                  <Users className="mr-2 h-5 w-5" />
                  <span>Become a Partner</span>
                </Button>
              </Link>
              
              <Link to="/investors">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto bg-white/5 backdrop-blur-sm border border-white/20 text-foreground hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-5 text-lg"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  <span>Investors</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
