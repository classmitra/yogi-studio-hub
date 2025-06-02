
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import PublicClassCard from './PublicClassCard';

interface ClassesGridProps {
  classes: any[];
  instructor: any;
  onBookNow: (classItem: any) => void;
}

const ClassesGrid = ({ classes, instructor, onBookNow }: ClassesGridProps) => {
  if (classes.length === 0) {
    return (
      <Card className="bg-white shadow-lg">
        <CardContent className="text-center py-16">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No Classes Scheduled</h3>
          <p className="text-gray-600 text-lg">Check back soon for upcoming classes or contact the studio directly.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {classes.map((classItem) => (
        <PublicClassCard
          key={classItem.id}
          classItem={classItem}
          instructor={instructor}
          onBookNow={onBookNow}
        />
      ))}
    </div>
  );
};

export default ClassesGrid;
