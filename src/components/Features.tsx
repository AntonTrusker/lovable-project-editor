import { Calendar, Users, BookOpen, Gift, MessageCircle, Headphones, Star, CheckCircle, TrendingUp } from "lucide-react";
const Features = () => {
  const stats = [{
    value: "10,000+",
    label: "Active Founders",
    icon: Users
  }, {
    value: "87%",
    label: "Match Success Rate",
    icon: Star
  }, {
    value: "$10M+",
    label: "Funding Facilitated",
    icon: TrendingUp
  }, {
    value: "50+",
    label: "Cities Worldwide",
    icon: CheckCircle
  }];
  const features = [{
    icon: Calendar,
    title: "Exclusive Events & Masterclasses",
    items: ["Weekly webinars with unicorn founders", "Quarterly global summits in major cities", "Intimate founder-only roundtables", "Virtual coffee chats with industry leaders", "Local chapter meetups in 50+ cities"]
  }, {
    icon: Users,
    title: "AI-Powered Mentorship Network",
    items: ["87% success rate in mentor-founder matching", "1:1 sessions with successful entrepreneurs", "Industry-specific advisory boards", "Office hours with active investors", "Peer mentorship circles by stage"]
  }, {
    icon: BookOpen,
    title: "Premium Resource Library",
    items: ["500+ pitch deck and financial model templates", "Exclusive deal flow and investment insights", "Real-time market research and trend reports", "Legal document automation tools", "Competitive intelligence dashboard"]
  }, {
    icon: Gift,
    title: "Startup Credits & Partnerships",
    items: ["$100K+ in verified partner credits", "Exclusive software deals (save 20-50%)", "Legal, accounting, and HR resources", "AWS, Google Cloud, and Azure credits", "Priority access to beta tools and services"]
  }, {
    icon: MessageCircle,
    title: "Global Founder Community",
    items: ["Private community platform (10,000+ members)", "Local chapters in major startup hubs", "AI-powered founder matching algorithm", "Industry-specific discussion groups", "Real-time collaboration tools"]
  }, {
    icon: Headphones,
    title: "White-Glove Support",
    items: ["24/7 founder success concierge", "Dedicated relationship managers", "Priority platform support", "Personal onboarding and setup", "Custom solution development"]
  }];
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Join the Global Founder Revolution</h2>
          <p className="text-xl text-muted-foreground mb-12">Connecting entrepreneurs worldwide with the tools, community, and resources they need to succeed.</p>
          
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <feature.icon className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-muted-foreground text-sm flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;