import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-container py-section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-card border border-border mb-8">
            <span className="text-sm font-medium text-muted-foreground">
              AI/ML Solutions for the $2.32 Trillion Repair Market
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Transforming Industries with
            <span className="bg-gradient-hero bg-clip-text text-transparent"> AI Innovation</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Intent Solutions pioneers diagnostic platforms and youth sports development through 
            cutting-edge artificial intelligence and machine learning solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => window.open('https://diagnosticpro.io', '_blank')}
              className="px-8 py-4"
            >
              Explore DiagnosticPro
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2.32T</div>
              <div className="text-muted-foreground">Global Repair Market</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-muted-foreground">AI-Powered Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">Innovation Potential</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;