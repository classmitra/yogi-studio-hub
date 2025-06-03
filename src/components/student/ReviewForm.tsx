
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/utils/analytics';

interface ReviewFormProps {
  booking: any;
  onClose: () => void;
  onSubmit: () => void;
}

const ReviewForm = ({ booking, onClose, onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Rating is required to submit your review.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // For now, we'll use a placeholder user_id since we don't have full auth
      const tempUserId = crypto.randomUUID();
      
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: tempUserId,
          instructor_id: booking.classes.instructor_id,
          class_id: booking.class_id,
          booking_id: booking.id,
          rating,
          comment: comment.trim() || null
        });

      if (error) throw error;

      // Track review submission
      trackEvent('review_submitted', 'engagement', booking.classes.title, rating);

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback.",
      });

      onSubmit();
      onClose();
    } catch (error: any) {
      console.error('Review submission error:', error);
      toast({
        title: "Failed to submit review",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate Your Class</DialogTitle>
          <DialogDescription>
            How was your experience with {booking.classes.title}?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-3">Your Rating</p>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-colors"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Comments (Optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about the class..."
              className="min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || rating === 0}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
