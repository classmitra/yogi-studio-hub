
import React from 'react';
import { Star, User, MapPin, Calendar } from 'lucide-react';

interface StudioHeaderProps {
  instructor: any;
  subdomain: string;
  classCount: number;
}

const StudioHeader = ({ instructor, subdomain, classCount }: StudioHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          {instructor.profile_image_url && (
            <div className="relative">
              <img
                src={instructor.profile_image_url}
                alt={instructor.studio_name}
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
              />
              <div 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: instructor.brand_color }}
              >
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ color: instructor.brand_color }}>
              {instructor.studio_name}
            </h1>
            {instructor.bio && (
              <p className="text-gray-600 text-lg leading-relaxed mb-4 max-w-3xl">{instructor.bio}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <User className="h-4 w-4 mr-2" />
                {subdomain}.yogastudio.app
              </span>
              <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <MapPin className="h-4 w-4 mr-2" />
                Online Classes
              </span>
              <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                {classCount} Classes Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioHeader;
