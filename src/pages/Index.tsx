
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FounderRevolution from "@/components/FounderRevolution";
import ProblemStatement from "@/components/ProblemStatement";
import Solutions from "@/components/Solutions";
import FounderTypes from "@/components/FounderTypes";
import Features from "@/components/Features";
import MissionVision from "@/components/MissionVision";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <FounderRevolution />
      
      <div className="space-y-16 md:space-y-20">
        <MissionVision />
        <ProblemStatement />
        <Solutions />
        <FounderTypes />
        <Features />
        <Roadmap />
        <FAQ />
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
