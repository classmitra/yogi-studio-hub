
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, DollarSign, Calendar, Star } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    { action: "New soul joined the community", time: "2 minutes ago", type: "success", icon: Heart },
    { action: "Sacred offering received - $25", time: "15 minutes ago", type: "success", icon: DollarSign },
    { action: "Gentle reminder sent to souls", time: "1 hour ago", type: "info", icon: Calendar },
    { action: "Beautiful feedback received", time: "2 hours ago", type: "info", icon: Star }
  ];

  return (
    <Card className="border border-black/10 bg-white slide-up-minimal" style={{ animationDelay: '0.4s' }}>
      <CardHeader>
        <CardTitle className="text-2xl font-dongle font-normal text-black tracking-wide">Sacred Energy Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 stagger-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="w-10 h-10 border border-black/20 flex items-center justify-center">
                <activity.icon className="w-5 h-5 text-black/60" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-light text-black tracking-wide">{activity.action}</p>
                <p className="text-xs text-black/50 font-light tracking-wide">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
