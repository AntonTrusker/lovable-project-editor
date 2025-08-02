
import { Twitter, Linkedin, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const footerSections = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Team", href: "#team" },
      { name: "Roadmap", href: "#roadmap" },
      { name: "Blog", href: "#blog" },
      { name: "Contact Us", href: "#contact" }
    ],
    partnerships: [
      { name: "Become a Partner", href: "/partner" },
      { name: "For Investors", href: "/investors" },
      { name: "Partnership Guide", href: "#partnership-guide" },
      { name: "Success Stories", href: "#success-stories" }
    ],
    resources: [
      { name: "Help Center", href: "#help" },
      { name: "Community Guidelines", href: "#guidelines" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Privacy Policy", href: "#privacy" }
    ],
    connect: [
      { name: "Twitter", href: "#", icon: Twitter },
      { name: "LinkedIn", href: "#", icon: Linkedin },
      { name: "Instagram", href: "#", icon: Instagram },
      { name: "YouTube", href: "#", icon: Youtube }
    ]
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-display font-bold text-gradient mb-4">
              TheFounders
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering visionary founders to build the future through an exclusive 
              community of entrepreneurs, investors, and industry leaders.
            </p>
            <div className="flex space-x-4">
              {footerSections.connect.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerSections.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnerships */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Partnerships</h4>
            <ul className="space-y-3">
              {footerSections.partnerships.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">
              Get the latest news, resources, and opportunities delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background border-border"
              />
              <Button className="btn-primary whitespace-nowrap">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2024 TheFounders. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Built for founders, by founders 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
