import { Target, Eye, Heart, Globe } from "lucide-react";
const MissionVision = () => {
  const values = [{
    icon: Globe,
    title: "Global Impact",
    description: "Empowering founders worldwide to build solutions that matter"
  }, {
    icon: Heart,
    title: "Community First",
    description: "Fostering genuine connections and mutual support among entrepreneurs"
  }, {
    icon: Target,
    title: "Innovation",
    description: "Leveraging AI and technology to solve real founder challenges"
  }];
  return <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Mission */}
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-display font-bold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              To democratize entrepreneurship by providing every founder, regardless of location or background, 
              with access to the resources, connections, and intelligence needed to build successful, 
              world-changing companies.
            </p>
            <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
              <p className="text-foreground font-medium italic">
                "We believe that the next breakthrough innovation could come from anywhere. 
                Our role is to ensure every founder has the tools to make it happen."
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="animate-fade-in-up" style={{
          animationDelay: "0.2s"
        }}>
            <div className="flex items-center space-x-4 mb-6">
              
              <h2 className="text-3xl font-display font-bold">Our Vision</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A world where entrepreneurial success is determined by the quality of ideas and execution, 
              not by geographical location, network connections, or access to capital. 
              We envision a global startup ecosystem that is truly inclusive and merit-based.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-foreground">100,000+ founders by 2026</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-foreground">Global presence in 100+ countries</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <span className="text-foreground">$10B+ in funding facilitated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-display font-bold mb-6">Our Core Values</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => <div key={index} className="text-center group animate-fade-in-up" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <value.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h4 className="text-xl font-bold mb-3">{value.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default MissionVision;