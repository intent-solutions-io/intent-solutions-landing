import { Button } from "@/components/ui/button";
import { Mail, Globe, ExternalLink, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-section bg-gradient-section">
      <div className="container mx-auto px-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Innovate Together?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Partner with Intent Solutions to harness the power of AI and transform your industry. 
              Let's explore how our platforms can drive your success.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Connect With Intent Solutions
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Website</div>
                    <div className="text-muted-foreground">intentsolutions.io</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Get In Touch</div>
                    <div className="text-muted-foreground">Reach out through our platforms</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-card p-6 rounded-xl border border-border">
                <h4 className="font-semibold text-foreground mb-3">Partnership Opportunities</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We're actively seeking strategic partnerships, investment opportunities, 
                  and collaborations with forward-thinking organizations ready to embrace 
                  AI-powered solutions.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-card p-8 rounded-2xl shadow-card">
                <h4 className="text-xl font-bold text-foreground mb-4">
                  Explore DiagnosticPro
                </h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Experience our flagship AI-powered diagnostic platform and discover 
                  how it can revolutionize your repair workflows.
                </p>
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => window.open('https://diagnosticpro.io', '_blank')}
                >
                  Visit DiagnosticPro
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="bg-gradient-card p-8 rounded-2xl shadow-card">
                <h4 className="text-xl font-bold text-foreground mb-4">
                  Connect with Jeremy
                </h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get to know our founder and the vision driving Intent Solutions forward.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://jeremylongshore.com/', '_blank')}
                >
                  Jeremy's Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;