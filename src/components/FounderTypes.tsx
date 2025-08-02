
import { User, Zap, Code, Heart, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const FounderTypes = () => {
  const founderTypes = [
    {
      icon: User,
      title: "First-Time Founders",
      description: "From idea to launch with guided support and proven frameworks",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Structured startup curriculum",
        "Mentor matching with experienced founders",
        "Pitch deck templates and feedback",
        "Legal and compliance guidance",
        "Product development roadmaps",
        "Early-stage funding strategies"
      ]
    },
    {
      icon: Zap,
      title: "Serial Entrepreneurs",
      description: "Scale faster with advanced tools and exclusive networks",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Advanced growth hacking strategies",
        "Access to exclusive investor networks",
        "Acquisition and exit planning",
        "Board management resources",
        "International expansion support",
        "Portfolio management tools"
      ]
    },
    {
      icon: Code,
      title: "Tech Founders",
      description: "Build better products with AI-powered insights and technical resources",
      gradient: "from-green-500 to-emerald-500",
      features: [
        "Technical co-founder matching",
        "AI-powered market analysis",
        "Product roadmap optimization",
        "Engineering talent network",
        "Technical due diligence prep",
        "Open source collaboration"
      ]
    },
    {
      icon: Heart,
      title: "Social Impact Founders",
      description: "Change the world while building sustainable businesses",
      gradient: "from-red-500 to-orange-500",
      features: [
        "Impact measurement frameworks",
        "Grant and foundation database",
        "Mission-driven investor network",
        "Social impact community",
        "Sustainability resources",
        "Global partnership opportunities"
      ]
    },
    {
      icon: TrendingUp,
      title: "Investors & VCs",
      description: "Discover exceptional founders and manage deal flow efficiently",
      gradient: "from-indigo-500 to-purple-500",
      features: [
        "Curated founder pipeline",
        "AI-powered startup screening",
        "Due diligence collaboration",
        "Portfolio company support",
        "Investment thesis matching",
        "Market intelligence reports"
      ]
    },
    {
      icon: Users,
      title: "Mentors & Advisors",
      description: "Share expertise and build meaningful connections with founders",
      gradient: "from-orange-500 to-red-500",
      features: [
        "Structured mentorship programs",
        "Advisory board matching",
        "Expertise-based matching",
        "Time management tools",
        "Impact tracking and recognition",
        "Professional development"
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Built for Every <span className="text-gradient">Type of Founder</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive ecosystem serves every member of the startup community with specialized tools and features
          </p>
        </div>

        {/* Founder Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {founderTypes.map((type, index) => (
            <div 
              key={index}
              className="card-luxury group hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${type.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
              </div>

              {/* Platform Features */}
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Platform Features:</h4>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <div className={`w-1.5 h-1.5 bg-gradient-to-r ${type.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="relative max-w-4xl mx-auto">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-xl"></div>
            
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-card/80 to-muted/40 backdrop-blur-sm border border-border/50 rounded-2xl p-12 shadow-luxury">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-4xl font-display font-bold mb-4 text-gradient">
                  Join TheFounders
                </h3>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Whether you're just starting out or scaling your next unicorn, we have the tools and community to support your journey.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/join-us" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-semibold rounded-xl px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-luxury shadow-card">
                      For Founders
                    </button>
                  </Link>
                  
                  <Link to="/partner" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-background/80 backdrop-blur-sm border-2 border-primary/30 rounded-xl px-8 py-4 text-lg font-semibold text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                      For Partners
                    </button>
                  </Link>
                  
                  <Link to="/investors" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-background/80 backdrop-blur-sm border-2 border-primary/30 rounded-xl px-8 py-4 text-lg font-semibold text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                      For Investors
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderTypes;
