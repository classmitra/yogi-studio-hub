
import React from 'react';
import { Button } from '@/components/ui/button';

const StickyNavigation = () => {
  return (
    <nav className="sticky-nav-minimal">
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-black"></div>
            <span className="font-dongle text-2xl font-normal text-black tracking-wide">YogaStudio</span>
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <a href="#features" className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide">Features</a>
            <a href="#testimonials" className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide">Stories</a>
            <a href="#pricing" className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide">Pricing</a>
            <Button className="minimal-button h-10 px-6 text-sm font-light tracking-wide">
              Start Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StickyNavigation;
