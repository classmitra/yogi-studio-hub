
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Shield } from 'lucide-react';

interface StudentPhoneAuthProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const StudentPhoneAuth = ({ open, onClose, onSuccess }: StudentPhoneAuthProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signInWithPhone, verifyOTP } = useAuth();

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Add country code if not present (assuming India +91)
    if (digits.length === 10) {
      return `+91${digits}`;
    } else if (digits.length === 12 && digits.startsWith('91')) {
      return `+${digits}`;
    } else if (digits.length === 13 && digits.startsWith('+91')) {
      return digits;
    }
    
    return phone; // Return as-is if format is unclear
  };

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      console.log('Sending OTP to:', formattedPhone);
      
      const { error } = await signInWithPhone(formattedPhone);
      
      if (error) {
        console.error('Send OTP error:', error);
        toast({
          title: "Failed to Send OTP",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setStep('otp');
        toast({
          title: "OTP Sent",
          description: "Please check your phone for the verification code.",
        });
      }
    } catch (err: any) {
      console.error('Send OTP error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      console.log('Verifying OTP for:', formattedPhone, 'with code:', otp);
      
      const { error } = await verifyOTP(formattedPhone, otp);
      
      if (error) {
        console.error('Verify OTP error:', error);
        toast({
          title: "Invalid OTP",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "You have been logged in successfully.",
        });
        onSuccess();
      }
    } catch (err: any) {
      console.error('Verify OTP error:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('phone');
    setOtp('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 'phone' ? (
              <>
                <Phone className="h-5 w-5" />
                Enter Your Phone Number
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                Verify OTP
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {step === 'phone' 
              ? "We'll send you a verification code to complete your booking."
              : `Enter the 6-digit code sent to ${phoneNumber}`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {step === 'phone' ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSendOTP} disabled={isLoading}>
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-4">
                <Label htmlFor="otp">Enter Verification Code</Label>
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="flex justify-between gap-2">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={handleSendOTP} disabled={isLoading}>
                    Resend OTP
                  </Button>
                  <Button onClick={handleVerifyOTP} disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentPhoneAuth;
