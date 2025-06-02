
import React from 'react';

interface LoadingStudioProps {
  subdomain: string;
}

const LoadingStudio = ({ subdomain }: LoadingStudioProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yoga-50 to-ocean-50">
      <div className="text-center">
        <div className="w-8 h-8 bg-gradient-to-br from-yoga-500 to-ocean-500 rounded-lg flex items-center justify-center mx-auto mb-4">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600">Loading studio: {subdomain}...</p>
      </div>
    </div>
  );
};

export default LoadingStudio;
