
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ParallaxContainer from '@/components/animations/ParallaxContainer';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Vinyasa Flow Teacher",
      content: "This platform became my digital studio. The interface feels as peaceful as my physical space, and I've grown from 10 local students to 300+ worldwide.",
      location: "California, USA",
    },
    {
      name: "Amara Okafor",
      role: "Restorative Yoga Guide",
      content: "The clean design and intuitive flow mirror the essence of yoga itself. My students often say booking feels simple and calming.",
      location: "Lagos, Nigeria",
    },
    {
      name: "Luna Patel",
      role: "Yin & Meditation Teacher",
      content: "Having my own digital space gave me confidence to share my practice globally. The customization options let my personality shine through.",
      location: "Mumbai, India",
    }
  ];

  return (
    <section id="testimonials" className="py-32 section-light-gray relative" data-section="light-gray">
      {/* Background parallax elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxContainer speed={0.3} className="absolute top-20 left-1/4">
          <div className="w-px h-32 bg-black/5" />
        </ParallaxContainer>
        <ParallaxContainer speed={0.4} direction="down" className="absolute bottom-20 right-1/3">
          <div className="w-1 h-24 bg-black/5" />
        </ParallaxContainer>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <ScrollReveal delay={0.1} className="text-center mb-24">
          <h2 className="text-7xl md:text-8xl font-dongle font-normal text-black mb-8 leading-none">
            Stories of
            <br />
            <span className="text-5xl md:text-6xl opacity-60">Growth</span>
          </h2>
          <p className="text-lg text-black/70 font-light tracking-wide">
            Voices from our global community of teachers
          </p>
        </ScrollReveal>
        
        <div className="horizontal-scroll gap-8 pb-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: [0.25, 0.25, 0.25, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="w-80 md:w-96 flex-shrink-0 border border-black/10 bg-white">
                <CardContent className="p-12">
                  <motion.div 
                    className="flex items-center mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-black mr-2"></div>
                    ))}
                  </motion.div>
                  <motion.p 
                    className="text-black/80 mb-12 text-lg leading-relaxed font-light tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                  >
                    "{testimonial.content}"
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <h4 className="font-dongle text-2xl font-normal text-black tracking-wide">{testimonial.name}</h4>
                    <p className="text-black/60 text-sm font-light tracking-wide">{testimonial.role}</p>
                    <p className="text-black/40 text-xs font-light tracking-widest uppercase">{testimonial.location}</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
