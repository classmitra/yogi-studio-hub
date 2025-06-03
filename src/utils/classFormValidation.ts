
export interface FormErrors {
  [key: string]: string;
}

export interface ClassFormData {
  title: string;
  description: string;
  category: string;
  custom_category: string;
  difficulty_level: string;
  duration_minutes: number;
  max_students: number;
  price_cents: number;
  start_date: string;
  start_time: string;
  end_date: string;
  timezone: string;
  meeting_url: string;
  meeting_provider: string;
  auto_create_meeting: boolean;
  is_recurring: boolean;
  recurrence_pattern: string;
  recurrence_days: string[];
  payment_model: string;
  visibility_for_ineligible: boolean;
}

export const validateClassForm = (formData: ClassFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!formData.description.trim()) {
    errors.description = 'Description is required';
  }

  if (formData.category === 'custom' && !formData.custom_category.trim()) {
    errors.custom_category = 'Custom category name is required';
  }

  if (!formData.start_date) {
    errors.start_date = 'Start date is required';
  }

  if (!formData.start_time) {
    errors.start_time = 'Start time is required';
  }

  if (formData.duration_minutes < 15 || formData.duration_minutes > 180) {
    errors.duration_minutes = 'Duration must be between 15 and 180 minutes';
  }

  if (formData.max_students < 1 || formData.max_students > 50) {
    errors.max_students = 'Max students must be between 1 and 50';
  }

  if (formData.price_cents < 0) {
    errors.price_cents = 'Price cannot be negative';
  }

  if (formData.is_recurring && formData.recurrence_pattern === 'weekly' && formData.recurrence_days.length === 0) {
    errors.recurrence_days = 'Select at least one day for weekly recurrence';
  }

  if (formData.is_recurring && formData.end_date && formData.end_date <= formData.start_date) {
    errors.end_date = 'End date must be after start date';
  }

  return errors;
};

export const convertDaysToIntegers = (dayNames: string[]): number[] => {
  const dayMap: { [key: string]: number } = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6
  };
  return dayNames.map(day => dayMap[day]).filter(num => num !== undefined);
};

export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};
