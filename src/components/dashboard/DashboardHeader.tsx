
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Eye, ExternalLink, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  instructor: any;
}

const DashboardHeader = ({ instructor }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const studioUrl = `${window.location.origin}/studio/${instructor.subdomain}`;

  return (
    <div className="flex items-center justify-between mb-16 fade-in-minimal">
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-8 h-8 border border-black flex items-center justify-center">
            <div className="w-2 h-2 bg-black"></div>
          </div>
          <h1 className="text-6xl font-dongle font-normal text-black leading-none">
            Welcome back, sacred teacher
          </h1>
        </div>
        <p className="text-black/70 text-lg leading-relaxed font-light tracking-wide">Here's the beautiful energy flowing through your studio today</p>
        {instructor.subdomain && (
          <div className="mt-6 flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-black/20 text-black bg-transparent font-light tracking-wide">
                {instructor.studio_name}
              </Badge>
              <span className="text-sm text-black/40">•</span>
              <span className="text-sm text-black/70 font-light tracking-wide">{instructor.subdomain}.yogastudio.app</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-6">
        <Button 
          variant="outline" 
          onClick={() => window.open(studioUrl, '_blank')}
          className="flex items-center space-x-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500 font-light tracking-wide"
        >
          <Eye className="h-4 w-4" />
          <span>View Sacred Space</span>
          <ExternalLink className="h-3 w-3" />
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate('/studio-setup')}
          className="flex items-center space-x-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500 font-light tracking-wide"
        >
          <Settings className="h-4 w-4" />
          <span>Sacred Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
