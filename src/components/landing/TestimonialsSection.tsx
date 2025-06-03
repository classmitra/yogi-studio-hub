
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Vinyasa Flow Teacher",
      content: "This platform became my digital sanctuary. The interface feels as peaceful as my physical studio, and I've grown from 10 local students to 300+ souls worldwide.",
      location: "California, USA",
    },
    {
      name: "Amara Okafor",
      role: "Restorative Yoga Guide",
      content: "The gentle design and intuitive flow mirror the essence of yoga itself. My students often say booking feels like a meditation in itself.",
      location: "Lagos, Nigeria",
    },
    {
      name: "Luna Patel",
      role: "Yin & Meditation Teacher",
      content: "Having my own sacred digital space gave me the confidence to share my practice globally. The customization options let my personality shine through.",
      location: "Mumbai, India",
    }
  ];

  return (
    <section id="testimonials" className="py-32 section-light-gray" data-section="light-gray">
      <div className="container mx-auto px-8">
        <div className="text-center mb-24 fade-in-minimal">
          <h2 className="text-7xl md:text-8xl font-dongle font-normal text-black mb-8 leading-none">
            Stories of
            <br />
            <span className="text-5xl md:text-6xl opacity-60">Transformation</span>
          </h2>
          <p className="text-lg text-black/70 font-light tracking-wide">
            Voices from our global community of mindful teachers
          </p>
        </div>
        
        <div className="horizontal-scroll gap-8 pb-8 fade-in-minimal">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="w-80 md:w-96 flex-shrink-0 border border-black/10 bg-white minimal-hover"
            >
              <CardContent className="p-12">
                <div className="flex items-center mb-8">
                  <div className="w-1 h-1 bg-black mr-2"></div>
                  <div className="w-1 h-1 bg-black mr-2"></div>
                  <div className="w-1 h-1 bg-black mr-2"></div>
                  <div className="w-1 h-1 bg-black mr-2"></div>
                  <div className="w-1 h-1 bg-black"></div>
                </div>
                <p className="text-black/80 mb-12 text-lg leading-relaxed font-light tracking-wide">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-dongle text-2xl font-normal text-black tracking-wide">{testimonial.name}</h4>
                  <p className="text-black/60 text-sm font-light tracking-wide">{testimonial.role}</p>
                  <p className="text-black/40 text-xs font-light tracking-widest uppercase">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
