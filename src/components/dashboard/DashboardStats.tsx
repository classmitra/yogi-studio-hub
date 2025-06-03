
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  classes: any[];
}

const DashboardStats = ({ classes }: DashboardStatsProps) => {
  const stats = [
    {
      title: "Students",
      value: "247",
      change: "+12%",
      icon: Users,
    },
    {
      title: "Monthly Revenue",
      value: "$3,240",
      change: "+23%",
      icon: DollarSign,
    },
    {
      title: "Weekly Classes",
      value: classes.length.toString(),
      change: "+2",
      icon: Calendar,
    },
    {
      title: "Student Rating",
      value: "4.9",
      change: "+0.1",
      icon: TrendingUp,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="border border-black/10 bg-white minimal-hover stagger-in group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-light text-black/60 mb-2 tracking-wide">{stat.title}</p>
                <p className="text-4xl font-dongle font-normal text-black">{stat.value}</p>
                <p className="text-sm text-black/70 font-light mt-2 tracking-wide">{stat.change} this month</p>
              </div>
              <div className="w-12 h-12 border border-black/20 flex items-center justify-center group-hover:border-black/60 transition-all duration-500">
                <stat.icon className="h-6 w-6 text-black/60" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
