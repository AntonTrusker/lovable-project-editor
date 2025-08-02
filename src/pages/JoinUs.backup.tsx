
import { useState } from "react";
import { Check, Star, Crown, Zap, Building2, Badge, Clock, Shield, Gift, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const JoinUs = (): JSX.Element => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const scrollToTiers = () => {
    const tiersSection = document.getElementById('membership-tiers');
    tiersSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const membershipTiers = [
    {
      id: "explorer",
      name: "Explorer",
      tier: "Tier 0",
      icon: Badge,
      price: "Free",
      originalPrice: null,
      cap: "Unlimited",
      gradient: "from-gray-500 to-gray-600",
      theme: "Step inside & watch the sparks fly.",
      description: "Digital Explorer Badge & Premium Sticker Pack",
      features: [
        "Digital Explorer Badge: Shareable proof you were here first",
        "Dynamic QR Art: Personalised graphic linking to your referral profile",
        "Premium Sticker Pack",
        "Event Directory Access: Browse all public events",
        "Monthly Digest: Roadmap updates and partner promotions"
      ],
      isPopular: false
    },
    {
      id: "ignite",
      name: "Ignite Member",
      tier: "Tier 1",
      icon: Zap,
      price: "€79",
      originalPrice: null,
      cap: "3,000",
      gradient: "from-orange-500 to-red-500",
      theme: "You've sparked the flame—welcome to the Circle.",
      description: "Matte-graphite PVC card with QR profile link",
      features: [
        "Ignite Card: Matte-graphite PVC card with QR profile link",
        "Welcome Merch Pack: Minimalist T-shirt (black or white) and sticker trio",
        "Ignite Zone Community: Private channel for idea-stage builders",
        "Exclusive Event Access: Quarterly virtual meet-ups and early-bird registration",
        "Permanent Recognition: Name on the digital Wall of Founding Sparks"
      ],
      isPopular: true
    },
    {
      id: "forge",
      name: "Forge Member", 
      tier: "Tier 2",
      icon: Star,
      price: "€299",
      originalPrice: null,
      cap: "1,500",
      gradient: "from-blue-500 to-purple-500",
      theme: "You're shaping something real—let's build it together.",
      description: "Precision-crafted, brushed-aluminium, NFC-enabled card",
      features: [
        "Forge Card: Brushed-aluminium, NFC-enabled card, individually numbered",
        "Forge Merch Kit: Premium T-shirt & Hoodie with TheFounders branding",
        "Forge Circle Masterminds: Private, industry-specific mastermind groups",
        "Priority Event Access: Regional meet-ups, Beta Weekend, closed workshops",
        "Advanced Tools: Early access to co-founder matcher, pitch vault, investor discovery",
        "Complimentary 6-month Pro Plan upon launch"
      ],
      isPopular: false
    },
    {
      id: "vanguard",
      name: "Vanguard Member",
      tier: "Tier 3", 
      icon: Crown,
      price: "€599",
      originalPrice: null,
      cap: "500",
      gradient: "from-purple-500 to-pink-500",
      theme: "You're on the front-lines of scale—lead with others like you.",
      description: "Gold-tinted titanium card with NFC & dynamic QR",
      features: [
        "Vanguard Card: Gold-tinted titanium card with NFC & dynamic QR",
        "Elite Merch Capsule: Premium T-shirt, Hoodie, plus numbered field notebook",
        "Vanguard Council: High-signal peer group with curated introductions",
        "VIP Event Access: VIP check-in, complimentary tickets, exclusive quarterly meetups",
        "Platform Showcase: Featured profile in Founders of 2025 showcase",
        "Lifetime 25% discount on all future TF services"
      ],
      isPopular: false
    },
    {
      id: "legacy",
      name: "Legacy Founder",
      tier: "Tier 4",
      icon: Building2,
      price: "€1,499",
      originalPrice: null,
      cap: "100",
      gradient: "from-yellow-500 to-orange-500", 
      theme: "You've walked the road—now help define it for others.",
      description: "Solid black steel card with diamond-accent engraving",
      features: [
        "Legacy Card: Black steel card with diamond-accent and personalised Founder Code",
        "Legacy Capsule: Premium merch, special present, and framed Legacy Letter",
        "The Hall: Lifetime seat in strategic advisory group, nominate Founder-in-Residence",
        "Ultimate Event Access: Lifetime ticket-free access to every TF event",
        "Permanent Legacy: Founder story in Legacy Library, lifetime tool access"
      ],
      isPopular: false
    }
  ];

  const faqs = [
    {
      question: "When exactly do partner offers arrive?",
      answer: "Each signed partner drops perks in waves—expect first wave within 60 days post-campaign."
    },
    {
      question: "Will event tickets always be free for Legacy?",
      answer: "Yes, we reserve a budget pool to cover Legacy seats. Travel & lodging remain separate."
    },
    {
      question: "Can I change T-shirt size after pledging?",
      answer: "Yes, you'll receive a size survey before production locks."
    },
    {
      question: "What if the funding goal isn't met?",
      answer: "All backers are refunded in full; no cards charged if we fall short."
    },
    {
      question: "Are my perks transferable?",
      answer: "No. Memberships are unique and non-transferable to maintain community trust."
    },
    {
      question: "Tax invoices?",
      answer: "Yes. VAT-compliant invoices auto-emailed for expense claims."
    },
    {
      question: "Is there a mobile app?",
      answer: "Planned for beginning of Q1 2026"
    },
    {
      question: "Why no upgrade option?",
      answer: "Scarcity drives value and keeps fulfilment predictable. Choose wisely now."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-8">
              <Crown className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Founding Membership • Limited Time</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight">
              Become a <span className="text-gradient">Founding Patron</span> of TheFounders
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto mb-12 leading-relaxed">
              Your support builds the definitive ecosystem for entrepreneurs. Your reward is a lifetime of 
              unparalleled access and exclusive status. This is your <span className="text-primary font-semibold">one-time opportunity</span> to join the inner circle.
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                size="lg" 
                className="btn-primary text-lg px-10 py-5 text-lg font-semibold group shadow-luxury hover:shadow-glow"
                onClick={scrollToTiers}
              >
                Claim Your Founding Membership
                <Crown className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 px-8 py-5 text-lg"
              >
                <Star className="mr-2 h-5 w-5" />
                See Member Benefits
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="membership-tiers" className="py-24 bg-gradient-to-b from-muted/10 via-muted/20 to-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <Crown className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Founding Membership Tiers</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              TheFounders – <span className="text-gradient">Founding Membership Plan</span>
            </h2>
          </div>

          <div className="space-y-6">
            {membershipTiers.map((tier, index) => {
              const IconComponent = tier.icon;
              return (
                <Card 
                  key={tier.id}
                  className={`relative overflow-hidden card-pricing group flex flex-col justify-between h-full ${
                    tier.isPopular ? 'ring-2 ring-primary shadow-luxury' : ''
                  } ${selectedTier === tier.id ? 'ring-2 ring-primary' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tier.isPopular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-light text-primary-foreground text-center py-2 text-sm font-semibold">
                      ⭐ Most Popular
                    </div>
                  )}
                  
                  <CardContent className={`flex flex-col h-full p-6 sm:p-8 ${tier.isPopular ? 'pt-12' : 'pt-8'}`}>
                    <div className="flex flex-col md:flex-row gap-6 h-full justify-between items-center">
                      <div className="w-full md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
                        <div className="text-xs font-medium text-muted-foreground/70 mb-3 tracking-wider uppercase">
                          {tier.tier}
                        </div>
                        
                        <div className={`w-20 h-20 bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        
                        <CardTitle className="text-2xl font-bold mb-2">{tier.name}</CardTitle>
                        <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
                          "{tier.theme}"
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-center md:justify-start space-x-2">
                            <span className="text-4xl font-bold text-gradient">{tier.price}</span>
                          </div>
                          <div className="inline-flex items-center px-3 py-1 bg-muted/50 rounded-full">
                            <Users className="w-3 h-3 text-muted-foreground mr-1" />
                            <p className="text-xs text-muted-foreground font-medium">
                              {tier.cap === "Unlimited" ? "∞" : tier.cap} members
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/2 md:px-4">
                        <div className="text-center md:text-left mb-6">
                          <h4 className="text-lg font-semibold text-primary mb-4">Exclusive Benefits:</h4>
                        </div>
                        
                        <ul className="space-y-4">
                          {tier.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-3 text-sm">
                              <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span className="leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="w-full md:w-1/4 flex md:justify-end mt-6 md:mt-0">
                        <Button 
                          className={`w-full md:w-auto md:min-w-[200px] ${tier.id === 'explorer' ? 'btn-secondary' : 'btn-primary'} group text-center`}
                          onClick={() => setSelectedTier(tier.id)}
                        >
                          <span className="flex items-center justify-center">
                            {tier.id === 'explorer' ? (
                              <>
                                <Badge className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                <span>Join Waiting List</span>
                              </>
                            ) : (
                              <>
                                <Crown className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                <span>Select {tier.name}</span>
                              </>
                            )}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trust & Compliance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: Shield,
                title: "Secure Checkout via Stripe",
                description: "Your payment information is protected"
              },
              {
                icon: Check,
                title: "EU GDPR Compliant", 
                description: "Optional pseudonymous profiles supported"
              },
              {
                icon: Clock,
                title: "14-Day Refund Window",
                description: "No risk during cool-off period"
              },
              {
                icon: Badge,
                title: "Transparent Financials",
                description: "Quarterly spend reports shared with all backers"
              }
            ].map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            One pledge today. <span className="text-gradient">Endless opportunities tomorrow.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the exclusive circle of founders who are building the future of entrepreneurship together.
          </p>
          <Button 
            size="lg" 
            className="btn-primary text-lg px-8 py-4"
            onClick={scrollToTiers}
          >
            Choose Your Founding Membership
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinUs;
