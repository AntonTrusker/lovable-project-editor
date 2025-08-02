import { useState } from "react";
import { CheckCircle, Clock, Calendar, Users, Brain, DollarSign, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

const CollapsibleRoadmap = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  const roadmapItems = [
    {
      quarter: "Phase 0: Research & Discovery",
      timeline: "Q3 2025",
      status: "completed",
      title: "Strategic Foundation",
      description: "Laying the strategic and technical groundwork for the entire platform. This phase involved deep research, market validation, and architectural planning to ensure we are building the right solution.",
      achievements: [
        "✅ User Interviews & Persona Development",
        "✅ Market & Competitive Analysis", 
        "✅ Core Feature Requirements & Documentation",
        "✅ Technical Architecture & Solution Design",
        "✅ UI/UX Wireframing & Prototyping"
      ],
      icon: Brain,
      color: "from-green-500 to-emerald-500"
    },
    {
      quarter: "Phase 1: Community Foundation",
      timeline: "mid Q4 2025", 
      status: "in-progress",
      title: "Social Infrastructure",
      description: "Building the core social infrastructure. This initial phase is about creating a secure and engaging home where founders can connect, share, and discover opportunities.",
      achievements: [
        "✅ Community platform",
        "✅ Founder & Startup Profiles",
        "✅ Local Networking",
        "✅ Community Spaces & Messaging",
        "✅ Events Calendar",
        "✅ Basic Event Management System",
        "✅ Member & Mentor Directory"
      ],
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      quarter: "Phase 2: Resource & Service Hub",
      timeline: "Q1 2026",
      status: "next", 
      title: "Platform Utilities",
      description: "Adding a rich layer of utility by integrating mentorship, services, and essential resources directly into the platform.",
      achievements: [
        "🔮 Mobile App (iOS & Android)",
        "🔮 Mentor Request & Service Marketplace",
        "🔮 Founder Resource Hub (Templates, Guides)",
        "🔮 Partner Offers & Discount Section",
        "🔮 V1 of AI-powered Recommendations"
      ],
      icon: CheckCircle,
      color: "from-purple-500 to-pink-500"
    },
    {
      quarter: "Phase 3: Funding & Partner Gateway",
      timeline: "beginning of Q2 2026",
      status: "upcoming",
      title: "Funding Foundation",
      description: "Establishing the foundational tools for fundraising and creating a dedicated collaboration space for strategic partners and incubators.",
      achievements: [
        "💡 Crowdfunding Campaign Tools (V1)",
        "💡 Community Funding Rounds (V1)",
        "💡 VC Database with Investment Thesis Matching",
        "💡 Grant Discovery and Application Automation",
        "💡 Dedicated Space for Partners & Startup Incubators"
      ],
      icon: DollarSign,
      color: "from-orange-500 to-red-500"
    },
    {
      quarter: "Phase 4: Professional Funding Suite",
      timeline: "TBD",
      status: "future", 
      title: "Advanced Fundraising",
      description: "Building out the complete, professional-grade fundraising toolkit to manage the entire investment lifecycle.",
      achievements: [
        "💰 Digital Deal Rooms & Data Rooms",
        "💰 Investor CRM & Pitch Analytics",
        "💰 Legal Document Automation",
        "💰 SPV (Special Purpose Vehicle) Creation Tools"
      ],
      icon: Calendar,
      color: "from-indigo-500 to-purple-500"
    },
    {
      quarter: "Phase 5: Intelligent Matching Engine",
      timeline: "TBD",
      status: "future",
      title: "AI-Powered Connections",
      description: "Deploying the core AI-driven matching engine to facilitate high-value connections for co-founders and early-stage funding.",
      achievements: [
        "💰 AI Co-founder Matching",
        "💰 Smart Investor & Startup Matching",
        "💰 Personality & Values Assessment"
      ],
      icon: Globe,
      color: "from-cyan-500 to-teal-500"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Calendar className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (isMobile) {
    return (
      <section id="roadmap" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <div className="text-center mb-6 cursor-pointer">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h2 className="text-2xl font-display font-bold">
                    Our <span className="text-gradient">Roadmap</span>
                  </h2>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Tap to {isExpanded ? 'collapse' : 'view'} our development roadmap
                </p>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <p className="text-center text-sm text-muted-foreground mb-8">
                Building the future of entrepreneurship, one milestone at a time.
              </p>

              {/* Progress Stats */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="text-center card-luxury p-4">
                  <div className="text-2xl font-bold text-green-500 mb-1">1/6</div>
                  <div className="text-xs text-muted-foreground">Phases Completed</div>
                </div>
                <div className="text-center card-luxury p-4">
                  <div className="text-2xl font-bold text-blue-500 mb-1">Q4 2025</div>
                  <div className="text-xs text-muted-foreground">Current Focus</div>
                </div>
              </div>

              {/* Simplified Mobile Roadmap */}
              <div className="space-y-6">
                {roadmapItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="card-luxury p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(item.status)}
                          <span className="text-xs text-muted-foreground">{item.timeline}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                    <div className="space-y-1">
                      {item.achievements.slice(0, 3).map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="text-xs text-foreground">
                          {achievement}
                        </div>
                      ))}
                      {item.achievements.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{item.achievements.length - 3} more items...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center card-luxury p-4">
                <h3 className="text-lg font-bold mb-2">Beyond 2025</h3>
                <p className="text-xs text-muted-foreground">
                  Our vision extends beyond the roadmap to build a global platform where every entrepreneur has equal access to resources and connections.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    );
  }

  // Desktop version - keep existing full roadmap
  return (
    <section id="roadmap" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Our <span className="text-gradient">Roadmap</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building the future of entrepreneurship, one milestone at a time. 
            See what we've accomplished and what's coming next.
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center card-luxury">
            <div className="text-3xl font-bold text-green-500 mb-2">1/6</div>
            <div className="text-sm text-muted-foreground">Phases Completed</div>
          </div>
          <div className="text-center card-luxury">
            <div className="text-3xl font-bold text-blue-500 mb-2">Q4 2025</div>
            <div className="text-sm text-muted-foreground">Current Focus</div>
          </div>
          <div className="text-center card-luxury">
            <div className="text-3xl font-bold text-purple-500 mb-2">2026</div>
            <div className="text-sm text-muted-foreground">Major Launches</div>
          </div>
          <div className="text-center card-luxury">
            <div className="text-3xl font-bold text-orange-500 mb-2">6</div>
            <div className="text-sm text-muted-foreground">Total Phases</div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-muted-foreground/30"></div>

          {/* Roadmap Items */}
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div 
                key={index}
                className="relative flex items-start space-x-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Node */}
                <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 card-luxury">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <span className={`text-sm font-medium ${
                            item.status === 'completed' ? 'text-green-500' :
                            item.status === 'in-progress' ? 'text-blue-500' :
                            'text-muted-foreground'
                          }`}>
                            {getStatusText(item.status)}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary mb-1">{item.quarter}</div>
                      <div className="text-sm text-muted-foreground">{item.timeline}</div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="grid md:grid-cols-2 gap-3">
                    {item.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 bg-gradient-to-r ${item.color} rounded-full mt-2 flex-shrink-0`}></div>
                        <span className="text-foreground text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-20 text-center card-luxury">
          <h3 className="text-2xl font-bold mb-4">Beyond 2025</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our vision extends beyond the roadmap. We're building towards a future where 
            every entrepreneur worldwide has equal access to the resources, connections, 
            and intelligence needed to build world-changing companies.
          </p>
        </div>
      </div>
    </section>
  );
};

const getStatusText = (status: string) => {
    switch(status) {
      case 'completed':
        return '✅ Done';
      case 'in-progress':
        return '🚧 In Progress';
      case 'next':
        return '🔮 Next';
      case 'upcoming':
        return '💡 Upcoming';
      default:
        return '💰 Future';
    }
  };

export default CollapsibleRoadmap;
