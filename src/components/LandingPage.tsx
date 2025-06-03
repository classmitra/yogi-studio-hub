
import React from 'react';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import StickyNavigation from './landing/StickyNavigation';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import TestimonialsSection from './landing/TestimonialsSection';
import CTASection from './landing/CTASection';
import FooterSection from './landing/FooterSection';

const LandingPage = () => {
  useScrollAnimations();

  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Scroll Progress */}
      <div className="scroll-progress-minimal"></div>

      {/* Sticky Navigation */}
      <StickyNavigation />

      {/* Hero Section */}
      <HeroSection onScrollToFeatures={scrollToFeatures} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;
