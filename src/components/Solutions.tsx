import { Brain, DollarSign, Users, Settings, ArrowRight, Star, CheckCircle, Zap, Calendar, Search, TrendingUp, Shield, Award, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const Solutions = () => {
  const [activeTab, setActiveTab] = useState(0);
  const featureGroups = [{
    id: 'community',
    title: 'Community & Networking',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Connect with 10,000+ verified founders worldwide through our comprehensive community platform',
    features: [{
      icon: Users,
      title: 'Global Founder Network',
      subtitle: 'Connect with 10,000+ verified founders worldwide',
      items: ['Join local chapters in 50+ cities', 'Attend virtual and in-person events', 'Find your tribe with interest-based communities', 'AI-powered networking that suggests valuable connections', 'One-click meeting scheduling', 'Automatic follow-up reminders']
    }, {
      icon: Calendar,
      title: 'Smart Introductions & Local Gatherings',
      subtitle: 'AI-powered networking and local meetups',
      items: ['Track relationship strength over time', 'Discover founder meetups near you', 'Host your own events with built-in RSVP', 'Virtual coffee chats with founders globally', 'Exclusive member-only gatherings', 'Structured networking opportunities']
    }]
  }, {
    id: 'intelligence',
    title: 'AI & Intelligence',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Leverage AI-powered tools for smart matching, insights, and business intelligence',
    features: [{
      icon: Search,
      title: 'AI-Powered Mentor Matching & Co-Founder Discovery',
      subtitle: 'Get matched with mentors who have solved your exact challenges',
      items: ['87% satisfaction rate on mentor connections', 'Structured mentorship programs with verified experts', 'Scientific matching algorithm for co-founders', 'Personality and working style assessment', 'Skills and experience complementarity analysis', '73% of matches lead to meaningful collaboration']
    }, {
      icon: TrendingUp,
      title: 'AI Business Coach & Intelligence',
      subtitle: '24/7 AI advisor trained on successful startups',
      items: ['Real-time business health dashboard', 'Personalized growth recommendations', 'Financial modeling and projections', 'Competitive analysis tools', 'Industry trend analysis and market intelligence', 'Early warning system for potential problems']
    }]
  }, {
    id: 'funding',
    title: 'Funding & Investment',
    icon: DollarSign,
    gradient: 'from-green-500 to-emerald-500',
    description: 'Complete funding infrastructure with 500+ verified angels and comprehensive marketplace',
    features: [{
      icon: Zap,
      title: 'All Funding Types in One Place',
      subtitle: 'Angel investor network with 500+ verified angels',
      items: ['Crowdfunding campaign tools', 'VC database with investment thesis matching', 'Grant discovery and application automation', 'AI analyzes your startup stage and recommends funding options', 'See which investors funded similar companies', 'Track application status in real-time']
    }, {
      icon: Shield,
      title: 'Pitch Perfect Tools & Deal Room',
      subtitle: 'AI-powered pitch deck builder and investor tracking',
      items: ['Investor-specific deck customization', 'Practice pitches with other founders', 'Track investor engagement with your materials', 'Founder\'s Vault: Secure repository for all critical documents', 'Investor Pipeline CRM with engagement tracking', 'Get feedback on rejections to improve']
    }]
  }, {
    id: 'operations',
    title: 'Operations & Tools',
    icon: Settings,
    gradient: 'from-orange-500 to-red-500',
    description: 'Essential tools and services with $100K+ in credits and exclusive founder discounts',
    features: [{
      icon: Award,
      title: 'Vetted Service Marketplace',
      subtitle: 'Pre-screened lawyers, accountants, designers, developers',
      items: ['Exclusive founder discounts (save 20-50%)', 'Transparent reviews from other founders', 'Escrow payment protection', '$100K+ in credits from AWS, Google, Stripe', 'Exclusive deals on 100+ startup tools', 'Automated benefit activation and usage tracking']
    }, {
      icon: Briefcase,
      title: 'Document Automation & Growth Accelerators',
      subtitle: 'Legal document templates and accelerator programs',
      items: ['Legal document templates (bylaws, contracts, NDAs)', 'Automated document generation with version control', 'Database of 1,000+ programs worldwide', 'Personalized program recommendations', 'One-click applications to multiple programs', 'AI-powered grant writing assistance']
    }]
  }];
  return <section id="solutions" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            An All-In-One Space for Founders - <span className="text-gradient">Built By Founders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stop switching between 15+ tools. Everything you need to build, fund, and scale your startup is right here.
          </p>
          
        </div>

        {/* Feature Group Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {featureGroups.map((group, index) => <button key={group.id} onClick={() => setActiveTab(index)} className={`flex items-center space-x-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === index ? `bg-gradient-to-r ${group.gradient} text-white shadow-lg` : 'bg-muted text-muted-foreground hover:bg-muted/80 border border-border'}`}>
              <group.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{group.title}</span>
              <span className="sm:hidden">{group.title.split(' ')[0]}</span>
            </button>)}
        </div>

        {/* Active Feature Group Content */}
        <div className="space-y-8">
          {/* Group Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${featureGroups[activeTab].gradient} rounded-2xl flex items-center justify-center shadow-lg mr-4`}>
                {(() => {
                const IconComponent = featureGroups[activeTab].icon;
                return <IconComponent className="w-8 h-8 text-white" />;
              })()}
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold text-foreground">{featureGroups[activeTab].title}</h3>
                <p className="text-lg text-muted-foreground">{featureGroups[activeTab].description}</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {featureGroups[activeTab].features.map((feature, index) => <div key={index} className="card-luxury animate-fade-in-up" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                {/* Feature Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${featureGroups[activeTab].gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    {(() => {
                  const IconComponent = feature.icon;
                  return <IconComponent className="w-6 h-6 text-white" />;
                })()}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.subtitle}</p>
                  </div>
                </div>

                {/* Feature Items */}
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground text-sm">{item}</span>
                    </li>)}
                </ul>
              </div>)}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          
        </div>
      </div>
    </section>;
};
export default Solutions;