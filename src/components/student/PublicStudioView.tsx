
import React from 'react';
import { usePublicClasses } from '@/hooks/useClasses';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import StudentBookingFlow from './StudentBookingFlow';
import LoadingStudio from './LoadingStudio';
import StudioNotFound from './StudioNotFound';
import StudioHeader from './StudioHeader';
import ClassesGrid from './ClassesGrid';

interface PublicStudioViewProps {
  subdomain: string;
}

const PublicStudioView = ({ subdomain }: PublicStudioViewProps) => {
  const { classes, isLoading } = usePublicClasses(subdomain);
  const [selectedClass, setSelectedClass] = React.useState<any>(null);

  console.log('PublicStudioView loaded with:', { subdomain, classes, isLoading });

  const instructor = classes.length > 0 ? classes[0].instructors : null;

  if (isLoading) {
    return <LoadingStudio subdomain={subdomain} />;
  }

  if (!instructor && classes.length === 0) {
    return <StudioNotFound subdomain={subdomain} />;
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-yoga-50 to-ocean-50"
      style={{ backgroundColor: instructor.brand_color + '10' }}
    >
      <StudioHeader 
        instructor={instructor} 
        subdomain={subdomain} 
        classCount={classes.length} 
      />

      {/* Classes Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Classes</h2>
            <p className="text-gray-600">Book your class and join our yoga community</p>
          </div>
        </div>
        
        <ClassesGrid 
          classes={classes} 
          instructor={instructor} 
          onBookNow={setSelectedClass} 
        />
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
