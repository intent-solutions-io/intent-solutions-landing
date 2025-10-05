import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Briefcase, GraduationCap } from "lucide-react";

const Founder = () => {
  const achievements = [
    {
      icon: Briefcase,
      title: "Proven Track Record",
      description: "Extensive experience in AI/ML solutions development"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Established reputation in technology innovation"
    },
    {
      icon: GraduationCap,
      title: "Technical Expertise",
      description: "Deep understanding of artificial intelligence and machine learning"
    }
  ];

  return (
    <section id="founder" className="py-section">
      <div className="container mx-auto px-container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Leadership & Vision
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Intent Solutions is led by visionary founder Jeremy Longshore, who brings 
              extensive experience in AI/ML development and a proven track record of innovation.
            </p>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 md:p-12 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-3xl font-bold text-foreground mb-4">
                  Jeremy Longshore
                </h3>
                <p className="text-xl text-primary font-semibold mb-6">
                  Founder & CEO, Intent Solutions Inc.
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Jeremy Longshore is a visionary technologist with deep expertise in artificial 
                  intelligence and machine learning. His leadership drives Intent Solutions' mission 
                  to transform industries through innovative AI-powered platforms. With a proven 
                  track record in developing scalable solutions, Jeremy positions the company at 
                  the forefront of the AI revolution.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    variant="cta"
                    onClick={() => window.open('https://jeremylongshore.com/', '_blank')}
                  >
                    Personal Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://www.linkedin.com/company/intent-solutions-inc/', '_blank')}
                  >
                    LinkedIn Profile
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://www.upwork.com/freelancers/jeremylongshore', '_blank')}
                  >
                    Upwork Profile
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-background rounded-xl"
                    >
                      <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                        <achievement.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-card rounded-xl shadow-card">
              <div className="text-2xl font-bold text-primary mb-2">AI/ML</div>
              <div className="text-muted-foreground">Core Expertise</div>
            </div>
            <div className="text-center p-6 bg-gradient-card rounded-xl shadow-card">
              <div className="text-2xl font-bold text-primary mb-2">Innovation</div>
              <div className="text-muted-foreground">Proven Leadership</div>
            </div>
            <div className="text-center p-6 bg-gradient-card rounded-xl shadow-card">
              <div className="text-2xl font-bold text-primary mb-2">Vision</div>
              <div className="text-muted-foreground">Industry Transformation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;