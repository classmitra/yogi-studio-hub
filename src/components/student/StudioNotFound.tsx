
import React from 'react';

interface StudioNotFoundProps {
  subdomain: string;
}

const StudioNotFound = ({ subdomain }: StudioNotFoundProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yoga-50 to-ocean-50">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Studio Not Found</h1>
        <p className="text-gray-600 mb-4">
          The studio "{subdomain}" doesn't exist or has no classes available.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">Looking for a specific studio?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check the spelling of the studio name</li>
            <li>• Make sure the studio has published classes</li>
            <li>• Contact the instructor for the correct link</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudioNotFound;
