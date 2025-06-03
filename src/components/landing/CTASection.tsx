
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-1 h-32 bg-white/10 parallax-slow"></div>
        <div className="absolute bottom-20 right-20 w-1 h-24 bg-white/5 parallax-medium"></div>
      </div>
      
      <div className="container mx-auto px-8 text-center relative z-10">
        <div className="fade-in-minimal">
          <h2 className="text-7xl md:text-8xl font-dongle font-normal mb-12 leading-none">
            Ready to
            <br />
            <span className="text-5xl md:text-6xl opacity-60">Start Teaching?</span>
          </h2>
          <p className="text-xl mb-16 opacity-80 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Join thousands of teachers who have made yoga accessible to students worldwide.
          </p>
        </div>
        
        <div className="fade-in-minimal flex flex-col sm:flex-row gap-8 justify-center items-center" style={{ animationDelay: '0.2s' }}>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-white/90 h-14 px-12 text-lg font-light tracking-wide transition-all duration-500"
          >
            Get Started Free
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border border-white bg-transparent text-white hover:bg-white hover:text-black h-14 px-12 text-lg font-light tracking-wide transition-all duration-500"
          >
            <Calendar className="mr-3 h-5 w-5" />
            Book a Demo
          </Button>
        </div>
        
        <div className="fade-in-minimal mt-16" style={{ animationDelay: '0.4s' }}>
          <p className="text-xs opacity-60 tracking-widest uppercase">
            Always Free — No Setup Fees — Start Teaching Today
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
