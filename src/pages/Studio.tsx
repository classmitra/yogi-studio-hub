
import React from 'react';
import { useParams } from 'react-router-dom';
import PublicStudioView from '@/components/student/PublicStudioView';

const Studio = () => {
  const { subdomain } = useParams<{ subdomain: string }>();

  console.log('Studio page - subdomain from params:', subdomain);

  if (!subdomain) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yoga-50 to-ocean-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Studio URL</h1>
          <p className="text-gray-600 mb-4">The studio URL appears to be missing or invalid.</p>
          <p className="text-sm text-gray-500">
            Studio URLs should be in the format: <br />
            <code className="bg-gray-100 px-2 py-1 rounded">yoursite.com/studio/studio-name</code>
          </p>
        </div>
      </div>
    );
  }

  return <PublicStudioView subdomain={subdomain} />;
};

export default Studio;
