
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Calendar, DollarSign, Star, Award } from 'lucide-react';
import { format } from 'date-fns';

interface PublicClassCardProps {
  classItem: any;
  instructor: any;
  onBookNow: (classItem: any) => void;
}

const PublicClassCard = ({ classItem, instructor, onBookNow }: PublicClassCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hatha': return <Star className="h-4 w-4" />;
      case 'vinyasa': return <Award className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            {getCategoryIcon(classItem.category)}
            <span className="text-sm font-medium text-gray-600">{classItem.category}</span>
          </div>
          <Badge 
            variant="secondary" 
            className={`capitalize font-medium ${getDifficultyColor(classItem.difficulty_level)}`}
          >
            {classItem.difficulty_level}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-yoga-600 transition-colors">
          {classItem.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-yoga-500" />
            <span className="font-medium">
              {format(new Date(classItem.start_date), 'MMM d')}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-yoga-500" />
            <span className="font-medium">{classItem.start_time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2 text-yoga-500" />
            <span className="font-medium">Max {classItem.max_students}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-yoga-500" />
            <span className="font-medium">{classItem.duration_minutes}min</span>
          </div>
        </div>
        
        {classItem.description && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {classItem.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-600 mr-1" />
            <span className="text-2xl font-bold text-gray-900">
              {(classItem.price_cents / 100).toFixed(0)}
            </span>
            <span className="text-sm text-gray-500 ml-1">USD</span>
          </div>
          <Button
            onClick={() => onBookNow(classItem)}
            className="px-6 py-2 font-semibold transition-all duration-200"
            style={{ 
              backgroundColor: instructor.brand_color,
              borderColor: instructor.brand_color 
            }}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicClassCard;
