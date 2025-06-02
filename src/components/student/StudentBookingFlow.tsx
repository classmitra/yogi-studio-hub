
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Users, Calendar, DollarSign, User, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface StudentBookingFlowProps {
  classItem: any;
  instructor: any;
  onClose: () => void;
}

const StudentBookingFlow = ({ classItem, instructor, onClose }: StudentBookingFlowProps) => {
  const { toast } = useToast();
  const [isBooking, setIsBooking] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const handleBookClass = async () => {
    if (!studentInfo.name || !studentInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsBooking(true);

    try {
      const bookingData = {
        class_id: classItem.id,
        student_name: studentInfo.name,
        student_email: studentInfo.email,
        booking_date: classItem.start_date,
        booking_time: classItem.start_time,
        special_requests: studentInfo.specialRequests,
        payment_amount_cents: classItem.price_cents,
      };

      const { data, error } = await supabase.functions.invoke('create-payment-checkout', {
        body: {
          classId: classItem.id,
          bookingData,
        },
      });

      if (error) {
        throw error;
      }

      window.open(data.url, '_blank');

      toast({
        title: "Redirecting to Payment",
        description: "You'll be redirected to complete your payment.",
      });
      
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Book: {classItem.title}
              </CardTitle>
              <p className="text-gray-600 mt-1">with {instructor.studio_name}</p>
            </div>
            <Button variant="outline" onClick={onClose}>×</Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Class Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Class Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{format(new Date(classItem.start_date), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>{classItem.start_time} ({classItem.duration_minutes} min)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                <span>Max {classItem.max_students} students</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>${(classItem.price_cents / 100).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <Badge 
                variant="secondary" 
                className={`${getDifficultyColor(classItem.difficulty_level)} font-medium`}
              >
                {classItem.difficulty_level}
              </Badge>
              <Badge variant="outline" className="ml-2">
                {classItem.category}
              </Badge>
            </div>
            
            {classItem.description && (
              <p className="text-gray-600 mt-3 text-sm">{classItem.description}</p>
            )}
          </div>

          {/* Student Information Form */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Your Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={studentInfo.name}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={studentInfo.email}
                    onChange={(e) => setStudentInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number (Optional)
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={studentInfo.phone}
                  onChange={(e) => setStudentInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="requests" className="text-sm font-medium">
                Special Requests (Optional)
              </Label>
              <Input
                id="requests"
                type="text"
                placeholder="Any special requirements or questions?"
                value={studentInfo.specialRequests}
                onChange={(e) => setStudentInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
              />
            </div>
          </div>

          {/* Booking Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBookClass}
              disabled={isBooking || !studentInfo.name || !studentInfo.email}
              className="flex-1"
              style={{ backgroundColor: instructor.brand_color }}
            >
              {isBooking ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Book Now - $${(classItem.price_cents / 100).toFixed(2)}`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentBookingFlow;
