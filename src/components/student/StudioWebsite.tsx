
import React from 'react';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import StudioNavigation from './StudioNavigation';
import StudioHero from './StudioHero';
import StudioAbout from './StudioAbout';
import StudioClasses from './StudioClasses';
import StudioContact from './StudioContact';
import StudioSocial from './StudioSocial';
import StudioFooter from './StudioFooter';

interface StudioWebsiteProps {
  instructor: any;
  subdomain: string;
  classes: any[];
  onBookClass: (classItem: any) => void;
}

const StudioWebsite = ({ instructor, subdomain, classes, onBookClass }: StudioWebsiteProps) => {
  useScrollAnimations();

  const scrollToClasses = () => {
    document.getElementById('classes-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Scroll Progress */}
      <div className="scroll-progress-minimal"></div>

      {/* Sticky Navigation Bar */}
      <StudioNavigation 
        onScrollToAbout={scrollToAbout}
        onScrollToClasses={scrollToClasses}
        onScrollToContact={scrollToContact}
        instructor={instructor}
      />

      {/* Hero Section */}
      <StudioHero 
        instructor={instructor}
        subdomain={subdomain}
        classes={classes}
        onScrollToClasses={scrollToClasses}
        onScrollToContact={scrollToContact}
      />

      {/* About Section */}
      <StudioAbout 
        instructor={instructor}
        subdomain={subdomain}
      />

      {/* Classes Section */}
      <StudioClasses 
        classes={classes}
        instructor={instructor}
        onBookClass={onBookClass}
        onScrollToContact={scrollToContact}
      />

      {/* Contact Section */}
      <StudioContact instructor={instructor} />

      {/* Social Media Section */}
      <StudioSocial instructor={instructor} />

      {/* Footer */}
      <StudioFooter 
        instructor={instructor}
        subdomain={subdomain}
      />
    </div>
  );
};

export default StudioWebsite;
