
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/join-us/HeroSection';
import InvitationSection from '@/components/join-us/InvitationSection';
import CollapsibleMembershipTiers from '@/components/join-us/CollapsibleMembershipTiers';
import FAQSection from '@/components/join-us/FAQSection';

const JoinUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection />
      <InvitationSection />

      <CollapsibleMembershipTiers />

      <FAQSection />
      <Footer />
    </div>
  );
};

export default JoinUs;
