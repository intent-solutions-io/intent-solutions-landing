import { Button } from "@/components/ui/button";
import { ExternalLink, Wrench, Trophy } from "lucide-react";
import diagnosticImage from "@/assets/diagnostic-pro.jpg";
import hustleImage from "@/assets/hustle-platform.jpg";

const Platforms = () => {
  return (
    <section id="platforms" className="py-section">
      <div className="container mx-auto px-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our AI-Powered Platforms
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Two revolutionary platforms that showcase the power of artificial intelligence 
            in transforming industries and human potential.
          </p>
        </div>

        <div className="space-y-20">
          {/* DiagnosticPro Platform */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">DiagnosticPro</h3>
              </div>
              
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Universal repair diagnostics platform leveraging AI to revolutionize maintenance 
                workflows across industries. Positioned to capture significant market share in 
                the $2.32 trillion global repair market.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">AI-powered diagnostic algorithms for universal equipment repair</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Real-time problem identification and solution recommendations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Supports the right-to-repair movement with accessible diagnostics</p>
                </div>
              </div>

              <Button 
                variant="cta" 
                size="lg"
                onClick={() => window.open('https://diagnosticpro.io', '_blank')}
                className="px-8 py-4 mb-4"
              >
                Explore DiagnosticPro
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Support & Expert Inquiries</p>
                <p className="font-medium text-foreground text-sm">support@diagnosticpro.io</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-hover">
                <img 
                  src={diagnosticImage} 
                  alt="DiagnosticPro Platform" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* HUSTLE Platform */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-hover">
                <img 
                  src={hustleImage} 
                  alt="HUSTLE Platform" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">HUSTLE</h3>
              </div>
              
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Revolutionary youth sports gamification platform that transforms athletic 
                development through AI-driven engagement, motivation, and skill tracking 
                for the next generation of athletes.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Gamified training modules that increase youth sports participation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">AI-powered performance analytics and development tracking</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Social features that build community and healthy competition</p>
                </div>
              </div>

              <div className="bg-gradient-card p-6 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground mb-2">Platform Status</p>
                <p className="font-semibold text-foreground">In Development - Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platforms;