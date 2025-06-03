
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ClassFormData, FormErrors } from '@/utils/classFormValidation';

interface RecurringClassConfigProps {
  formData: ClassFormData;
  formErrors: FormErrors;
  onInputChange: (field: string, value: any) => void;
  onRecurrenceDayChange: (day: string, checked: boolean) => void;
  onClearEndDate: () => void;
}

const RecurringClassConfig = ({ 
  formData, 
  formErrors, 
  onInputChange, 
  onRecurrenceDayChange, 
  onClearEndDate 
}: RecurringClassConfigProps) => {
  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="is_recurring"
          checked={formData.is_recurring}
          onCheckedChange={(checked) => onInputChange('is_recurring', checked)}
        />
        <Label htmlFor="is_recurring" className="text-sm font-medium text-black">
          Make this a recurring class
        </Label>
      </div>

      {formData.is_recurring && (
        <div className="space-y-4 pl-6 border-l-2 border-gray-200">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">Recurrence Pattern</Label>
            <Select value={formData.recurrence_pattern} onValueChange={(value) => onInputChange('recurrence_pattern', value)}>
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
              <Label className="text-sm font-medium text-black">Repeat on days*</Label>
              <div className="grid grid-cols-2 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.value}
                      checked={formData.recurrence_days.includes(day.value)}
                      onCheckedChange={(checked) => onRecurrenceDayChange(day.value, checked as boolean)}
                    />
                    <Label htmlFor={day.value} className="text-sm text-gray-700">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
              {formErrors.recurrence_days && <p className="text-red-500 text-xs">{formErrors.recurrence_days}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="end_date" className="text-sm font-medium text-black">
              Ends on [optional]
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => onInputChange('end_date', e.target.value)}
                min={formData.start_date}
                className={`border-gray-300 focus:border-black focus:ring-black flex-1 ${formErrors.end_date ? 'border-red-500' : ''}`}
              />
              {formData.end_date && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClearEndDate}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Clear
                </Button>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Enter the date on or before which you want the recurring classes to end. 
              Leave empty if you want the recurring classes to continue forever.
            </p>
            {formErrors.end_date && <p className="text-red-500 text-xs">{formErrors.end_date}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecurringClassConfig;
