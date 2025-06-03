
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudioNavigationProps {
  onScrollToAbout: () => void;
  onScrollToClasses: () => void;
  onScrollToContact: () => void;
  instructor: any;
}

const StudioNavigation = ({ onScrollToAbout, onScrollToClasses, onScrollToContact, instructor }: StudioNavigationProps) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky-nav-minimal">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 font-light"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 font-light"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
          
          <div className="flex items-center space-x-12">
            <button 
              onClick={onScrollToAbout}
              className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide font-light"
            >
              About
            </button>
            <button 
              onClick={onScrollToClasses}
              className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide font-light"
            >
              Classes
            </button>
            {(instructor?.contact_email || instructor?.contact_phone) && (
              <button 
                onClick={onScrollToContact}
                className="text-black hover:opacity-60 transition-opacity duration-300 text-sm tracking-wide font-light"
              >
                Contact
              </button>
            )}
            <Button 
              onClick={onScrollToClasses}
              size="sm"
              className="minimal-button h-10 px-6 font-light tracking-wide"
            >
              Book Class
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudioNavigation;
