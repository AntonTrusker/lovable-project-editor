
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
          Ready to Build the Future?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of founders who are already building their companies with TheFounders. 
          Your journey starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Link to="/join-us">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group">
              <span>Join TheFounders</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-border hover:bg-muted/50 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
            <Calendar className="mr-2 h-5 w-5" />
            <span>Schedule a Demo</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
