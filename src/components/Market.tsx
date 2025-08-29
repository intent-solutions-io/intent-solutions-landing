import { TrendingUp, DollarSign, Globe, Users } from "lucide-react";

const Market = () => {
  const marketStats = [
    {
      icon: DollarSign,
      value: "$2.32T",
      label: "Global Repair Market",
      description: "Massive opportunity in universal repair diagnostics"
    },
    {
      icon: TrendingUp,
      value: "15%",
      label: "Annual Growth Rate",
      description: "Right-to-repair movement driving market expansion"
    },
    {
      icon: Globe,
      value: "Global",
      label: "Market Reach",
      description: "Worldwide demand for accessible diagnostic solutions"
    },
    {
      icon: Users,
      value: "Millions",
      label: "Youth Athletes",
      description: "Target market for sports gamification platforms"
    }
  ];

  return (
    <section id="market" className="py-section bg-gradient-section">
      <div className="container mx-auto px-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Massive Market Opportunity
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Intent Solutions is positioned at the convergence of trillion-dollar markets, 
            leveraging AI to capture value in repair diagnostics and youth sports development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {marketStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-card p-8 rounded-xl shadow-card hover:shadow-hover transition-smooth text-center"
            >
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-foreground mb-3">{stat.label}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Repair Market Opportunity */}
          <div className="bg-gradient-card p-8 md:p-10 rounded-2xl shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              The Right-to-Repair Revolution
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The global repair market represents a $2.32 trillion opportunity driven by 
              sustainability concerns, cost savings, and regulatory changes. Our AI-powered 
              diagnostic platform positions Intent Solutions at the forefront of this movement.
            </p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-foreground font-medium">Consumer Electronics</span>
                <span className="text-primary font-semibold">$847B</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-foreground font-medium">Automotive</span>
                <span className="text-primary font-semibold">$678B</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-foreground font-medium">Industrial Equipment</span>
                <span className="text-primary font-semibold">$521B</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-foreground font-medium">Other Sectors</span>
                <span className="text-primary font-semibold">$274B</span>
              </div>
            </div>
          </div>

          {/* Sports Tech Market */}
          <div className="bg-gradient-card p-8 md:p-10 rounded-2xl shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Youth Sports Technology
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The youth sports market continues to grow as parents invest in their children's 
              athletic development. Gamification and AI-driven platforms represent the next 
              evolution in sports training and engagement.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">45M</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Youth Athletes in US</div>
                  <div className="text-sm text-muted-foreground">Target demographic for HUSTLE</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">$19B</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Youth Sports Market</div>
                  <div className="text-sm text-muted-foreground">Annual spending on youth athletics</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">28%</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Technology Adoption</div>
                  <div className="text-sm text-muted-foreground">Growth in sports tech usage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Market;