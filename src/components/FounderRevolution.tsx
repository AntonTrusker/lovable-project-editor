
import { Globe, Users, TrendingUp, Zap } from "lucide-react";

const FounderRevolution = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-muted/30 to-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/20">
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Global Impact</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
          Join the Global Founder Revolution
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
          Be part of a worldwide movement of entrepreneurs, innovators, and visionaries 
          reshaping industries and creating the future. Together, we're building more than companies—we're building tomorrow.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">10,000+ Founders</h3>
            <p className="text-muted-foreground">Active entrepreneurs from 50+ countries building the next generation of companies</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">$500M+ Raised</h3>
            <p className="text-muted-foreground">Total capital raised by our community members across all funding stages</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-muted-foreground">Advanced AI tools to accelerate your journey from idea to successful exit</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderRevolution;
