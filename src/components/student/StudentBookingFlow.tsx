
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { trackClassBooking } from '@/utils/analytics';
import StudentPhoneAuth from './StudentPhoneAuth';

interface StudentBookingFlowProps {
  classItem: any;
  instructor: any;
  onClose: () => void;
}

const StudentBookingFlow = ({ classItem, instructor, onClose }: StudentBookingFlowProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingReference, setBookingReference] = useState<string | null>(null);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleBookingSubmit = async (formData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if user is authenticated
      if (!user) {
        setShowPhoneAuth(true);
        setIsLoading(false);
        return;
      }

      // Generate booking reference using the database function
      const { data: refData, error: refError } = await supabase.rpc('generate_booking_reference');
      
      if (refError) {
        console.error('Error generating booking reference:', refError);
        throw refError;
      }

      console.log('Creating booking with data:', {
        ...formData,
        class_id: classItem.id,
        student_id: user.id,
        booking_date: classItem.start_date,
        booking_time: classItem.start_time,
        booking_reference: refData
      });

      const { data, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          class_id: classItem.id,
          student_id: user.id,
          student_name: formData.name,
          student_email: formData.email,
          special_requests: formData.special_requests || null,
          booking_date: classItem.start_date,
          booking_time: classItem.start_time,
          booking_reference: refData,
          payment_amount_cents: classItem.price_cents,
          status: 'confirmed'
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Booking error:', bookingError);
        throw bookingError;
      }

      console.log('Booking created successfully:', data);
      
      // Track successful booking
      trackClassBooking(classItem.id, classItem.title, instructor.studio_name);
      
      setBookingReference(data.booking_reference);
      setStep('success');
      
      toast({
        title: "Booking Confirmed!",
        description: `Your booking reference is ${data.booking_reference}`,
      });

    } catch (err: any) {
      console.error('Booking submission error:', err);
      setError(err.message || 'Failed to create booking. Please try again.');
      toast({
        title: "Booking Failed",
        description: err.message || 'Something went wrong. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuthSuccess = () => {
    setShowPhoneAuth(false);
    // After successful authentication, automatically proceed with booking
    const formData = {
      name: (document.getElementById('name') as HTMLInputElement)?.value || '',
      email: (document.getElementById('email') as HTMLInputElement)?.value || '',
      special_requests: (document.getElementById('special_requests') as HTMLTextAreaElement)?.value || ''
    };
    handleBookingSubmit(formData);
  };

  return (
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book {classItem.title}</DialogTitle>
            <DialogDescription>
              Complete your details to book this class.
            </DialogDescription>
          </DialogHeader>

          {step === 'form' && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="name" 
                  defaultValue={user?.user_metadata?.full_name || `${user?.user_metadata?.first_name || ''} ${user?.user_metadata?.last_name || ''}`.trim()} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input 
                  id="email" 
                  defaultValue={user?.email || ''} 
                  className="col-span-3" 
                  type="email" 
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="special_requests" className="text-right mt-2">
                  Special Requests
                </Label>
                <Textarea id="special_requests" className="col-span-3" />
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="grid gap-4 py-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Booking Confirmed!</h3>
                <p>Your booking reference is: {bookingReference}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            {step === 'form' && (
              <Button onClick={() => handleBookingSubmit({ 
                name: (document.getElementById('name') as HTMLInputElement)?.value,
                email: (document.getElementById('email') as HTMLInputElement)?.value,
                special_requests: (document.getElementById('special_requests') as HTMLTextAreaElement)?.value
              })} disabled={isLoading}>
                {isLoading ? 'Processing...' : user ? 'Submit Booking' : 'Login & Book'}
              </Button>
            )}
            {step === 'success' && (
              <Button onClick={onClose}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <StudentPhoneAuth
        open={showPhoneAuth}
        onClose={() => setShowPhoneAuth(false)}
        onSuccess={handlePhoneAuthSuccess}
      />
    </>
  );
};

export default StudentBookingFlow;
