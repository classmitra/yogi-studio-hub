
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface DashboardStatsProps {
  classes: any[];
}

const DashboardStats = ({ classes }: DashboardStatsProps) => {
  const { metrics, isLoading } = useAnalytics();

  const stats = [
    {
      title: "Students",
      value: metrics?.total_students?.toString() || "0",
      change: "+12%",
      icon: Users,
    },
    {
      title: "Monthly Revenue",
      value: metrics ? `$${(metrics.total_revenue / 100).toFixed(0)}` : "$0",
      change: "+23%",
      icon: DollarSign,
    },
    {
      title: "Active Classes",
      value: metrics?.total_classes?.toString() || "0",
      change: "+2",
      icon: Calendar,
    },
    {
      title: "Average Rating",
      value: metrics?.avg_rating?.toString() || "0.0",
      change: "+0.1",
      icon: TrendingUp,
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[1, 2, 3, 4].map((index) => (
          <Card 
            key={index} 
            className="border border-black/10 bg-white minimal-hover"
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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
