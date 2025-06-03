
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ExternalLink } from 'lucide-react';

interface StudioInfoCardProps {
  instructor: any;
}

const StudioInfoCard = ({ instructor }: StudioInfoCardProps) => {
  const studioUrl = `${window.location.origin}/studio/${instructor.subdomain}`;

  return (
    <Card className="border border-black/10 bg-white mb-16 slide-up-minimal" style={{ animationDelay: '0.1s' }}>
      <CardHeader>
        <CardTitle className="text-3xl font-dongle font-normal text-black flex items-center tracking-wide">
          <Heart className="h-6 w-6 mr-4 text-black/60" />
          Your Sacred Digital Sanctuary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="stagger-in" style={{ animationDelay: '0s' }}>
            <label className="text-sm font-light text-black/60 tracking-wide">Studio Name</label>
            <p className="text-black font-dongle text-2xl font-normal tracking-wide">{instructor.studio_name}</p>
          </div>
          <div className="stagger-in" style={{ animationDelay: '0.1s' }}>
            <label className="text-sm font-light text-black/60 tracking-wide">Sacred Domain</label>
            <p className="text-black font-light tracking-wide">{instructor.subdomain}</p>
          </div>
          <div className="stagger-in" style={{ animationDelay: '0.2s' }}>
            <label className="text-sm font-light text-black/60 tracking-wide">Sacred Portal</label>
            <a 
              href={studioUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:opacity-60 text-sm underline flex items-center transition-opacity duration-300 font-light tracking-wide"
            >
              Visit Sacred Space
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          <div className="stagger-in" style={{ animationDelay: '0.3s' }}>
            <label className="text-sm font-light text-black/60 tracking-wide">Sacred Colors</label>
            <div className="flex items-center space-x-3">
              <div 
                className="w-5 h-5 border border-black/20"
                style={{ backgroundColor: instructor.brand_color }}
              ></div>
              <span className="text-black text-sm font-light tracking-wide">{instructor.brand_color}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudioInfoCard;
