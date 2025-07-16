import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Code, 
  Target, 
  Users, 
  Clock, 
  Award,
  ArrowRight,
  CheckCircle,
  Brain
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Psychometric Analysis",
      description: "Evaluate personality fit and learning motivation using validated psychological models"
    },
    {
      icon: Code,
      title: "Technical Assessment",
      description: "Test logical reasoning, programming fundamentals, and Flutter-specific concepts"
    },
    {
      icon: Target,
      title: "WISCAR Framework",
      description: "Multi-dimensional evaluation across Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world fit"
    },
    {
      icon: Award,
      title: "Career Guidance",
      description: "Personalized recommendations for Flutter-related career paths and learning roadmaps"
    }
  ];

  const stats = [
    { icon: Clock, label: "Assessment Time", value: "25-30 mins" },
    { icon: Target, label: "Accuracy Rate", value: "90%+" },
    { icon: Users, label: "Career Paths", value: "6+ roles" },
    { icon: CheckCircle, label: "Success Rate", value: "85%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                🚀 Flutter Readiness Assessment
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-card-foreground text-shadow">
                Should I Learn 
                <span className="gradient-primary bg-clip-text text-transparent"> Flutter</span>?
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover if Flutter development aligns with your skills, interests, and career goals through our comprehensive assessment framework.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                onClick={() => navigate('/assessment')}
                className="animate-pulse-glow"
              >
                Start Assessment
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="text-lg py-4 px-8">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center space-y-2">
                  <stat.icon className="w-8 h-8 mx-auto text-primary" />
                  <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is Flutter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="assessment-card">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-card-foreground">
                    💡 What is Flutter?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Flutter is Google's open-source UI toolkit for building natively compiled applications 
                    for mobile, web, and desktop from a single codebase using the Dart programming language.
                  </p>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-card-foreground">Key Benefits:</h3>
                    <ul className="space-y-2">
                      {[
                        "Single codebase for multiple platforms",
                        "Fast development and hot reload",
                        "Native performance",
                        "Rich UI components and animations"
                      ].map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="gradient-primary rounded-lg p-8 text-center">
                    <Smartphone className="w-24 h-24 mx-auto text-primary-foreground mb-4" />
                    <h3 className="text-xl font-bold text-primary-foreground mb-2">
                      Cross-Platform Development
                    </h3>
                    <p className="text-primary-foreground/90">
                      Build for iOS, Android, Web, and Desktop with one codebase
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-card-foreground mb-4">
                Comprehensive Assessment Framework
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our multi-dimensional evaluation covers psychological fit, technical aptitude, 
                and career alignment to give you personalized guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={feature.title} className="assessment-card group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg gradient-primary">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-card-foreground mb-8">
              🧑‍💻 Flutter Career Opportunities
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Flutter Developer",
                "Mobile App Developer", 
                "Cross-platform Engineer",
                "Frontend Developer",
                "UI/UX Developer",
                "App Architect"
              ].map((role) => (
                <Card key={role} className="assessment-card text-center group">
                  <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {role}
                  </h3>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-card-foreground">
              Ready to Discover Your Flutter Potential?
            </h2>
            <p className="text-xl text-muted-foreground">
              Take our comprehensive assessment and get personalized guidance for your development journey.
            </p>
            
            <Button 
              variant="hero" 
              onClick={() => navigate('/assessment')}
              className="animate-pulse-glow"
            >
              Start Your Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
