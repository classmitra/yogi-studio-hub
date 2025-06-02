
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePublicClasses } from '@/hooks/useClasses';
import { Clock, Users, Calendar, DollarSign, User, MapPin, Star, Award } from 'lucide-react';
import { format } from 'date-fns';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import StudentBookingFlow from './StudentBookingFlow';

interface PublicStudioViewProps {
  subdomain: string;
}

const PublicStudioView = ({ subdomain }: PublicStudioViewProps) => {
  const { classes, isLoading } = usePublicClasses(subdomain);
  const [selectedClass, setSelectedClass] = React.useState<any>(null);

  console.log('PublicStudioView loaded with:', { subdomain, classes, isLoading });

  const instructor = classes.length > 0 ? classes[0].instructors : null;

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yoga-50 to-ocean-50">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-yoga-500 to-ocean-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading studio: {subdomain}...</p>
        </div>
      </div>
    );
  }

  if (!instructor && classes.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yoga-50 to-ocean-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Studio Not Found</h1>
          <p className="text-gray-600 mb-4">
            The studio "{subdomain}" doesn't exist or has no classes available.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">Looking for a specific studio?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check the spelling of the studio name</li>
              <li>• Make sure the studio has published classes</li>
              <li>• Contact the instructor for the correct link</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-yoga-50 to-ocean-50"
      style={{ backgroundColor: instructor.brand_color + '10' }}
    >
      {/* Studio Header */}
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
                  {classes.length} Classes Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Classes</h2>
            <p className="text-gray-600">Book your class and join our yoga community</p>
          </div>
        </div>
        
        {classes.length === 0 ? (
          <Card className="bg-white shadow-lg">
            <CardContent className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Classes Scheduled</h3>
              <p className="text-gray-600 text-lg">Check back soon for upcoming classes or contact the studio directly.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden">
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
                      onClick={() => setSelectedClass(classItem)}
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
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedClass && (
        <StudentBookingFlow 
          classItem={selectedClass}
          instructor={instructor}
          onClose={() => setSelectedClass(null)}
        />
      )}

      <WhatsAppWidget />
    </div>
  );
};

export default PublicStudioView;
