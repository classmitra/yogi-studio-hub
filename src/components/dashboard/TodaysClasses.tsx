
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MessageCircle, Video, Heart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TodaysClassesProps {
  classes: any[];
  classesLoading: boolean;
  todaysClasses: any[];
}

const TodaysClasses = ({ classes, classesLoading, todaysClasses }: TodaysClassesProps) => {
  const navigate = useNavigate();

  return (
    <Card className="border border-black/10 bg-white slide-up-minimal" style={{ animationDelay: '0.2s' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-dongle font-normal text-black tracking-wide">Today's Sacred Offerings</CardTitle>
            <CardDescription className="text-black/70 text-lg font-light tracking-wide">Nurture your scheduled soul sessions</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500 font-light tracking-wide"
            onClick={() => navigate('/class-schedule')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Sacred Calendar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {classesLoading ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border border-black/20 flex items-center justify-center mx-auto mb-6">
              <div className="w-5 h-5 border border-black border-t-transparent animate-spin"></div>
            </div>
            <p className="text-black/70 font-light tracking-wide">Loading sacred offerings...</p>
          </div>
        ) : todaysClasses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border border-black/20 flex items-center justify-center mx-auto mb-8">
              <Heart className="h-8 w-8 text-black/60" />
            </div>
            <p className="text-black/70 text-lg mb-8 font-light tracking-wide">A peaceful day with no scheduled offerings</p>
            <Button 
              onClick={() => navigate('/class-schedule')}
              className="minimal-button px-6 py-3 font-light tracking-wide"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Sacred Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {todaysClasses.map((classItem, index) => (
              <div 
                key={classItem.id} 
                className="flex items-center justify-between p-8 bg-gray-50 border border-black/10 minimal-hover stagger-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-sm font-light text-black/60 tracking-wide">SACRED TIME</p>
                    <p className="text-2xl font-dongle font-normal text-black">{classItem.start_time}</p>
                  </div>
                  <div>
                    <h3 className="font-dongle text-2xl font-normal text-black tracking-wide">{classItem.title}</h3>
                    <div className="flex items-center space-x-8 mt-3">
                      <div className="flex items-center text-sm text-black/70 font-light tracking-wide">
                        <Clock className="h-4 w-4 mr-2" />
                        {classItem.duration_minutes} sacred minutes
                      </div>
                      <div className="flex items-center text-sm text-black/70 font-light tracking-wide">
                        <Users className="h-4 w-4 mr-2" />
                        0/{classItem.max_students} souls
                      </div>
                      <Badge variant="secondary" className="bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                        {classItem.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" className="border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="minimal-button font-light tracking-wide">
                    Begin Sacred Space
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysClasses;
