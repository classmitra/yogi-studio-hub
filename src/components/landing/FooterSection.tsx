
import React from 'react';

const FooterSection = () => {
  return (
    <footer className="bg-white text-black py-24 border-t border-black/10">
      <div className="container mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-16">
          <div className="fade-in-minimal">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-2 h-2 bg-black"></div>
              <h3 className="text-2xl font-dongle font-normal text-black tracking-wide">YogaStudio</h3>
            </div>
            <p className="text-black/70 mb-8 leading-relaxed font-light text-sm tracking-wide">
              Simple tools for yoga teachers to share their practice online. Real connection, modern technology.
            </p>
          </div>
          
          <div className="fade-in-minimal" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-dongle text-xl font-normal mb-8 text-black tracking-wide">Platform</h4>
            <ul className="space-y-4 text-black/70 text-sm font-light tracking-wide">
              <li><a href="#" className="hover:text-black transition-colors duration-300">Features</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Getting Started</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">How It Works</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Teacher Stories</a></li>
            </ul>
          </div>
          
          <div className="fade-in-minimal" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-dongle text-xl font-normal mb-8 text-black tracking-wide">Support</h4>
            <ul className="space-y-4 text-black/70 text-sm font-light tracking-wide">
              <li><a href="#" className="hover:text-black transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Quick Start Guide</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
          
          <div className="fade-in-minimal" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-dongle text-xl font-normal mb-8 text-black tracking-wide">Legal</h4>
            <ul className="space-y-4 text-black/70 text-sm font-light tracking-wide">
              <li><a href="#" className="hover:text-black transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Accessibility</a></li>
              <li><a href="#" className="hover:text-black transition-colors duration-300">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-black/10 mt-16 pt-12 text-center text-black/60 fade-in-minimal" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-1 h-1 bg-black/20"></div>
            <div className="w-1 h-1 bg-black/20"></div>
            <div className="w-1 h-1 bg-black/20"></div>
          </div>
          <p className="text-xs tracking-widest uppercase">&copy; 2025 YogaStudio Platform. Made for teachers, by teachers.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
