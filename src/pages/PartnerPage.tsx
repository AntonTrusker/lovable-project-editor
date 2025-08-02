
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CheckCircle, Users, Rocket, Building2, Calendar, Wrench, Coins, GraduationCap, TrendingUp, Star, Gift, ArrowRight, Target, Zap, Globe, Award, ChevronDown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PartnershipApplicationForm from '@/components/partnership/PartnershipApplicationForm';

interface PartnershipType {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  whatYouDo: string[];
  whatYouGet: string[];
  gradient: string;
}

export default function PartnerPage() {
  const [selectedPartnershipType, setSelectedPartnershipType] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const partnershipTypes: PartnershipType[] = [
    {
      id: 'software-technology',
      title: 'SaaS & Technology',
      icon: Building2,
      description: 'Reach 50,000+ founders actively building their startups',
      whatYouDo: ['Provide exclusive discounts (50-90% off)', 'Offer startup credits and free trials', 'Share your expertise through content'],
      whatYouGet: ['Direct access to high-intent startup customers', 'Featured placement in our marketplace', 'Co-marketing opportunities and case studies'],
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'incubator-accelerator',
      title: 'Accelerators & Incubators',
      icon: Rocket,
      description: 'Connect with the best early-stage founders globally',
      whatYouDo: ['Offer program access and mentorship', 'Host workshops and masterclasses', 'Provide co-working space benefits'],
      whatYouGet: ['Curated pipeline from verified founders', 'Enhanced program visibility and applications', 'Cross-program partnerships and referrals'],
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'professional-services',
      title: 'Professional Services',
      icon: Wrench,
      description: 'Support founders with legal, financial, and operational expertise',
      whatYouDo: ['Offer discounted professional services', 'Provide free consultations and templates', 'Share compliance guidance and resources'],
      whatYouGet: ['Qualified client referrals from growing startups', 'Thought leadership and content opportunities', 'Premium directory placement and reviews'],
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'venture-capital',
      title: 'VCs & Investors',
      icon: Coins,
      description: 'Access pre-screened startups ready for investment',
      whatYouDo: ['Provide funding opportunities and guidance', 'Host investor office hours and events', 'Offer strategic advice and connections'],
      whatYouGet: ['Curated deal flow from verified founders', 'Enhanced due diligence data and insights', 'Portfolio company collaboration opportunities'],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'event-organizer',
      title: 'Event Organizers',
      icon: Calendar,
      description: 'Fill your events with engaged, high-quality founders',
      whatYouDo: ['Offer discounted tickets and VIP access', 'Provide speaking and showcase opportunities', 'Create exclusive founder networking events'],
      whatYouGet: ['Targeted promotion to relevant founder audience', 'Higher-quality attendees and speakers', 'Increased engagement and post-event value'],
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'large-corporation',
      title: 'Enterprises & Corporates',
      icon: Building2,
      description: 'Scout innovation and build strategic partnerships',
      whatYouDo: ['Offer pilot opportunities and enterprise access', 'Provide mentorship from industry executives', 'Share strategic partnership possibilities'],
      whatYouGet: ['Early access to cutting-edge technologies', 'Innovation pipeline and trend insights', 'Corporate venture and acquisition opportunities'],
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  const whyPartnersChooseUs = [
    {
      icon: Target,
      title: 'High-Intent Lead Engine',
      description: 'AI matches founders who need you right now. Export directly to your CRM.',
      stat: '40 avg SQLs/month'
    },
    {
      icon: Zap,
      title: 'Premium Brand Visibility',
      description: 'Featured spots, newsletters (55% open-rate), and stage time at events.',
      stat: '87% rate partners essential'
    },
    {
      icon: Globe,
      title: 'Global Verified Community',
      description: 'All founders are identity-verified across 120+ countries.',
      stat: '50,000+ active founders'
    },
    {
      icon: Award,
      title: 'Real-Time Analytics',
      description: 'Track CPC, CPL, MQL→SQL, and revenue attribution in one dashboard.',
      stat: '3.4× blended ROI in year 1'
    }
  ];

  const founderBenefits = [
    'Save €12,300/year via partner perks',
    'Weekly partner-led masterclasses',
    '76% adopt partner tools within 30 days',
    'Vetted, founder-friendly partners only'
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
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/10 to-background overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Star className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Early Partnership Program • Special Founding Partner Status</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
            Power the Next Wave of <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Startups</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Plug your brand, programs, and perks into the ultimate platform for founders. 
            Become a founding partner and grow faster together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-4 text-lg shadow-lg"
              onClick={() => document.getElementById('partnership-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply for Partnership
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Partners Choose Us */}
      <Collapsible
        open={expandedSections.benefits || window.innerWidth >= 768}
        onOpenChange={() => toggleSection('benefits')}
      >
        <section className="py-8 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            <CollapsibleTrigger className="w-full md:cursor-default">
              <div className="flex items-center justify-between text-center mb-8 md:mb-16">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Why Partners <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Choose Us</span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Join successful partners who are already growing their business with our platform
                  </p>
                </div>
                <ChevronDown className="h-5 w-5 md:hidden ml-4 transition-transform" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyPartnersChooseUs.map((reason, index) => (
                  <Card key={index} className="border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <reason.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{reason.description}</p>
                      <div className="text-primary font-bold text-lg">{reason.stat}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </section>
      </Collapsible>

      {/* Partnership Types */}
      <Collapsible
        open={expandedSections.types || window.innerWidth >= 768}
        onOpenChange={() => toggleSection('types')}
      >
        <section className="py-8 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <CollapsibleTrigger className="w-full md:cursor-default">
              <div className="flex items-center justify-between text-center mb-8 md:mb-16">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Partnership <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Opportunities</span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Choose how you want to support founders and grow your business
                  </p>
                </div>
                <ChevronDown className="h-5 w-5 md:hidden ml-4 transition-transform" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                {partnershipTypes.map(type => (
                  <Card key={type.id} className="overflow-hidden border-0 hover:shadow-xl transition-all duration-300 group bg-gradient-to-br from-background to-muted/10">
                    <CardHeader className={`bg-gradient-to-r ${type.gradient} text-white p-6 relative`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <type.icon className="h-5 w-5 text-white" />
                        </div>
                        <CardTitle className="text-lg font-bold text-white">
                          {type.title}
                        </CardTitle>
                      </div>
                      <p className="text-white/90 text-sm">{type.description}</p>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm">
                            <Gift className="h-4 w-4 text-green-500 mr-2" />
                            What You'll Provide
                          </h4>
                          <ul className="space-y-1">
                            {type.whatYouDo.map((item, index) => (
                              <li key={index} className="text-xs text-muted-foreground flex items-start">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center text-sm">
                            <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                            Benefits You'll Receive
                          </h4>
                          <ul className="space-y-1">
                            {type.whatYouGet.map((benefit, index) => (
                              <li key={index} className="text-xs text-muted-foreground flex items-start">
                                <Star className="h-3 w-3 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* How Partners Support Founders */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-16">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    How Partners <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Support Founders</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Your partnership creates real value for founders worldwide
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {founderBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center bg-background/80 rounded-lg p-4 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </section>
      </Collapsible>

      {/* Partnership Application Form */}
      <section id="partnership-form" className="py-8 md:py-20 px-4 sm:px-6 lg:px-8 bg-muted/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Apply for <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Partnership</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Join our founding partner program and help shape the future of entrepreneurship
            </p>
          </div>
          
          <div className="border border-border rounded-2xl p-6 md:p-8 bg-card shadow-lg">
            <PartnershipApplicationForm selectedType={selectedPartnershipType} onClose={() => {}} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
