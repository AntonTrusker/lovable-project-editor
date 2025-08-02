import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TrendingUp, Target, Users, Zap, CheckCircle, Star, ArrowRight, BarChart3, Globe, Award, Shield, ChevronDown, DollarSign, Eye, Network, Lightbulb, Mail, Linkedin, FileText, Download, PieChart, Building, Rocket, TrendingDown, Sparkles, Crown, Code, Info } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { InvestorInterestForm } from '@/components/investor/InvestorInterestForm';

export default function InvestorsPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const investmentHighlights = [
    {
      icon: Globe,
      title: 'Massive Market',
      description: 'TAM of $11B+ with no integrated competitor',
      stat: '$11.04B Market',
      color: 'text-primary'
    },
    {
      icon: Code,
      title: 'Early Development',
      description: 'Building MVP with proven technical architecture',
      stat: 'Pre-launch phase',
      color: 'text-accent'
    },
    {
      icon: Network,
      title: 'Network Effects',
      description: 'Platform value increases exponentially with users',
      stat: 'Viral growth potential',
      color: 'text-primary'
    },
    {
      icon: Award,
      title: 'Experienced Team',
      description: 'Second-time founder with domain expertise',
      stat: 'Proven track record',
      color: 'text-accent'
    },
    {
      icon: DollarSign,
      title: 'Capital Efficient',
      description: 'Portugal operations provide 60% cost advantage',
      stat: '60% cost saving',
      color: 'text-primary'
    },
    {
      icon: ArrowRight,
      title: 'Clear Exit Path',
      description: 'Strategic buyers actively acquiring in space',
      stat: 'Multiple exit routes',
      color: 'text-accent'
    }
  ];

  const problemPoints = [
    {
      title: 'Fragmentation',
      description: '15+ different tools with no integration',
      impact: 'Inefficient workflows'
    },
    {
      title: 'Geographic Limitations',
      description: '52% of funding concentrated in US',
      impact: 'Limited global access'
    },
    {
      title: 'High Costs',
      description: '$500+/month for disconnected tools',
      impact: 'Expensive overhead'
    },
    {
      title: 'Poor Success Rates',
      description: '90% of startups fail due to lack of support',
      impact: 'Massive waste'
    }
  ];

  const solutionFeatures = [
    {
      category: 'AI-Powered Matching',
      features: [
        'Co-founder compatibility assessment',
        'Mentor pairing with 87% satisfaction rate',
        'Investor matching based on thesis fit'
      ],
      icon: Sparkles
    },
    {
      category: 'Global Community Platform',
      features: [
        '10,000+ verified founders (target)',
        'Local chapters in 50+ cities',
        'Virtual and in-person events'
      ],
      icon: Users
    },
    {
      category: 'Integrated Funding Marketplace',
      features: [
        'Crowdfunding to VC in one platform',
        'Automated application system',
        'Real-time funding analytics'
      ],
      icon: PieChart
    },
    {
      category: 'Operational Support Suite',
      features: [
        'Vetted service providers',
        'Document automation',
        'AI business assessment'
      ],
      icon: Shield
    }
  ];

  const marketData = [
    {
      title: 'Total Addressable Market (TAM)',
      value: '$11.04B',
      details: [
        '100M+ entrepreneurs globally',
        '582,000 new startups monthly',
        'Growing 18.3% annually'
      ]
    },
    {
      title: 'Serviceable Addressable Market (SAM)',
      value: '$2.8B',
      details: [
        'English-speaking markets',
        'Digital-first founders',
        'SaaS and marketplace spend'
      ]
    },
    {
      title: 'Serviceable Obtainable Market (SOM)',
      value: '$280M (Year 5)',
      details: [
        '10% market share achievable',
        'First-mover advantage',
        'Network effects moat'
      ]
    }
  ];

  const competitors = [
    {
      name: 'AngelList',
      focus: 'Funding only (US-focused)',
      limitation: 'Limited to US market, no community features'
    },
    {
      name: 'Y Combinator',
      focus: 'Accelerator model (highly selective)',
      limitation: 'Only 2% acceptance rate, not scalable'
    },
    {
      name: 'Indie Hackers',
      focus: 'Community only (no funding tools)',
      limitation: 'No monetization or funding features'
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="top" className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border mb-6">
            <Crown className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-foreground">Premium Investment Opportunity • Seed Round Open</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 text-foreground">
            Invest in <span className="text-gradient font-display">TheFounders</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join us in building the "Operating System for Founders" - the first truly integrated platform addressing an $11.04B market growing at 18.3% annually.
          </p>

          <div className="flex justify-center mb-8">
            <Button 
              size="lg" 
              className="btn-primary px-8 py-3 text-lg transform hover:scale-105 transition-transform"
              onClick={() => document.getElementById('pitch-deck-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Download className="mr-2 h-5 w-5" />
              Get Pitch Deck
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              About <span className="text-gradient">TheFounders</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building the first truly integrated platform for startup founders worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Target className="h-6 w-6 mr-3 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize entrepreneurship by providing founders worldwide with an integrated platform 
                  that breaks down the barriers between ideas and successful ventures. We're creating the 
                  "Operating System for Founders" - a comprehensive ecosystem that supports every stage 
                  of the entrepreneurial journey.
                </p>
              </CardContent>
            </Card>

            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Eye className="h-6 w-6 mr-3 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To become the global platform where every entrepreneur - regardless of location, 
                  background, or resources - can transform their ideas into thriving businesses. 
                  We envision a world where startup success is driven by merit and determination, 
                  not by geographic or socioeconomic advantages.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="card-luxury text-center">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Global Community</h3>
                <p className="text-muted-foreground text-sm">
                  Connecting founders across 50+ countries with a shared vision of innovation and growth
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <Lightbulb className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">AI-Powered Intelligence</h3>
                <p className="text-muted-foreground text-sm">
                  Leveraging artificial intelligence to provide personalized insights and match-making
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Integrated Platform</h3>
                <p className="text-muted-foreground text-sm">
                  One platform for everything: team building, funding, mentorship, and operational support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
              Key Investment <span className="text-gradient">Highlights</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Why TheFounders represents a compelling investment opportunity in today's market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentHighlights.map((highlight, index) => (
              <div key={index} className="card-luxury group hover:shadow-luxury transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow">
                    <highlight.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-foreground">{highlight.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{highlight.description}</p>
                    <div className={`font-bold ${highlight.color}`}>{highlight.stat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <Collapsible
        open={expandedSections.problem || window.innerWidth >= 768}
        onOpenChange={() => toggleSection('problem')}
      >
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <CollapsibleTrigger className="w-full md:cursor-default">
              <div className="flex items-center justify-between text-center mb-12">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
                    The <span className="text-destructive">Problem</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    The global startup ecosystem is fundamentally broken, creating massive inefficiencies
                  </p>
                </div>
                <ChevronDown className="h-6 w-6 md:hidden ml-4 transition-transform text-muted-foreground" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {problemPoints.map((problem, index) => (
                  <div key={index} className="card-luxury">
                    <div className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 text-foreground">{problem.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{problem.description}</p>
                        <div className="text-destructive font-semibold text-sm">{problem.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-luxury text-center">
                <TrendingDown className="h-16 w-16 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Current Market Inefficiency</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Despite $11.04B in market value, founders are forced to use 15+ disconnected tools, 
                  leading to a 90% failure rate and massive inefficiencies across the ecosystem.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </section>
      </Collapsible>

      {/* The Solution */}
      <Collapsible
        open={expandedSections.solution || window.innerWidth >= 768}
        onOpenChange={() => toggleSection('solution')}
      >
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <CollapsibleTrigger className="w-full md:cursor-default">
              <div className="flex items-center justify-between text-center mb-12">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
                    The <span className="text-gradient">Solution</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    TheFounders: The "Operating System for Founders" - an integrated platform for success
                  </p>
                </div>
                <ChevronDown className="h-6 w-6 md:hidden ml-4 transition-transform text-muted-foreground" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="grid md:grid-cols-2 gap-6">
                {solutionFeatures.map((category, index) => (
                  <Card key={index} className="card-luxury">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-foreground text-lg">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                          <category.icon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </section>
      </Collapsible>

      {/* Market Opportunity */}
      <Collapsible
        open={expandedSections.market || window.innerWidth >= 768}
        onOpenChange={() => toggleSection('market')}
      >
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <CollapsibleTrigger className="w-full md:cursor-default">
              <div className="flex items-center justify-between text-center mb-12">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
                    Market <span className="text-gradient">Opportunity</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Massive addressable market with clear growth trajectory and first-mover advantage
                  </p>
                </div>
                <ChevronDown className="h-6 w-6 md:hidden ml-4 transition-transform text-muted-foreground" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="grid md:grid-cols-3 gap-6">
                {marketData.map((market, index) => (
                  <Card key={index} className="card-luxury group">
                    <CardHeader className="text-center pb-3">
                      <div className="text-3xl font-bold text-gradient mb-3">
                        {market.value}
                      </div>
                      <CardTitle className="text-foreground">{market.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {market.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </section>
      </Collapsible>

      {/* Competitive Landscape */}
      <Collapsible
        open={expandedSections.competitive || window.innerWidth >= 768}
        onOpenChange={() => toggleSection('competitive')}
      >
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <CollapsibleTrigger className="w-full md:cursor-default">
              <div className="flex items-center justify-between text-center mb-12">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
                    Competitive <span className="text-gradient">Advantage</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Current solutions only address fragments of the founder journey - we're building the complete platform
                  </p>
                </div>
                <ChevronDown className="h-6 w-6 md:hidden ml-4 transition-transform text-muted-foreground" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {competitors.map((competitor, index) => (
                  <div key={index} className="card-luxury">
                    <h3 className="text-lg font-bold mb-2 text-foreground">{competitor.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{competitor.focus}</p>
                    <div className="text-accent font-medium text-sm">{competitor.limitation}</div>
                  </div>
                ))}
              </div>

              <div className="card-luxury text-center">
                <Rocket className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">TheFounders Advantage</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The only truly integrated platform addressing the entire founder journey from ideation to exit, 
                  with AI-powered matching and a global community of verified founders.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </section>
      </Collapsible>

      {/* Get Pitch Deck Form */}
      <section id="pitch-deck-form" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground font-display">
              Request <span className="text-gradient">Pitch Deck</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get detailed information about our investment opportunity, traction, and growth plans
            </p>
          </div>
          
          <div className="card-luxury mb-8">
            <InvestorInterestForm />
          </div>

          {/* Direct Contact - moved under the form */}
          <div className="card-luxury text-center">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Connect Directly with Our Founder</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-border hover:bg-accent/10" 
                asChild
              >
                <a href="mailto:anton@truskersolutions.com">
                  <Mail className="h-4 w-4" />
                  anton@truskersolutions.com
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-border hover:bg-accent/10" 
                asChild
              >
                <a href="https://www.linkedin.com/in/avkhrabrov" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
