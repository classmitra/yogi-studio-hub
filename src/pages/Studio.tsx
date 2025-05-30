
import React from 'react';
import { useParams } from 'react-router-dom';
import PublicStudioView from '@/components/student/PublicStudioView';

const Studio = () => {
  const { subdomain } = useParams<{ subdomain: string }>();

  if (!subdomain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Studio URL</h1>
          <p className="text-gray-600">Please check the studio URL and try again.</p>
        </div>
      </div>
    );
  }

  return <PublicStudioView subdomain={subdomain} />;
};

export default Studio;
