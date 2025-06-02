
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useInstructor } from '@/hooks/useInstructor';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Eye, Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ViewStudio = () => {
  const { user, loading: authLoading } = useAuth();
  const { instructor, isLoading: instructorLoading } = useInstructor();
  const { toast } = useToast();

  if (authLoading || instructorLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading studio...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!instructor) {
    return <Navigate to="/studio-setup" replace />;
  }

  const studioUrl = `${window.location.origin}/studio/${instructor.subdomain}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(studioUrl);
    toast({
      title: "URL Copied",
      description: "Your studio URL has been copied to clipboard.",
    });
  };

  const handleViewStudio = () => {
    window.open(studioUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Your Studio</h1>
            <p className="text-gray-600 mt-1">Preview and manage your public studio page</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleCopyUrl}
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy URL
            </Button>
            <Button 
              onClick={handleViewStudio}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Live Studio
            </Button>
          </div>
        </div>

        {/* Studio Preview Card */}
        <Card className="border-2 border-black shadow-sm mb-6">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-black">Studio Preview</CardTitle>
              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {instructor.profile_image_url && (
                  <img
                    src={instructor.profile_image_url}
                    alt={instructor.studio_name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-black">{instructor.studio_name}</h2>
                  <p className="text-gray-600">{instructor.bio}</p>
                  <div className="flex items-center mt-2">
                    <ExternalLink className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-sm text-gray-500">{studioUrl}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Studio Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">Studio Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Studio Name</label>
                <p className="text-black">{instructor.studio_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Subdomain</label>
                <p className="text-black">{instructor.subdomain}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Brand Color</label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: instructor.brand_color }}
                  ></div>
                  <p className="text-black">{instructor.brand_color}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-black">{instructor.contact_email || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-black">{instructor.contact_phone || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Website</label>
                <p className="text-black">{instructor.website_url || 'Not set'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Share Options */}
        <Card className="border border-gray-200 shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-black flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Share Your Studio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">Studio URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={studioUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-black"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopyUrl}
                    className="border-gray-300 text-black hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Share this URL with your students so they can view your classes and book sessions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewStudio;
