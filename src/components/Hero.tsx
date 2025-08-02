
import { ArrowRight, Users, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const features = [
    { text: "Founder Community", icon: <Users className="w-5 h-5" /> },
    { text: "Investor Network", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M11 15h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2Z" /><path d="M17 2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2Z" /><path d="M12 9V2v7Z" /><path d="m8 22 4-4 4 4" /><path d="M3 13v-1a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v1" /><path d="M7 21v-5h14v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z" /></svg> },
    { text: "AI Tools", icon: <Zap className="w-5 h-5" /> },
    { text: "Mentorship", icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.91a2 2 0 0 0 1.66 0z" /><path d="M22 10v6" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg> }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-background overflow-hidden pt-20 pb-16">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-primary/20 shadow-lg">
          <Rocket className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Join 1000+ founders building the future</span>
        </div>

        {/* Main Headlines - More Compact */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-primary/90">
          Build. Fund. Scale.
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/90 mb-6">
          The All-In-One Platform for <span className="text-primary">Startup Founders</span>
        </h2>

        {/* Subheadline - More Concise */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          From idea to funding and beyond—unify your community, capital, and AI-powered workflows in one intelligent platform.
        </p>

        {/* Feature List - Compact Design */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
              <span className="text-primary">{feature.icon}</span>
              <span className="font-medium text-sm text-foreground">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons - More Elegant Layout */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-3xl mx-auto">
            <Link to="/join-us" className="flex-1 max-w-xs">
              <Button size="lg" className="w-full h-14 text-base font-semibold px-8 group bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary-light transition-all duration-300 transform hover:-translate-y-0.5 shadow-luxury rounded-xl border border-primary/20 backdrop-blur-sm">
                <Users className="mr-2 h-5 w-5" />
                For Founders
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            
            <Link to="/partner" className="flex-1 max-w-xs">
              <Button size="lg" className="w-full h-14 text-base font-semibold px-8 group bg-gradient-to-r from-secondary/80 to-muted hover:from-secondary hover:to-secondary/90 text-foreground transition-all duration-300 transform hover:-translate-y-0.5 shadow-card rounded-xl border border-border/40 backdrop-blur-sm">
                <Rocket className="mr-2 h-5 w-5" />
                For Partners
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            
            <Link to="/investors" className="flex-1 max-w-xs">
              <Button size="lg" className="w-full h-14 text-base font-semibold px-8 group bg-gradient-to-r from-accent/80 to-accent hover:from-accent hover:to-accent/90 text-foreground transition-all duration-300 transform hover:-translate-y-0.5 shadow-card rounded-xl border border-border/40 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M11 15h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2Z" /><path d="M17 2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2Z" /><path d="M12 9V2v7Z" /><path d="m8 22 4-4 4 4" /><path d="M3 13v-1a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v1" /><path d="M7 21v-5h14v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2Z" /></svg>
                For Investors
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
