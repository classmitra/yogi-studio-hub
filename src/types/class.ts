
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Class = Tables<'classes'>;
export type ClassInsert = TablesInsert<'classes'>;
export type ClassUpdate = TablesUpdate<'classes'>;

export interface ClassWithInstructor extends Class {
  instructors?: any;
  isEmpty?: boolean;
}
