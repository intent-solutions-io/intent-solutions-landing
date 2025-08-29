import { Brain, Cog, TrendingUp, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI/ML Expertise",
      description: "Advanced algorithms and machine learning models that deliver intelligent solutions across industries."
    },
    {
      icon: Cog,
      title: "Universal Diagnostics",
      description: "Comprehensive diagnostic platforms that revolutionize repair and maintenance workflows."
    },
    {
      icon: Users,
      title: "Youth Development",
      description: "Gamified sports platforms that engage and develop the next generation of athletes."
    },
    {
      icon: TrendingUp,
      title: "Market Leadership",
      description: "Positioned at the forefront of the right-to-repair movement and technological innovation."
    }
  ];

  return (
    <section id="about" className="py-section bg-gradient-section">
      <div className="container mx-auto px-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Pioneering AI Solutions
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Intent Solutions Inc. stands at the intersection of artificial intelligence and practical 
            application, developing platforms that transform how industries approach diagnostics, 
            repair, and human development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-card p-8 rounded-xl shadow-card hover:shadow-hover transition-smooth"
            >
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-card rounded-2xl p-8 md:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Ready for Google Cloud Partnership
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our AI/ML solutions are built with enterprise-grade architecture, 
                scalable cloud infrastructure, and cutting-edge technologies that 
                align perfectly with Google Cloud's innovation ecosystem.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Enterprise-ready AI/ML platforms</span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Scalable cloud architecture</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="text-2xl font-bold text-primary mb-2">AI/ML</div>
                <div className="text-sm text-muted-foreground">Core Technology</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="text-2xl font-bold text-primary mb-2">Cloud</div>
                <div className="text-sm text-muted-foreground">Native Architecture</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="text-2xl font-bold text-primary mb-2">Scale</div>
                <div className="text-sm text-muted-foreground">Enterprise Ready</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl">
                <div className="text-2xl font-bold text-primary mb-2">Innovation</div>
                <div className="text-sm text-muted-foreground">Continuous R&D</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;