import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // No FAQ open by default on mobile
  const [sectionExpanded, setSectionExpanded] = useState(false);
  const isMobile = useIsMobile();

  const faqs = [
    {
      question: "When exactly do partner offers arrive?",
      answer: "Each signed partner drops perks in waves—expect first wave within 60 days post-campaign. You'll receive email notifications when new partner offers become available, and they'll be accessible through your member portal."
    },
    {
      question: "Will event tickets always be free for Legacy members?",
      answer: "Yes, we reserve a dedicated budget pool to cover Legacy seats at all TheFounders events. Travel & lodging remain separate expenses, but your event access is guaranteed for life."
    },
    {
      question: "Can I change T-shirt size after pledging?",
      answer: "Absolutely! You'll receive a detailed size survey before production begins. We want to ensure your merchandise fits perfectly, so you'll have ample opportunity to confirm all sizing preferences."
    },
    {
      question: "What if the funding goal isn't met?",
      answer: "All backers are refunded in full through Stripe—no cards are charged if we fall short of our funding target. We're confident in our community, but your financial protection is guaranteed."
    },
    {
      question: "Are my perks transferable to someone else?",
      answer: "No. Memberships are unique and non-transferable to maintain community trust and authenticity. Each membership is tied to the individual who purchased it and cannot be sold or given away."
    },
    {
      question: "Do you provide tax invoices for business expenses?",
      answer: "Yes! VAT-compliant invoices are automatically emailed for expense claims and business accounting. All transactions are properly documented for tax purposes."
    },
    {
      question: "Is there a mobile app planned?",
      answer: "Yes! Our mobile app is planned for release at the beginning of Q1 2026. It will include all platform features optimized for mobile use, including networking, events, and AI tools."
    },
    {
      question: "Why is there no upgrade option between tiers?",
      answer: "Scarcity drives value and keeps fulfillment predictable. Each tier has limited capacity, and allowing upgrades would compromise the exclusivity that makes each level special. Choose wisely—this is your only opportunity."
    }
  ];

  if (isMobile) {
    return (
      <section className="py-16 md:py-24 bg-muted/10 w-full">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Collapsible open={sectionExpanded} onOpenChange={setSectionExpanded}>
            <CollapsibleTrigger asChild>
              <div className="text-center mb-6 cursor-pointer">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h2 className="text-2xl font-display font-bold">
                    Frequently Asked <span className="text-gradient">Questions</span>
                  </h2>
                  {sectionExpanded ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Tap to {sectionExpanded ? 'collapse' : 'expand'} FAQ section
                </p>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-4">
              <p className="text-base text-muted-foreground text-center mb-8">
                Everything you need to know about becoming a founding member.
              </p>

              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-background rounded-xl border border-muted/30 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <button
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/5 transition-colors"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    aria-expanded={openFAQ === index}
                  >
                    <h3 className="text-sm font-semibold pr-3 leading-relaxed">
                      {faq.question}
                    </h3>
                    {openFAQ === index ? (
                      <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  
                  <div className={`
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="px-4 pb-4 pt-2">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-12 text-center">
                <h3 className="text-lg font-semibold mb-3">Still have questions?</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Reach out to our team and we'll get back to you within 24 hours.
                </p>
                <Button 
                  variant="outline" 
                  className="px-6 py-3 text-sm hover:scale-105 transition-transform"
                  onClick={() => {
                    window.open('mailto:support@thefounders.com?subject=Founding Membership Question', '_blank');
                  }}
                >
                  <span>Contact Support</span>
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-muted/10 w-full">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 md:mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about becoming a founding member.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl border border-muted/30 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <button
                className="w-full p-5 md:p-6 text-left flex items-center justify-between hover:bg-muted/5 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                aria-expanded={openFAQ === index}
              >
                <h3 className="text-base sm:text-lg font-semibold pr-4 leading-relaxed">
                  {faq.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              
              <div className={`
                transition-all duration-300 ease-in-out overflow-hidden
                ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
            Reach out to our team and we'll get back to you within 24 hours.
          </p>
          <Button 
            variant="outline" 
            className="px-6 py-4 sm:px-8 sm:py-5 text-sm sm:text-base hover:scale-105 transition-transform"
            onClick={() => {
              window.open('mailto:support@thefounders.com?subject=Founding Membership Question', '_blank');
            }}
          >
            <span>Contact Support</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
