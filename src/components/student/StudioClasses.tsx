
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Mail, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface StudioClassesProps {
  classes: any[];
  instructor: any;
  onBookClass: (classItem: any) => void;
  onScrollToContact: () => void;
}

const StudioClasses = ({ classes, instructor, onBookClass, onScrollToContact }: StudioClassesProps) => {
  return (
    <section id="classes-section" className="py-32 px-8 section-light-gray" data-section="light-gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 fade-in-minimal">
          <h2 className="text-6xl md:text-7xl font-dongle font-normal text-black mb-8 leading-none">
            Available
            <br />
            <span className="text-4xl md:text-5xl opacity-60">Classes</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Choose from our classes and start your practice today
          </p>
        </div>
        
        {classes.length === 0 ? (
          <Card className="border border-black/10 bg-white slide-up-minimal">
            <CardContent className="text-center py-24">
              <div className="mb-12">
                <div className="w-16 h-16 border border-black/20 flex items-center justify-center mx-auto mb-8">
                  <Calendar className="h-8 w-8 text-black/60" />
                </div>
              </div>
              <h3 className="text-4xl font-dongle font-normal text-black mb-6">New Classes Coming Soon</h3>
              <p className="text-black/70 text-lg mb-12 max-w-md mx-auto leading-relaxed font-light tracking-wide">
                We're preparing new classes for you. Check back soon or get in touch to be notified.
              </p>
              {instructor?.contact_email && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={onScrollToContact}
                  className="border border-black bg-transparent text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-light tracking-wide transition-all duration-500"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Get Notified
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {classes.map((classItem, index) => (
              <div 
                key={classItem.id} 
                className="stagger-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="border border-black/10 bg-white minimal-hover">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <Badge variant="secondary" className="bg-transparent border border-black/20 text-black/70 font-light text-xs tracking-wide">
                        {classItem.category}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-dongle font-normal text-black mb-4 tracking-wide">{classItem.title}</h3>
                    <p className="text-black/70 text-sm mb-6 font-light tracking-wide leading-relaxed">{classItem.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-sm text-black/60 font-light tracking-wide">
                        <Clock className="h-4 w-4 mr-3" />
                        {classItem.duration_minutes} minutes
                      </div>
                      <div className="flex items-center text-sm text-black/60 font-light tracking-wide">
                        <Users className="h-4 w-4 mr-3" />
                        {classItem.max_students} students max
                      </div>
                      <div className="flex items-center text-sm text-black/60 font-light tracking-wide">
                        <Calendar className="h-4 w-4 mr-3" />
                        {format(new Date(classItem.start_date), 'MMM dd, yyyy')}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => onBookClass(classItem)}
                      className="w-full minimal-button h-12 font-light tracking-wide"
                    >
                      Book Class
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StudioClasses;
