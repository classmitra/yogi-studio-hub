
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Video } from 'lucide-react';

interface ClassCardProps {
  classItem: any;
}

const ClassCard = ({ classItem }: ClassCardProps) => (
  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-semibold text-black">{classItem.title}</h3>
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
        {classItem.category}
      </Badge>
    </div>
    <div className="space-y-2">
      <div className="flex items-center text-sm text-gray-600">
        <Clock className="h-4 w-4 mr-2" />
        {classItem.start_time} ({classItem.duration_minutes} min)
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Users className="h-4 w-4 mr-2" />
        0/{classItem.max_students} students
      </div>
      {classItem.description && (
        <div className="text-sm text-gray-600">
          {classItem.description}
        </div>
      )}
    </div>
    <div className="flex items-center space-x-2 mt-4">
      <Button variant="outline" size="sm" className="flex-1 border-gray-300">
        Edit
      </Button>
      <Button size="sm" className="flex-1 bg-black hover:bg-gray-800 text-white">
        <Video className="h-4 w-4 mr-1" />
        Start
      </Button>
    </div>
  </div>
);

export default ClassCard;
