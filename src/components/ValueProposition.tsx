import { Globe, DollarSign, BookOpen } from "lucide-react";
const ValueProposition = () => {
  const valueProps = [{
    icon: Globe,
    title: "Connect with Industry Leaders",
    description: "Access to an exclusive network of 10,000+ founders, investors, and mentors across 45+ countries."
  }, {
    icon: DollarSign,
    title: "Raise Capital Efficiently",
    description: "Connect with our network of 500+ active investors and access exclusive funding opportunities."
  }, {
    icon: BookOpen,
    title: "Learn from the Best",
    description: "Premium content, workshops, and masterclasses from successful entrepreneurs and industry experts."
  }];
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{prop.title}</h3>
                <p className="text-muted-foreground">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ValueProposition;