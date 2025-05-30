
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useInstructor, useSubdomainCheck } from '@/hooks/useInstructor';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Check, ArrowRight, ArrowLeft, Loader2, Globe, User, Palette, Settings } from 'lucide-react';

const STEPS = [
  { id: 'profile', title: 'Personal Profile', icon: User },
  { id: 'studio', title: 'Studio Setup', icon: Globe },
  { id: 'branding', title: 'Branding', icon: Palette },
  { id: 'settings', title: 'Settings', icon: Settings },
];

const StudioSetupWizard = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Profile data
    bio: '',
    contact_email: '',
    contact_phone: '',
    // Studio data
    studio_name: '',
    subdomain: '',
    website_url: '',
    // Branding data
    brand_color: '#10b981',
    // Settings data
    timezone: 'UTC',
    social_instagram: '',
    social_facebook: '',
    social_youtube: '',
  });

  const { user } = useAuth();
  const { createInstructor, isCreating } = useInstructor();
  const { checkSubdomain, isChecking, isAvailable } = useSubdomainCheck();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'subdomain' && value.length >= 3) {
      checkSubdomain(value.toLowerCase());
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (!user) return;

    const cleanSubdomain = formData.subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    
    createInstructor({
      user_id: user.id,
      studio_name: formData.studio_name,
      subdomain: cleanSubdomain,
      bio: formData.bio || null,
      contact_email: formData.contact_email || null,
      contact_phone: formData.contact_phone || null,
      website_url: formData.website_url || null,
      social_instagram: formData.social_instagram || null,
      social_facebook: formData.social_facebook || null,
      social_youtube: formData.social_youtube || null,
      brand_color: formData.brand_color,
      timezone: formData.timezone,
    });

    toast({
      title: "Studio Created!",
      description: "Your yoga studio has been set up successfully.",
    });

    onComplete();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Profile
        return formData.bio.length >= 10;
      case 1: // Studio
        return formData.studio_name.length >= 3 && 
               formData.subdomain.length >= 3 && 
               isAvailable === true;
      case 2: // Branding
        return true; // Optional fields
      case 3: // Settings
        return true; // Optional fields
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="bio">Tell us about yourself *</Label>
              <Textarea
                id="bio"
                placeholder="Share your yoga journey, certifications, and teaching style..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="mt-1"
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 characters (minimum 10)
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contact_phone">Phone Number</Label>
                <Input
                  id="contact_phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="studio_name">Studio Name *</Label>
              <Input
                id="studio_name"
                placeholder="Peaceful Flow Yoga Studio"
                value={formData.studio_name}
                onChange={(e) => handleInputChange('studio_name', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="subdomain">Choose Your Subdomain *</Label>
              <div className="flex items-center mt-1">
                <Input
                  id="subdomain"
                  placeholder="peaceful-flow"
                  value={formData.subdomain}
                  onChange={(e) => handleInputChange('subdomain', e.target.value)}
                  className="rounded-r-none"
                />
                <div className="bg-gray-100 px-3 py-2 border border-l-0 rounded-r-md text-sm text-gray-600">
                  .yogastudio.app
                </div>
              </div>
              {formData.subdomain.length >= 3 && (
                <div className="mt-2">
                  {isChecking ? (
                    <div className="flex items-center text-sm text-gray-500">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Checking availability...
                    </div>
                  ) : (
                    <Badge variant={isAvailable ? "default" : "destructive"}>
                      {isAvailable ? "Available!" : "Already taken"}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="website_url">Website URL (Optional)</Label>
              <Input
                id="website_url"
                placeholder="https://yourwebsite.com"
                value={formData.website_url}
                onChange={(e) => handleInputChange('website_url', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="brand_color">Brand Color</Label>
              <div className="flex items-center space-x-3 mt-1">
                <Input
                  id="brand_color"
                  type="color"
                  value={formData.brand_color}
                  onChange={(e) => handleInputChange('brand_color', e.target.value)}
                  className="w-20 h-10"
                />
                <Input
                  value={formData.brand_color}
                  onChange={(e) => handleInputChange('brand_color', e.target.value)}
                  placeholder="#10b981"
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label>Preview</Label>
              <div 
                className="mt-2 p-4 rounded-lg text-white"
                style={{ backgroundColor: formData.brand_color }}
              >
                <h3 className="font-semibold">{formData.studio_name || 'Your Studio Name'}</h3>
                <p className="text-sm opacity-90">This is how your brand color will look</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Social Media Links (Optional)</Label>
              <div className="space-y-3 mt-2">
                <Input
                  placeholder="Instagram URL"
                  value={formData.social_instagram}
                  onChange={(e) => handleInputChange('social_instagram', e.target.value)}
                />
                <Input
                  placeholder="Facebook URL"
                  value={formData.social_facebook}
                  onChange={(e) => handleInputChange('social_facebook', e.target.value)}
                />
                <Input
                  placeholder="YouTube URL"
                  value={formData.social_youtube}
                  onChange={(e) => handleInputChange('social_youtube', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-50 to-ocean-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Set Up Your Yoga Studio</h1>
          <p className="text-gray-600 mt-2">Let's create your online presence in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors
                  ${isCompleted ? 'bg-yoga-600 border-yoga-600 text-white' : 
                    isActive ? 'border-yoga-600 text-yoga-600' : 
                    'border-gray-300 text-gray-400'}
                `}>
                  {isCompleted ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                </div>
                <span className={`text-sm mt-2 ${isActive ? 'text-yoga-600 font-medium' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>{STEPS[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
            
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep === STEPS.length - 1 ? (
                <Button 
                  onClick={handleSubmit}
                  disabled={!isStepValid() || isCreating}
                  className="bg-yoga-600 hover:bg-yoga-700"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Studio...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <Check className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="bg-yoga-600 hover:bg-yoga-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudioSetupWizard;
