import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-container py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg"></div>
            <span className="font-bold text-xl text-foreground">Intent Solutions</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('platforms')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              Platforms
            </button>
            <button 
              onClick={() => scrollToSection('market')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              Market
            </button>
            <button 
              onClick={() => scrollToSection('founder')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              Founder
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              Contact
            </button>
          </div>

          <Button 
            variant="cta" 
            onClick={() => window.open('https://diagnosticpro.io', '_blank')}
            className="hidden md:flex"
          >
            DiagnosticPro
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;