
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudioFooterProps {
  instructor: any;
  subdomain: string;
}

const StudioFooter = ({ instructor, subdomain }: StudioFooterProps) => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white py-24 px-8 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-1 h-32 bg-white/5 parallax-slow"></div>
        <div className="absolute bottom-20 right-20 w-1 h-24 bg-white/10 parallax-medium"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="fade-in-minimal">
          <h3 className="text-5xl md:text-6xl font-dongle font-normal mb-8 leading-none">{instructor?.studio_name || subdomain}</h3>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Where sacred practice meets mindful technology, creating ripples of peace across the world.
          </p>
          
          <div className="flex justify-center space-x-8 mb-12">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="border border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500 font-light tracking-wide"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-500 font-light tracking-wide"
            >
              <Home className="h-4 w-4 mr-2" />
              Sacred Home
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-1 h-1 bg-white/40"></div>
            <div className="w-1 h-1 bg-white/40"></div>
            <div className="w-1 h-1 bg-white/40"></div>
          </div>
          
          <p className="text-white/50 text-xs tracking-widest uppercase">
            Made with intention • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StudioFooter;
