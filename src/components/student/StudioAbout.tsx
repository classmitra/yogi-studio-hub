
import React from 'react';
import { Users, Clock, Star, Globe } from 'lucide-react';

interface StudioAboutProps {
  instructor: any;
  subdomain: string;
}

const StudioAbout = ({ instructor, subdomain }: StudioAboutProps) => {
  return (
    <section id="about-section" className="py-32 px-8 section-off-white" data-section="off-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="fade-in-minimal">
            <h2 className="text-6xl md:text-7xl font-dongle font-normal text-black mb-12 leading-none">
              About
              <br />
              <span className="text-4xl md:text-5xl opacity-60">Our Practice</span>
            </h2>
            <p className="text-lg text-black/70 leading-relaxed mb-8 font-light tracking-wide">
              Welcome to {instructor?.studio_name || subdomain}. This is a place for students of all levels 
              to explore yoga through clear guidance and genuine connection.
            </p>
            <p className="text-lg text-black/70 leading-relaxed mb-12 font-light tracking-wide">
              {instructor?.bio || "Join our community and discover how yoga can help you move better, breathe deeper, and feel more balanced in your daily life."}
            </p>
            
            {/* Principles */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: Users, text: "All Levels Welcome" },
                { icon: Clock, text: "Flexible Scheduling" },
                { icon: Star, text: "Clear Instruction" },
                { icon: Globe, text: "Online Community" }
              ].map((principle, index) => (
                <div key={index} className="flex items-center space-x-4 stagger-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-8 h-8 border border-black/20 flex items-center justify-center">
                    <principle.icon className="h-4 w-4 text-black/60" />
                  </div>
                  <span className="text-black/80 font-light text-sm tracking-wide">{principle.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative slide-up-minimal">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="Yoga practice"
                className="w-full h-96 object-cover grayscale border border-black/10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-3 -right-3 w-3 h-3 border border-black/30 float-minimal"></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-black/40 gentle-fade"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioAbout;
