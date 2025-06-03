
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, Globe, Mail, ChevronDown, Minus } from 'lucide-react';

interface StudioHeroProps {
  instructor: any;
  subdomain: string;
  classes: any[];
  onScrollToClasses: () => void;
  onScrollToContact: () => void;
}

const StudioHero = ({ instructor, subdomain, classes, onScrollToClasses, onScrollToContact }: StudioHeroProps) => {
  return (
    <section className="relative py-32 px-8 min-h-screen flex items-center section-white" data-section="white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 right-32 w-1 h-48 bg-black/5 parallax-slow"></div>
        <div className="absolute bottom-40 left-32 w-1 h-32 bg-black/10 parallax-medium"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-black/5 to-transparent parallax-fast"></div>
      </div>

      {/* Minimal geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-1 h-1 bg-black breathe-minimal"></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-black gentle-fade"></div>
        <div className="absolute top-2/3 right-1/4 w-px h-24 bg-black/20 float-minimal"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Profile Section */}
          <div className="relative fade-in-minimal">
            <div className="relative">
              <div className="w-80 h-80 border border-black/20 overflow-hidden">
                <img
                  src={instructor?.profile_image_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"}
                  alt={instructor?.studio_name || subdomain}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border border-black bg-white flex items-center justify-center breathe-minimal">
                <Star className="h-6 w-6 text-black" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -left-2 w-2 h-2 border border-black/30 float-minimal"></div>
              <div className="absolute -bottom-6 left-12 w-1 h-1 bg-black/40 gentle-fade"></div>
            </div>
          </div>

          {/* Studio Info */}
          <div className="flex-1 text-center lg:text-left slide-up-minimal">
            <div className="mb-8">
              <Badge variant="secondary" className="bg-transparent border border-black text-black mb-6 font-light tracking-wide">
                <Minus className="h-3 w-3 mr-2" />
                Sacred Practice Space
                <Minus className="h-3 w-3 ml-2" />
              </Badge>
            </div>
            
            <h1 className="text-8xl lg:text-9xl font-dongle font-normal text-black mb-12 leading-none tracking-tight">
              {instructor?.studio_name || subdomain}
            </h1>
            
            {instructor?.bio && (
              <p className="text-xl text-black/70 leading-relaxed mb-12 max-w-2xl font-light tracking-wide">
                {instructor.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-12">
              <Badge variant="secondary" className="text-sm px-6 py-3 bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                <MapPin className="h-4 w-4 mr-2" />
                Online Space
              </Badge>
              <Badge variant="secondary" className="text-sm px-6 py-3 bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                <Calendar className="h-4 w-4 mr-2" />
                {classes.length} Experiences
              </Badge>
              <Badge variant="secondary" className="text-sm px-6 py-3 bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                <Globe className="h-4 w-4 mr-2" />
                {subdomain}.yogastudio.app
              </Badge>
            </div>

            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              <Button 
                onClick={onScrollToClasses}
                size="lg"
                className="minimal-button h-14 px-10 text-lg font-light tracking-wide"
              >
                <Calendar className="h-5 w-5 mr-3" />
                Explore Experiences
              </Button>
              
              {instructor?.contact_email && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border border-black bg-transparent text-black hover:bg-black hover:text-white h-14 px-10 text-lg font-light tracking-wide transition-all duration-500"
                  onClick={onScrollToContact}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer fade-in-minimal" style={{ animationDelay: '0.8s' }} onClick={onScrollToClasses}>
          <div className="flex flex-col items-center text-black/60 hover:text-black transition-colors duration-300">
            <div className="w-px h-12 bg-black/30 mb-4"></div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioHero;
