
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Flower, ArrowRight, Check } from 'lucide-react';

interface StudioSetupWizardProps {
  onComplete: () => void;
}

const StudioSetupWizard = ({ onComplete }: StudioSetupWizardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    studio_name: '',
    subdomain: '',
    bio: '',
    contact_email: user?.email || '',
    brand_color: '#8B5CF6',
    profile_image_url: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Auto-generate subdomain from studio name
      ...(field === 'studio_name' && { 
        subdomain: value.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20)
      })
    }));
  };

  const handleSubmit = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a studio.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('instructors')
        .insert({
          ...formData,
          user_id: user.id,
        });

      if (error) {
        if (error.code === '23505' && error.message.includes('subdomain')) {
          toast({
            title: "Subdomain Taken",
            description: "This subdomain is already taken. Please choose another.",
            variant: "destructive",
          });
          setStep(1);
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Studio Created!",
          description: "Your yoga studio has been set up successfully.",
        });
        onComplete();
      }
    } catch (error: any) {
      toast({
        title: "Setup Failed",
        description: error.message || "Failed to create studio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isStep1Valid = formData.studio_name && formData.subdomain;
  const isStep2Valid = formData.bio;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-50 to-ocean-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yoga-500 to-ocean-500 rounded-2xl flex items-center justify-center">
              <Flower className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yoga-600 to-ocean-600 bg-clip-text text-transparent">
            Create Your Yoga Studio
          </CardTitle>
          <p className="text-gray-600">Step {step} of 3 - Let's set up your online presence</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num ? 'bg-yoga-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > num ? <Check className="h-4 w-4" /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-8 h-0.5 ${step > num ? 'bg-yoga-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="studio_name">Studio Name</Label>
                <Input
                  id="studio_name"
                  value={formData.studio_name}
                  onChange={(e) => handleInputChange('studio_name', e.target.value)}
                  placeholder="e.g., Peaceful Mind Yoga"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="subdomain">Studio URL</Label>
                <div className="flex items-center mt-1">
                  <Input
                    id="subdomain"
                    value={formData.subdomain}
                    onChange={(e) => handleInputChange('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    placeholder="peacefulmind"
                    className="rounded-r-none"
                  />
                  <span className="px-3 py-2 bg-gray-100 border border-l-0 rounded-r-md text-sm text-gray-600">
                    .yogastudio.app
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">This will be your studio's web address</p>
              </div>

              <Button 
                onClick={() => setStep(2)} 
                disabled={!isStep1Valid}
                className="w-full bg-yoga-600 hover:bg-yoga-700"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">About Your Studio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell students about your teaching style, experience, and what makes your classes special..."
                  rows={5}
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!isStep2Valid}
                  className="flex-1 bg-yoga-600 hover:bg-yoga-700"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Students will use this to contact you</p>
              </div>

              <div>
                <Label htmlFor="brand_color">Brand Color</Label>
                <div className="flex items-center space-x-3 mt-1">
                  <Input
                    id="brand_color"
                    type="color"
                    value={formData.brand_color}
                    onChange={(e) => handleInputChange('brand_color', e.target.value)}
                    className="w-16 h-10 p-1 rounded"
                  />
                  <Input
                    value={formData.brand_color}
                    onChange={(e) => handleInputChange('brand_color', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="profile_image_url">Profile Image URL (Optional)</Label>
                <Input
                  id="profile_image_url"
                  value={formData.profile_image_url}
                  onChange={(e) => handleInputChange('profile_image_url', e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-yoga-600 hover:bg-yoga-700"
                >
                  {loading ? 'Creating Studio...' : 'Create Studio'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudioSetupWizard;
