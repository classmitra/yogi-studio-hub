
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useClasses } from '@/hooks/useClasses';
import { useInstructor } from '@/hooks/useInstructor';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { 
  ClassFormData, 
  validateClassForm, 
  convertDaysToIntegers, 
  getTodayDate 
} from '@/utils/classFormValidation';
import ClassDetailsForm from './ClassDetailsForm';
import MeetingConfiguration from './MeetingConfiguration';
import RecurringClassConfig from './RecurringClassConfig';

interface ClassFormProps {
  onClose: () => void;
  editingClass?: any;
}

const ClassForm = ({ onClose, editingClass }: ClassFormProps) => {
  const { instructor } = useInstructor();
  const { createClass, updateClass, isCreating, isUpdating } = useClasses(instructor?.id);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState<ClassFormData>({
    title: editingClass?.title || '',
    description: editingClass?.description || '',
    category: editingClass?.category || 'hatha',
    custom_category: '',
    difficulty_level: editingClass?.difficulty_level || 'beginner',
    duration_minutes: editingClass?.duration_minutes || 60,
    max_students: editingClass?.max_students || 10,
    price_cents: editingClass?.price_cents || 0,
    start_date: editingClass?.start_date || getTodayDate(),
    start_time: editingClass?.start_time || '09:00',
    end_date: editingClass?.end_date || '',
    timezone: editingClass?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    meeting_url: editingClass?.meeting_url || '',
    meeting_provider: editingClass?.meeting_provider || 'zoom',
    auto_create_meeting: true,
    is_recurring: editingClass?.is_recurring || false,
    recurrence_pattern: editingClass?.recurrence_pattern || 'weekly',
    recurrence_days: editingClass?.recurrence_days || [],
    payment_model: 'standard',
    visibility_for_ineligible: false,
  });

  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

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

    const errors = validateClassForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      });
      return;
    }

    const finalCategory = formData.category === 'custom' ? formData.custom_category : formData.category;

    try {
      let meetingDetails = null;
      
      if (formData.auto_create_meeting && !formData.meeting_url) {
        try {
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
        } catch (meetingError) {
          console.warn('Failed to create meeting automatically:', meetingError);
        }
      }

      const recurrenceDaysAsIntegers = formData.is_recurring && formData.recurrence_pattern === 'weekly' 
        ? convertDaysToIntegers(formData.recurrence_days) 
        : null;

      const classData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: finalCategory.trim(),
        difficulty_level: formData.difficulty_level,
        duration_minutes: Number(formData.duration_minutes),
        max_students: Number(formData.max_students),
        price_cents: Number(formData.price_cents),
        start_date: formData.start_date,
        start_time: formData.start_time,
        instructor_id: instructor.id,
        is_active: true,
        meeting_url: meetingDetails?.join_url || formData.meeting_url || null,
        meeting_id: meetingDetails?.meeting_id || null,
        meeting_password: meetingDetails?.password || null,
        end_date: formData.is_recurring && formData.end_date ? formData.end_date : null,
        recurrence_days: recurrenceDaysAsIntegers,
        recurrence_pattern: formData.is_recurring ? formData.recurrence_pattern : null,
        is_recurring: formData.is_recurring,
      };

      console.log('Submitting class data:', classData);

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
      navigate('/class-schedule');
    } catch (error: any) {
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
    
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
    
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

  const clearEndDate = () => {
    handleInputChange('end_date', '');
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
          <ClassDetailsForm
            formData={formData}
            formErrors={formErrors}
            showCustomCategory={showCustomCategory}
            onInputChange={handleInputChange}
          />

          <MeetingConfiguration
            formData={formData}
            onInputChange={handleInputChange}
          />

          <RecurringClassConfig
            formData={formData}
            formErrors={formErrors}
            onInputChange={handleInputChange}
            onRecurrenceDayChange={handleRecurrenceDayChange}
            onClearEndDate={clearEndDate}
          />

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
