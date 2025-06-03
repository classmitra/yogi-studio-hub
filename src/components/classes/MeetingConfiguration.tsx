
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ClassFormData } from '@/utils/classFormValidation';

interface MeetingConfigurationProps {
  formData: ClassFormData;
  onInputChange: (field: string, value: any) => void;
}

const MeetingConfiguration = ({ formData, onInputChange }: MeetingConfigurationProps) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="text-lg font-semibold text-black border-b border-gray-200 pb-2 mb-4">
        Meeting Configuration
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="auto_create_meeting"
            checked={formData.auto_create_meeting}
            onCheckedChange={(checked) => onInputChange('auto_create_meeting', checked)}
          />
          <Label htmlFor="auto_create_meeting" className="text-sm font-medium text-black">
            Automatically create meeting link
          </Label>
        </div>

        {formData.auto_create_meeting && (
          <div className="space-y-2 pl-6 border-l-2 border-gray-200">
            <Label className="text-sm font-medium text-black">Meeting Provider*</Label>
            <Select value={formData.meeting_provider} onValueChange={(value) => onInputChange('meeting_provider', value)}>
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
            <Label htmlFor="meeting_url" className="text-sm font-medium text-black">Manual Meeting Link</Label>
            <Input
              id="meeting_url"
              value={formData.meeting_url}
              onChange={(e) => onInputChange('meeting_url', e.target.value)}
              placeholder="Enter your Zoom, Google Meet, or other video call link"
              className="border-gray-300 focus:border-black focus:ring-black"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingConfiguration;
