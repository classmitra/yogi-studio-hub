
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useClasses } from '@/hooks/useClasses';
import { useInstructor } from '@/hooks/useInstructor';
import { useToast } from '@/hooks/use-toast';
import { X, Plus, Sparkles, DollarSign, Euro, IndianRupee } from 'lucide-react';
import AiTextHelper from '@/components/ui/ai-text-helper';

interface ClassFormProps {
  onClose: () => void;
  editingClass?: any;
}

const ClassForm = ({ onClose, editingClass }: ClassFormProps) => {
  const { instructor } = useInstructor();
  const { createClass, updateClass, isCreating, isUpdating } = useClasses(instructor?.id);
  const { toast } = useToast();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    title: editingClass?.title || '',
    description: editingClass?.description || '',
    category: editingClass?.category || 'hatha',
    custom_category: '',
    difficulty_level: editingClass?.difficulty_level || 'beginner',
    duration_minutes: editingClass?.duration_minutes || 60,
    max_students: editingClass?.max_students || 10,
    price_cents: editingClass?.price_cents || 0,
    currency: editingClass?.currency || 'USD',
    start_date: editingClass?.start_date || '',
    start_time: editingClass?.start_time || '',
    end_date: editingClass?.end_date || '',
    timezone: editingClass?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    meeting_link: editingClass?.meeting_link || '',
    meeting_provider: editingClass?.meeting_provider || 'zoom',
    auto_create_meeting: true,
    is_recurring: editingClass?.is_recurring || false,
    recurrence_pattern: editingClass?.recurrence_pattern || 'weekly',
    recurrence_days: editingClass?.recurrence_days || [],
    payment_model: 'standard',
    visibility_for_ineligible: false,
  });

  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const currencies = [
    { value: 'USD', label: 'USD ($)', icon: DollarSign },
    { value: 'EUR', label: 'EUR (€)', icon: Euro },
    { value: 'INR', label: 'INR (₹)', icon: IndianRupee },
    { value: 'GBP', label: 'GBP (£)', icon: DollarSign },
    { value: 'CAD', label: 'CAD (C$)', icon: DollarSign },
    { value: 'AUD', label: 'AUD (A$)', icon: DollarSign },
    { value: 'JPY', label: 'JPY (¥)', icon: DollarSign },
    { value: 'SGD', label: 'SGD (S$)', icon: DollarSign },
  ];

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

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const formatTimeInTimezone = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short'
      }).format(currentTime);
    } catch (error) {
      return currentTime.toLocaleTimeString();
    }
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      INR: '₹',
      GBP: '£',
      CAD: 'C$',
      AUD: 'A$',
      JPY: '¥',
      SGD: 'S$'
    };
    return symbols[currency] || '$';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!instructor?.id) {
      toast({
        title: "Error",
        description: "You must be logged in as an instructor to create classes.",
        variant: "destructive",
      });
      return;
    }

    const finalCategory = formData.category === 'custom' ? formData.custom_category : formData.category;

    try {
      let meetingDetails = null;
      
      if (formData.auto_create_meeting && !formData.meeting_link) {
        const { MeetingIntegrationService } = await import('@/services/meetingIntegration');
        
        meetingDetails = await MeetingIntegrationService.createMeeting({
          title: formData.title,
          start_time: formData.start_time,
          start_date: formData.start_date,
          duration_minutes: formData.duration_minutes,
          description: formData.description,
          instructor_email: instructor.contact_email || '',
          provider: formData.meeting_provider as 'zoom' | 'google_meet'
        });
      }

      const classData = {
        ...formData,
        category: finalCategory,
        instructor_id: instructor.id,
        is_active: true,
        meeting_link: meetingDetails?.join_url || formData.meeting_link || null,
        meeting_id: meetingDetails?.meeting_id || null,
        meeting_password: meetingDetails?.password || null,
        end_date: formData.is_recurring ? formData.end_date || null : null,
        recurrence_days: formData.is_recurring ? formData.recurrence_days : null,
        recurrence_pattern: formData.is_recurring ? formData.recurrence_pattern : null,
      };

      delete classData.custom_category;
      delete classData.auto_create_meeting;
      delete classData.meeting_provider;

      if (editingClass) {
        updateClass({ id: editingClass.id, ...classData });
      } else {
        createClass(classData);
      }

      toast({
        title: editingClass ? "Class Updated" : "Class Created",
        description: `Your yoga class has been ${editingClass ? 'updated' : 'created'} successfully.${meetingDetails ? ' Meeting link has been automatically generated.' : ''}`,
      });

      onClose();
    } catch (error) {
      console.error('Class creation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save class. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'category' && value === 'custom') {
      setShowCustomCategory(true);
    } else if (field === 'category' && value !== 'custom') {
      setShowCustomCategory(false);
      setFormData(prev => ({ ...prev, custom_category: '' }));
    }
  };

  const handleRecurrenceDayChange = (day: string, checked: boolean) => {
    const updatedDays = checked 
      ? [...formData.recurrence_days, day]
      : formData.recurrence_days.filter(d => d !== day);
    
    handleInputChange('recurrence_days', updatedDays);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-white border-2 border-black shadow-2xl">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-black">
                {editingClass ? 'Edit Class' : 'Create New Class'}
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Current time ({formData.timezone}): {formatTimeInTimezone(formData.timezone)}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="hover:bg-gray-100 p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="text-lg font-semibold text-black border-b border-gray-200 pb-2">
            Enter class details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-black">Service*</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Morning Vinyasa Flow"
                required
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-black">Category*</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black bg-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 z-50">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showCustomCategory && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="custom_category" className="text-sm font-medium text-black">Custom Category Name*</Label>
                <Input
                  id="custom_category"
                  value={formData.custom_category}
                  onChange={(e) => handleInputChange('custom_category', e.target.value)}
                  placeholder="Enter custom category name (e.g., Hot Yoga, Ashtanga, Restorative)"
                  required={formData.category === 'custom'}
                  className="border-gray-300 focus:border-black focus:ring-black"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-sm font-medium text-black">Timezone*</Label>
              <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black bg-white">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 z-50 max-h-60">
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
                onChange={(e) => handleInputChange('start_date', e.target.value)}
                required
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_time" className="text-sm font-medium text-black">Start Time*</Label>
              <Input
                id="start_time"
                type="time"
                value={formData.start_time}
                onChange={(e) => handleInputChange('start_time', e.target.value)}
                required
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-black">Duration [in mins]*</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration_minutes}
                onChange={(e) => handleInputChange('duration_minutes', parseInt(e.target.value))}
                min="15"
                max="180"
                required
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-sm font-medium text-black">Difficulty Level*</Label>
              <Select value={formData.difficulty_level} onValueChange={(value) => handleInputChange('difficulty_level', value)}>
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
                onChange={(e) => handleInputChange('max_students', parseInt(e.target.value))}
                min="1"
                max="50"
                required
                className="border-gray-300 focus:border-black focus:ring-black"
              />
            </div>
          </div>

          {/* Meeting Configuration Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="text-lg font-semibold text-black border-b border-gray-200 pb-2 mb-4">
              Meeting Configuration
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto_create_meeting"
                  checked={formData.auto_create_meeting}
                  onCheckedChange={(checked) => handleInputChange('auto_create_meeting', checked)}
                />
                <Label htmlFor="auto_create_meeting" className="text-sm font-medium text-black">
                  Automatically create meeting link
                </Label>
              </div>

              {formData.auto_create_meeting && (
                <div className="space-y-2 pl-6 border-l-2 border-gray-200">
                  <Label className="text-sm font-medium text-black">Meeting Provider*</Label>
                  <Select value={formData.meeting_provider} onValueChange={(value) => handleInputChange('meeting_provider', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 z-50">
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="google_meet">Google Meet</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Meeting will be automatically created and the link will be shared with students via email.
                  </p>
                </div>
              )}

              {!formData.auto_create_meeting && (
                <div className="space-y-2">
                  <Label htmlFor="meeting_link" className="text-sm font-medium text-black">Manual Meeting Link</Label>
                  <Input
                    id="meeting_link"
                    value={formData.meeting_link}
                    onChange={(e) => handleInputChange('meeting_link', e.target.value)}
                    placeholder="Enter your Zoom, Google Meet, or other video call link"
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Recurring Classes Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="is_recurring"
                checked={formData.is_recurring}
                onCheckedChange={(checked) => handleInputChange('is_recurring', checked)}
              />
              <Label htmlFor="is_recurring" className="text-sm font-medium text-black">
                Make this a recurring class
              </Label>
            </div>

            {formData.is_recurring && (
              <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-black">Recurrence Pattern</Label>
                  <Select value={formData.recurrence_pattern} onValueChange={(value) => handleInputChange('recurrence_pattern', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 z-50">
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.recurrence_pattern === 'weekly' && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-black">Repeat on days</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {daysOfWeek.map((day) => (
                        <div key={day.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={day.value}
                            checked={formData.recurrence_days.includes(day.value)}
                            onCheckedChange={(checked) => handleRecurrenceDayChange(day.value, checked as boolean)}
                          />
                          <Label htmlFor={day.value} className="text-sm text-gray-700">
                            {day.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="end_date" className="text-sm font-medium text-black">
                    Ends on [optional]
                  </Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => handleInputChange('end_date', e.target.value)}
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                  <p className="text-xs text-gray-500">
                    Enter the date on or before which you want the recurring classes to end. 
                    Leave empty if you want the recurring classes to continue forever.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-black">Description*</Label>
            <AiTextHelper
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
              placeholder="Describe your class, what students can expect..."
              prompt="Write a compelling description for a yoga class. Include the style, benefits, what students can expect, and any special focus areas."
              minLength={50}
              required
            />
          </div>

          {/* Payment Model Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-black">Payment model</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="standard"
                  name="payment_model"
                  value="standard"
                  checked={formData.payment_model === 'standard'}
                  onChange={(e) => handleInputChange('payment_model', e.target.value)}
                  className="text-black focus:ring-black"
                />
                <Label htmlFor="standard" className="text-sm text-gray-700">
                  Standard pricing. Use this for most situations.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="donation"
                  name="payment_model"
                  value="donation"
                  checked={formData.payment_model === 'donation'}
                  onChange={(e) => handleInputChange('payment_model', e.target.value)}
                  className="text-black focus:ring-black"
                />
                <Label htmlFor="donation" className="text-sm text-gray-700">
                  Donations: This is a "pay what you want" model.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="free"
                  name="payment_model"
                  value="free"
                  checked={formData.payment_model === 'free'}
                  onChange={(e) => handleInputChange('payment_model', e.target.value)}
                  className="text-black focus:ring-black"
                />
                <Label htmlFor="free" className="text-sm text-gray-700">
                  Free. Use this if this class is free for everyone.
                </Label>
              </div>
            </div>

            {formData.payment_model === 'standard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-sm font-medium text-black">Currency*</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-black focus:ring-black bg-white">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 z-50">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          <div className="flex items-center space-x-2">
                            <currency.icon className="h-4 w-4" />
                            <span>{currency.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium text-black">
                    Price ({getCurrencySymbol(formData.currency)})
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price_cents / 100}
                    onChange={(e) => handleInputChange('price_cents', Math.round(parseFloat(e.target.value || '0') * 100))}
                    min="0"
                    placeholder={`0.00 ${formData.currency}`}
                    className="border-gray-300 focus:border-black focus:ring-black"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="meeting_link" className="text-sm font-medium text-black">Meeting Link (Zoom/Google Meet)</Label>
            <Input
              id="meeting_link"
              value={formData.meeting_link}
              onChange={(e) => handleInputChange('meeting_link', e.target.value)}
              placeholder="Zoom, Google Meet, or other video call link"
              className="border-gray-300 focus:border-black focus:ring-black"
            />
          </div>

          {/* Visibility Section */}
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-black">Visibility for ineligible students</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="visibility_for_ineligible"
                  checked={formData.visibility_for_ineligible}
                  onCheckedChange={(checked) => handleInputChange('visibility_for_ineligible', checked)}
                />
                <Label htmlFor="visibility_for_ineligible" className="text-sm text-gray-700">
                  Show this class with a "Fees" button to ineligible students.
                </Label>
              </div>
              <p className="text-xs text-gray-500">
                Turn this option on to help students discover this class and to encourage them to enquire about this class.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating || isUpdating}
              className="bg-black hover:bg-gray-800 text-white"
            >
              {isCreating || isUpdating ? 'Saving...' : (editingClass ? 'Update Class' : 'Create Class')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ClassForm;
