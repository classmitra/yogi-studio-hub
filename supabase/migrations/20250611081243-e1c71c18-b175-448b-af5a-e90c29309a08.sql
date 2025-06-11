
-- Enable phone authentication by updating auth settings
-- This will be handled through Supabase dashboard, but we need to ensure profiles can store phone numbers

-- Add phone number to profiles table if not exists
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_number text;

-- Create index for phone number lookups
CREATE INDEX IF NOT EXISTS idx_profiles_phone_number ON public.profiles(phone_number);

-- Update the handle_new_user function to handle phone numbers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, phone_number)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.phone
  );
  RETURN NEW;
END;
$$;
