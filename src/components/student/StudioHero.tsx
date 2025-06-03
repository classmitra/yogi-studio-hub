
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, Globe, Mail, ChevronDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import ParallaxContainer from '@/components/animations/ParallaxContainer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import FloatingElement from '@/components/animations/FloatingElement';

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
      {/* Enhanced Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxContainer speed={0.3} className="absolute top-32 right-32">
          <div className="w-1 h-48 bg-black/5" />
        </ParallaxContainer>
        
        <ParallaxContainer speed={0.5} direction="down" className="absolute bottom-40 left-32">
          <div className="w-1 h-32 bg-black/10" />
        </ParallaxContainer>
        
        <ParallaxContainer speed={0.2} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-px h-96 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        </ParallaxContainer>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement intensity={3} duration={6} className="absolute top-40 left-1/4">
          <div className="w-1 h-1 bg-black" />
        </FloatingElement>
        
        <FloatingElement intensity={5} duration={8} className="absolute bottom-40 right-1/3">
          <div className="w-1 h-1 bg-black" />
        </FloatingElement>
        
        <FloatingElement intensity={4} duration={10} className="absolute top-2/3 right-1/4">
          <div className="w-px h-24 bg-black/20" />
        </FloatingElement>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Profile Section with enhanced animations */}
          <ScrollReveal delay={0.2} direction="left" className="relative">
            <div className="relative">
              <motion.div 
                className="w-80 h-80 border border-black/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={instructor?.profile_image_url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face"}
                  alt={instructor?.studio_name || subdomain}
                  className="w-full h-full object-cover grayscale"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -right-4 w-12 h-12 border border-black bg-white flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ rotate: 10 }}
              >
                <Star className="h-6 w-6 text-black" />
              </motion.div>
              
              {/* Floating Elements */}
              <FloatingElement intensity={2} duration={4} className="absolute -top-2 -left-2">
                <div className="w-2 h-2 border border-black/30" />
              </FloatingElement>
              
              <FloatingElement intensity={1} duration={6} className="absolute -bottom-6 left-12">
                <div className="w-1 h-1 bg-black/40" />
              </FloatingElement>
            </div>
          </ScrollReveal>

          {/* Studio Info with staggered animations */}
          <div className="flex-1 text-center lg:text-left">
            <ScrollReveal delay={0.3} direction="up" className="mb-8">
              <Badge variant="secondary" className="bg-transparent border border-black text-black mb-6 font-light tracking-wide">
                <Minus className="h-3 w-3 mr-2" />
                Online Yoga Studio
                <Minus className="h-3 w-3 ml-2" />
              </Badge>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4} direction="up">
              <motion.h1 
                className="text-8xl lg:text-9xl font-dongle font-normal text-black mb-12 leading-none tracking-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {instructor?.studio_name || subdomain}
              </motion.h1>
            </ScrollReveal>
            
            {instructor?.bio && (
              <ScrollReveal delay={0.5} direction="up">
                <p className="text-xl text-black/70 leading-relaxed mb-12 max-w-2xl font-light tracking-wide">
                  {instructor.bio}
                </p>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.6} direction="up">
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-12">
                {[
                  { icon: MapPin, text: "Online Classes" },
                  { icon: Calendar, text: `${classes.length} Classes Available` },
                  { icon: Globe, text: `${subdomain}.yogastudio.app` }
                ].map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-sm px-6 py-3 bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                      <badge.icon className="h-4 w-4 mr-2" />
                      {badge.text}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.8} direction="up">
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    onClick={onScrollToClasses}
                    size="lg"
                    className="minimal-button h-14 px-10 text-lg font-light tracking-wide"
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    Browse Classes
                  </Button>
                </motion.div>
                
                {instructor?.contact_email && (
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border border-black bg-transparent text-black hover:bg-black hover:text-white h-14 px-10 text-lg font-light tracking-wide transition-all duration-500"
                      onClick={onScrollToContact}
                    >
                      <Mail className="h-5 w-5 mr-3" />
                      Get in Touch
                    </Button>
                  </motion.div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={onScrollToClasses}
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col items-center text-black/60 hover:text-black transition-colors duration-300">
            <motion.div 
              className="w-px h-12 bg-black/30 mb-4"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioHero;
