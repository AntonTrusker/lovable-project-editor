
import { Building2, Zap, Target, Rocket, Code, Users } from "lucide-react";

const InvitationSection = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Building2 className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Support Our Development Journey</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 sm:mb-8">
            Fund the Future of <span className="text-gradient">Entrepreneurship</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              TheFounders isn't just another platform—it's a <span className="text-primary font-semibold">revolutionary ecosystem</span> that will 
              transform how entrepreneurs connect, collaborate, and scale globally. We have the vision, the team, and the blueprint. 
              Now we need <span className="text-primary font-semibold">your support</span> to bring it to life.
            </p>
            <p>
              Your founding membership contribution directly funds our core development, infrastructure scaling, and strategic partnerships. 
              In return, you secure <span className="text-primary font-semibold">lifetime exclusive access</span> to the platform, premium benefits, 
              and founding member status that will never be available again.
            </p>
          </div>
        </div>

        {/* Development Impact Grid */}
        <div className="relative grid lg:grid-cols-2 gap-8 xl:gap-16 mb-16 sm:mb-20 items-start w-full">
          {/* Vertical divider for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-muted/0 via-muted/60 to-muted/0 z-10" />
          
          {/* Your Investment Impact */}
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
                <Rocket className="w-4 h-4 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-blue-500">Your Investment Impact</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                <span className="text-xl sm:text-2xl md:text-3xl mr-2">🚀</span> How Your Support <span className="text-gradient">Transforms the Startup World:</span>
              </h3>
            </div>

            <div className="rounded-2xl bg-card/90 border border-border p-6 md:p-8 flex flex-col gap-6 shadow-xl">
              <ul className="space-y-6">
                {[
                  {
                    emoji: "🏗️",
                    title: "Platform Architecture & Development",
                    description: "Build the revolutionary AI-powered matching system that connects founders with perfect co-founders, mentors, and investors based on deep compatibility analysis and success patterns."
                  },
                  {
                    emoji: "🌍",
                    title: "Global Infrastructure & Scale",
                    description: "Deploy enterprise-grade cloud infrastructure across multiple continents, ensuring lightning-fast performance and bulletproof security for our growing international community."
                  },
                  {
                    emoji: "🤝",
                    title: "Strategic Partnership Network",
                    description: "Forge exclusive partnerships with top-tier VCs, accelerators, and Fortune 500 companies to unlock unprecedented opportunities, funding pathways, and mentorship for our members."
                  },
                  {
                    emoji: "🎯",
                    title: "Community Building & Events",
                    description: "Launch local chapters in 50+ cities worldwide, host exclusive networking events, and create curated mastermind groups that turn connections into life-changing collaborations."
                  },
                  {
                    emoji: "🔬",
                    title: "Innovation Lab & Research",
                    description: "Continuously innovate with cutting-edge features like AI-powered market analysis, startup success prediction models, and automated investor matching based on thesis alignment."
                  }
                ].map((impact, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="text-2xl flex-shrink-0">{impact.emoji}</span>
                    <div>
                      <span className="font-bold text-lg text-blue-400 block mb-2">{impact.title}</span>
                      <span className="text-muted-foreground text-sm leading-relaxed">{impact.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Your Founding Benefits */}
          <div className="flex flex-col gap-8 sm:gap-10">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20 mb-4">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm font-medium text-green-500">Your Founding Benefits</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
                <span className="text-xl sm:text-2xl md:text-3xl mr-2">👑</span> Exclusive <span className="text-gradient">Lifetime Legacy Rewards:</span>
              </h3>
            </div>

            <div className="rounded-2xl bg-card/90 border border-border p-6 md:p-8 flex flex-col gap-6 shadow-xl">
              <ul className="space-y-6">
                {[
                  {
                    emoji: "🏆",
                    title: "Founding Member Legacy Status",
                    description: "Permanent recognition as a founding member with exclusive digital badges, priority profile placement, and your name immortalized in our Hall of Founders—a status that will become increasingly valuable as we grow."
                  },
                  {
                    emoji: "🎁",
                    title: "Premium Physical Collectibles",
                    description: "Receive exclusive numbered cards, limited-edition merchandise, and premium collectibles that showcase your founding member status. These items become more valuable and exclusive as our community grows."
                  },
                  {
                    emoji: "🔓",
                    title: "Lifetime VIP Platform Access",
                    description: "Never pay subscription fees again. Your one-time founding contribution grants permanent access to all premium features, tools, and services—saving you thousands in future subscription costs."
                  },
                  {
                    emoji: "🌟",
                    title: "VIP Global Event Network",
                    description: "Lifetime priority access to all TheFounders events worldwide, including exclusive founder dinners, investor pitch events, and invitation-only networking experiences in major startup hubs."
                  },
                  {
                    emoji: "🎯",
                    title: "Beta Features & Early Access",
                    description: "Get first access to new features, tools, and partnerships before anyone else. Test cutting-edge AI tools, exclusive investor networks, and breakthrough startup resources months before public release."
                  }
                ].map((benefit, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <span className="text-2xl flex-shrink-0">{benefit.emoji}</span>
                    <div>
                      <span className="font-bold text-lg text-green-400 block mb-2">{benefit.title}</span>
                      <span className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Scarcity Message */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20 mb-4">
            <Zap className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-sm font-medium text-red-500">Limited Time Opportunity</span>
          </div>
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">This is your only chance</span> to become a founding member. 
            Once we reach capacity or launch publicly, these exclusive tiers and benefits will never be available again. 
            <span className="text-primary font-semibold"> Join the founding movement today!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
