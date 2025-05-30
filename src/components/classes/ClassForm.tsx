
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useClasses } from '@/hooks/useClasses';
import { useInstructor } from '@/hooks/useInstructor';
import { useToast } from '@/hooks/use-toast';
import { X, Plus, Loader2 } from 'lucide-react';

const CATEGORIES = [
  'vinyasa', 'hatha', 'yin', 'restorative', 'ashtanga', 'bikram', 'kundalini', 
  'meditation', 'pranayama', 'prenatal', 'gentle', 'power', 'hot'
];

const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced', 'all-levels'];

const EQUIPMENT_OPTIONS = [
  'yoga mat', 'blocks', 'straps', 'bolster', 'blanket', 'meditation cushion',
  'wall space', 'chair', 'resistance band'
];

const WEEKDAYS = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

interface ClassFormProps {
  onClose: () => void;
  editingClass?: any;
}

const ClassForm = ({ onClose, editingClass }: ClassFormProps) => {
  const { instructor } = useInstructor();
  const { createClass, updateClass, isCreating, isUpdating } = useClasses(instructor?.id);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: editingClass?.title || '',
    description: editingClass?.description || '',
    category: editingClass?.category || '',
    duration_minutes: editingClass?.duration_minutes || 60,
    max_students: editingClass?.max_students || 20,
    price_cents: editingClass?.price_cents || 2500,
    difficulty_level: editingClass?.difficulty_level || '',
    equipment_needed: editingClass?.equipment_needed || [],
    is_recurring: editingClass?.is_recurring || false,
    recurrence_pattern: editingClass?.recurrence_pattern || 'weekly',
    recurrence_days: editingClass?.recurrence_days || [],
    start_date: editingClass?.start_date || new Date().toISOString().split('T')[0],
    end_date: editingClass?.end_date || '',
    start_time: editingClass?.start_time || '09:00',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!instructor) {
      toast({
        title: "Error",
        description: "Instructor information not found",
        variant: "destructive",
      });
      return;
    }

    const classData = {
      ...formData,
      instructor_id: instructor.id,
      equipment_needed: formData.equipment_needed.length > 0 ? formData.equipment_needed : null,
      recurrence_days: formData.is_recurring ? formData.recurrence_days : null,
      end_date: formData.end_date || null,
    };

    if (editingClass) {
      updateClass({ id: editingClass.id, ...classData });
    } else {
      createClass(classData);
    }

    toast({
      title: editingClass ? "Class Updated" : "Class Created",
      description: `${formData.title} has been ${editingClass ? 'updated' : 'created'} successfully.`,
    });

    onClose();
  };

  const toggleEquipment = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipment_needed: prev.equipment_needed.includes(equipment)
        ? prev.equipment_needed.filter(e => e !== equipment)
        : [...prev.equipment_needed, equipment]
    }));
  };

  const toggleRecurrenceDay = (day: number) => {
    setFormData(prev => ({
      ...prev,
      recurrence_days: prev.recurrence_days.includes(day)
        ? prev.recurrence_days.filter(d => d !== day)
        : [...prev.recurrence_days, day]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{editingClass ? 'Edit Class' : 'Create New Class'}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Class Title *</Label>
                <Input
                  id="title"
                  placeholder="Morning Vinyasa Flow"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty">Difficulty Level *</Label>
                <Select value={formData.difficulty_level} onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty_level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIFFICULTY_LEVELS.map(level => (
                      <SelectItem key={level} value={level}>
                        {level.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  max="180"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) }))}
                />
              </div>

              <div>
                <Label htmlFor="max_students">Max Students</Label>
                <Input
                  id="max_students"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.max_students}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_students: parseInt(e.target.value) }))}
                />
              </div>

              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price_cents / 100}
                  onChange={(e) => setFormData(prev => ({ ...prev, price_cents: Math.round(parseFloat(e.target.value) * 100) }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your class, what students can expect, and any special instructions..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Equipment */}
            <div>
              <Label>Equipment Needed</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {EQUIPMENT_OPTIONS.map(equipment => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment}
                      checked={formData.equipment_needed.includes(equipment)}
                      onCheckedChange={() => toggleEquipment(equipment)}
                    />
                    <Label htmlFor={equipment} className="text-sm">
                      {equipment}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.equipment_needed.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.equipment_needed.map(equipment => (
                    <Badge key={equipment} variant="secondary">
                      {equipment}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="start_time">Start Time *</Label>
                <Input
                  id="start_time"
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="end_date">End Date (Optional)</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                />
              </div>
            </div>

            {/* Recurring */}
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_recurring"
                  checked={formData.is_recurring}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_recurring: !!checked }))}
                />
                <Label htmlFor="is_recurring">Recurring Class</Label>
              </div>

              {formData.is_recurring && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label>Repeat on days:</Label>
                    <div className="grid grid-cols-3 md:grid-cols-7 gap-2 mt-2">
                      {WEEKDAYS.map(day => (
                        <div key={day.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day.value}`}
                            checked={formData.recurrence_days.includes(day.value)}
                            onCheckedChange={() => toggleRecurrenceDay(day.value)}
                          />
                          <Label htmlFor={`day-${day.value}`} className="text-sm">
                            {day.label.slice(0, 3)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isCreating || isUpdating}
                className="bg-yoga-600 hover:bg-yoga-700"
              >
                {(isCreating || isUpdating) ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editingClass ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editingClass ? 'Update Class' : 'Create Class'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassForm;
