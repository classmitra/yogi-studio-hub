
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  Video, 
  Globe, 
  Star
} from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimations';

const FeaturesSection = () => {
  const staggerRef = useStaggeredAnimation(150);

  const features = [
    {
      icon: Globe,
      title: "Your Online Studio",
      description: "Get your own website at yourname.yogastudio.app",
      delay: "0s"
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Simple booking system with automatic reminders",
      delay: "0.1s"
    },
    {
      icon: CreditCard,
      title: "Simple Payments",
      description: "Accept payments securely or offer classes for free",
      delay: "0.2s"
    },
    {
      icon: Video,
      title: "Live Classes",
      description: "High-quality video for real connection with students",
      delay: "0.3s"
    },
    {
      icon: Users,
      title: "Student Management",
      description: "Keep track of your community with simple tools",
      delay: "0.4s"
    },
    {
      icon: Star,
      title: "Grow Your Practice",
      description: "Marketing tools that help students find you",
      delay: "0.5s"
    }
  ];

  return (
    <section id="features-section" className="py-32 section-off-white" data-section="off-white">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24 fade-in-minimal">
          <h2 className="text-7xl md:text-8xl font-dongle font-normal text-black mb-8 leading-none">
            Everything
            <br />
            <span className="text-5xl md:text-6xl opacity-60">You Need</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Simple tools to teach yoga online. No complicated setup, no learning curve.
          </p>
        </div>
        
        <div ref={staggerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="stagger-in group border border-black/10 bg-white hover:border-black/30 transition-all duration-500 minimal-hover"
              style={{ animationDelay: feature.delay }}
            >
              <CardHeader className="text-center pb-8">
                <div className="relative mx-auto mb-8">
                  <div className="w-16 h-16 border border-black/20 flex items-center justify-center mx-auto group-hover:border-black/60 transition-all duration-500">
                    <feature.icon className="h-6 w-6 text-black/60" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-dongle font-normal text-black tracking-wide">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black/70 text-center leading-relaxed font-light text-sm tracking-wide">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
