
import React from 'react';
import { usePublicClasses } from '@/hooks/useClasses';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import StudentBookingFlow from './StudentBookingFlow';
import LoadingStudio from './LoadingStudio';
import StudioNotFound from './StudioNotFound';
import StudioWebsite from './StudioWebsite';

interface PublicStudioViewProps {
  subdomain: string;
}

const PublicStudioView = ({ subdomain }: PublicStudioViewProps) => {
  const { classes, isLoading } = usePublicClasses(subdomain);
  const [selectedClass, setSelectedClass] = React.useState<any>(null);

  console.log('PublicStudioView loaded with:', { subdomain, classes, isLoading });

  if (isLoading) {
    return <LoadingStudio subdomain={subdomain} />;
  }

  // Check if we have any data (instructor exists)
  const instructor = classes.length > 0 ? classes[0].instructors : null;
  
  // If no instructor found, show not found page
  if (!instructor) {
    return <StudioNotFound subdomain={subdomain} />;
  }

  // Filter out the placeholder entry if it exists by checking for the id
  const actualClasses = classes.filter(cls => cls.id !== 'no-classes');

  return (
    <>
      <StudioWebsite 
        instructor={instructor}
        subdomain={subdomain}
        classes={actualClasses}
        onBookClass={setSelectedClass}
      />

      {/* Booking Modal */}
      {selectedClass && (
        <StudentBookingFlow 
          classItem={selectedClass}
          instructor={instructor}
          onClose={() => setSelectedClass(null)}
        />
      )}

      <WhatsAppWidget />
    </>
  );
};

export default PublicStudioView;
