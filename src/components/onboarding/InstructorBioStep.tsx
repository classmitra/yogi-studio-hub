
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import AiTextHelper from '@/components/ui/ai-text-helper';

interface InstructorBioStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const InstructorBioStep = ({ formData, updateFormData }: InstructorBioStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
        <p className="text-gray-600">Share your story and expertise with potential students</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="studio_name" className="text-sm font-medium text-gray-700">
            Studio/Business Name*
          </Label>
          <Input
            id="studio_name"
            value={formData.studio_name || ''}
            onChange={(e) => updateFormData('studio_name', e.target.value)}
            placeholder="Your Yoga Studio"
            required
            className="border-gray-300 focus:border-yoga-500 focus:ring-yoga-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
            Your Bio/About Section*
          </Label>
          <AiTextHelper
            value={formData.bio || ''}
            onChange={(value) => updateFormData('bio', value)}
            placeholder="Tell students about your yoga journey, training, teaching style, and what makes your classes special..."
            prompt="Write a compelling bio for a yoga instructor. Include their experience, teaching philosophy, training background, and what students can expect from their classes. Make it warm, authentic, and inspiring."
            minLength={100}
            required
            rows={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specializations" className="text-sm font-medium text-gray-700">
            Specializations & Certifications
          </Label>
          <AiTextHelper
            value={formData.specializations || ''}
            onChange={(value) => updateFormData('specializations', value)}
            placeholder="List your yoga certifications, specializations, training programs..."
            prompt="Generate a professional list of yoga specializations and certifications. Include various yoga styles, teacher training hours, and areas of expertise."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact_email" className="text-sm font-medium text-gray-700">
              Contact Email*
            </Label>
            <Input
              id="contact_email"
              type="email"
              value={formData.contact_email || ''}
              onChange={(e) => updateFormData('contact_email', e.target.value)}
              placeholder="contact@yourstudio.com"
              required
              className="border-gray-300 focus:border-yoga-500 focus:ring-yoga-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_phone" className="text-sm font-medium text-gray-700">
              Contact Phone
            </Label>
            <Input
              id="contact_phone"
              type="tel"
              value={formData.contact_phone || ''}
              onChange={(e) => updateFormData('contact_phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="border-gray-300 focus:border-yoga-500 focus:ring-yoga-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorBioStep;
