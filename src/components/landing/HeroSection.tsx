
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play,
  ChevronDown,
  ArrowRight,
  Minus
} from 'lucide-react';

interface HeroSectionProps {
  onScrollToFeatures: () => void;
}

const HeroSection = ({ onScrollToFeatures }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center section-white" data-section="white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-1 h-32 bg-black opacity-10 parallax-slow"></div>
        <div className="absolute bottom-40 left-20 w-1 h-24 bg-black opacity-5 parallax-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-black/5 to-transparent parallax-fast"></div>
      </div>

      {/* Minimal geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 w-1 h-1 bg-black breathe-minimal"></div>
        <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-black gentle-fade"></div>
        <div className="absolute top-2/3 right-1/4 w-px h-16 bg-black/20 float-minimal"></div>
      </div>

      <div className="container mx-auto px-8 py-32 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="fade-in-minimal">
            <Badge variant="secondary" className="mb-12 px-8 py-3 text-sm font-light bg-transparent border border-black text-black tracking-wide">
              <Minus className="h-3 w-3 mr-3" />
              Free to start — Trusted by 10,000+ teachers
              <Minus className="h-3 w-3 ml-3" />
            </Badge>
          </div>
          
          <div className="slide-up-minimal" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-dongle font-normal text-black mb-16 leading-none tracking-tight">
              Online Yoga
              <br />
              <span className="text-6xl md:text-7xl lg:text-8xl opacity-60">Made Simple</span>
            </h1>
          </div>
          
          <div className="slide-up-minimal" style={{ animationDelay: '0.4s' }}>
            <p className="text-xl md:text-2xl text-black/70 mb-16 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
              Book live and on-demand classes from real teachers. Anytime, anywhere.
            </p>
          </div>
          
          <div className="slide-up-minimal flex flex-col sm:flex-row gap-8 justify-center items-center" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="minimal-button h-14 px-12 text-lg font-light tracking-wide"
            >
              Find a Teacher
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border border-black bg-transparent text-black hover:bg-black hover:text-white h-14 px-12 text-lg font-light tracking-wide transition-all duration-500"
            >
              <Play className="mr-3 h-5 w-5" />
              How It Works
            </Button>
          </div>
          
          <div className="slide-up-minimal mt-16" style={{ animationDelay: '0.8s' }}>
            <p className="text-xs text-black/50 mb-16 tracking-widest uppercase">
              Start in 2 minutes — No commitments
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="slide-up-minimal absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer" style={{ animationDelay: '1s' }} onClick={onScrollToFeatures}>
            <div className="flex flex-col items-center text-black/60 hover:text-black transition-colors duration-300">
              <div className="w-px h-8 bg-black/30 mb-4"></div>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
