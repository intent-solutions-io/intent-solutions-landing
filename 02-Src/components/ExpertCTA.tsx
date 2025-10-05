import { Button } from "@/components/ui/button";
import { Mail, Award, Calculator, BookOpen, Star, Headphones } from "lucide-react";

const ExpertCTA = () => {
  const expertFeatures = [
    {
      icon: BookOpen,
      title: "Expert Guidelines",
      description: "Comprehensive onboarding and best practices"
    },
    {
      icon: Calculator,
      title: "Earnings Calculator",
      description: "Transparent compensation structure"
    },
    {
      icon: Star,
      title: "Success Stories",
      description: "Learn from top-performing experts"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Dedicated support for our professionals"
    }
  ];

  return (
    <section className="py-16 bg-gradient-section">
      <div className="container mx-auto px-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-card border border-border mb-6">
              <Award className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">For Experts</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Platform
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Share your diagnostic expertise and help shape the future of universal repair solutions. 
              Connect with thousands of technicians worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {expertFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-card p-6 rounded-xl shadow-card text-center"
              >
                <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-card p-8 rounded-2xl shadow-card text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Ready to Become a DiagnosticPro Expert?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
              Join our growing network of diagnostic professionals and help revolutionize 
              the repair industry with AI-powered solutions.
            </p>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => window.location.href = 'mailto:support@diagnosticpro.io?subject=Expert Application - DiagnosticPro Platform'}
              className="px-8 py-4"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Expert Support
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Email: support@diagnosticpro.io
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertCTA;