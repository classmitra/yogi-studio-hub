
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClassFormData, FormErrors } from '@/utils/classFormValidation';
import AiTextHelper from '@/components/ui/ai-text-helper';

interface ClassDetailsFormProps {
  formData: ClassFormData;
  formErrors: FormErrors;
  showCustomCategory: boolean;
  onInputChange: (field: string, value: any) => void;
}

const ClassDetailsForm = ({ formData, formErrors, showCustomCategory, onInputChange }: ClassDetailsFormProps) => {
  const categories = [
    { value: 'hatha', label: 'Hatha' },
    { value: 'vinyasa', label: 'Vinyasa' },
    { value: 'yin', label: 'Yin' },
    { value: 'meditation', label: 'Meditation' },
    { value: 'pranayama', label: 'Pranayama' },
    { value: 'custom', label: 'Custom Category' }
  ];

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'America/Denver',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Kolkata',
    'Asia/Dubai',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland',
  ];

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const formatTimeInTimezone = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      }).format(new Date());
    } catch (error) {
      return new Date().toLocaleTimeString();
    }
  };

  return (
    <>
      <div className="text-lg font-semibold text-black border-b border-gray-200 pb-2">
        Enter class details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-black">Service*</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="e.g., Morning Vinyasa Flow"
            required
            className={`border-gray-300 focus:border-black focus:ring-black ${formErrors.title ? 'border-red-500' : ''}`}
          />
          {formErrors.title && <p className="text-red-500 text-xs">{formErrors.title}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-black">Category*</Label>
          <Select value={formData.category} onValueChange={(value) => onInputChange('category', value)}>
            <SelectTrigger className={`border-gray-300 focus:border-black focus:ring-black bg-white ${formErrors.category ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 z-50">
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formErrors.category && <p className="text-red-500 text-xs">{formErrors.category}</p>}
        </div>

        {showCustomCategory && (
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="custom_category" className="text-sm font-medium text-black">Custom Category Name*</Label>
            <Input
              id="custom_category"
              value={formData.custom_category}
              onChange={(e) => onInputChange('custom_category', e.target.value)}
              placeholder="Enter custom category name (e.g., Hot Yoga, Ashtanga, Restorative)"
              required={formData.category === 'custom'}
              className={`border-gray-300 focus:border-black focus:ring-black ${formErrors.custom_category ? 'border-red-500' : ''}`}
            />
            {formErrors.custom_category && <p className="text-red-500 text-xs">{formErrors.custom_category}</p>}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="timezone" className="text-sm font-medium text-black">Timezone*</Label>
          <Select value={formData.timezone} onValueChange={(value) => onInputChange('timezone', value)}>
            <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black bg-white">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 z-50">
              {timezones.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz} ({formatTimeInTimezone(tz)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="start_date" className="text-sm font-medium text-black">Starts on*</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => onInputChange('start_date', e.target.value)}
            min={getTodayDate()}
            required
            className={`border-gray-300 focus:border-black focus:ring-black ${formErrors.start_date ? 'border-red-500' : ''}`}
          />
          {formErrors.start_date && <p className="text-red-500 text-xs">{formErrors.start_date}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="start_time" className="text-sm font-medium text-black">Start Time*</Label>
          <Input
            id="start_time"
            type="time"
            value={formData.start_time}
            onChange={(e) => onInputChange('start_time', e.target.value)}
            required
            className={`border-gray-300 focus:border-black focus:ring-black ${formErrors.start_time ? 'border-red-500' : ''}`}
          />
          {formErrors.start_time && <p className="text-red-500 text-xs">{formErrors.start_time}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-sm font-medium text-black">Duration [in mins]*</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration_minutes}
            onChange={(e) => onInputChange('duration_minutes', parseInt(e.target.value) || 60)}
            min="15"
            max="180"
            required
            className={`border-gray-300 focus:border-black focus:ring-black ${formErrors.duration_minutes ? 'border-red-500' : ''}`}
          />
          {formErrors.duration_minutes && <p className="text-red-500 text-xs">{formErrors.duration_minutes}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty" className="text-sm font-medium text-black">Difficulty Level*</Label>
          <Select value={formData.difficulty_level} onValueChange={(value) => onInputChange('difficulty_level', value)}>
            <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black bg-white">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 z-50">
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_students" className="text-sm font-medium text-black">Max Students*</Label>
          <Input
            id="max_students"
            type="number"
            value={formData.max_students}
            onChange={(e) => onInputChange('max_students', parseInt(e.target.value) || 10)}
            min="1"
            max="50"
            required
            className={`border-gray-300 focus:border-black focus:ring-black ${formErrors.max_students ? 'border-red-500' : ''}`}
          />
          {formErrors.max_students && <p className="text-red-500 text-xs">{formErrors.max_students}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium text-black">Price (in cents)*</Label>
          <Input
            id="price"
            type="number"
            value={formData.price_cents}
            onChange={(e) => onInputChange('price_cents', parseInt(e.target.value) || 0)}
            min="0"
            placeholder="0 for free class"
            className={`border-gray-300 focus:border-black focus:ring-black ${formErrors.price_cents ? 'border-red-500' : ''}`}
          />
          <p className="text-xs text-gray-500">Enter price in cents (e.g., 2500 for $25.00)</p>
          {formErrors.price_cents && <p className="text-red-500 text-xs">{formErrors.price_cents}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-black">Description*</Label>
        <AiTextHelper
          value={formData.description}
          onChange={(value) => onInputChange('description', value)}
          placeholder="Describe your class, what students can expect..."
          prompt="Write a compelling description for a yoga class. Include the style, benefits, what students can expect, and any special focus areas."
          minLength={50}
          required
          formContext={{
            title: formData.title,
            category: formData.category === 'custom' ? formData.custom_category : formData.category,
            difficultyLevel: formData.difficulty_level,
            duration: formData.duration_minutes
          }}
        />
        {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
      </div>
    </>
  );
};

export default ClassDetailsForm;
