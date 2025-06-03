
import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';

interface StudioSocialProps {
  instructor: any;
}

const StudioSocial = ({ instructor }: StudioSocialProps) => {
  if (!instructor?.social_instagram && !instructor?.social_facebook && !instructor?.social_youtube) {
    return null;
  }

  return (
    <section className="py-32 px-8 section-off-white" data-section="off-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="fade-in-minimal mb-20">
          <h2 className="text-6xl md:text-7xl font-dongle font-normal text-black mb-8 leading-none">
            Join Our
            <br />
            <span className="text-4xl md:text-5xl opacity-60">Sacred Circle</span>
          </h2>
          <p className="text-lg text-black/70 font-light tracking-wide">
            Connect with our mindful community across the digital realm
          </p>
        </div>
        
        <div className="flex justify-center space-x-12 fade-in-minimal" style={{ animationDelay: '0.2s' }}>
          {instructor?.social_instagram && (
            <a 
              href={instructor.social_instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 minimal-hover"
            >
              <Instagram className="h-6 w-6" />
            </a>
          )}
          
          {instructor?.social_facebook && (
            <a 
              href={instructor.social_facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 minimal-hover"
            >
              <Facebook className="h-6 w-6" />
            </a>
          )}
          
          {instructor?.social_youtube && (
            <a 
              href={instructor.social_youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 border border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 minimal-hover"
            >
              <Youtube className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudioSocial;
