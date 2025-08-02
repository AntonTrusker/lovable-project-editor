
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path: string) => {
    if (location.pathname === path) {
      scrollToTop();
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const navigationItems = [
    { label: "Founders", path: "/join-us" },
    { label: "Investors", path: "/investors" },
    { label: "Partners", path: "/partner" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" 
            onClick={() => handleNavigation("/")}
          >
            <img 
              src="/src/assets/thefounders-logo-new.png" 
              alt="TheFounders" 
              className="h-8 sm:h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <span className="text-muted-foreground font-medium text-sm">
              Join us:
            </span>
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="px-3 lg:px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent/50 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="hover:bg-accent/50 px-2">
                <span className="text-lg">☰</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left text-base">Join us</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-1 mt-6">
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="justify-start w-full px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-accent/50"
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
