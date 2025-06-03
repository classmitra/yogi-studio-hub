
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Eye,
  Download,
  FileSpreadsheet,
  FileText,
  Clock,
  Heart,
  Star,
  Target,
  Award,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';

const Analytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const { metrics, revenueTrend, studentGrowth, classPerformance, isLoading } = useAnalytics();

  const metricsData = [
    {
      title: "Total Revenue",
      value: metrics ? `$${(metrics.total_revenue / 100).toFixed(0)}` : "$0",
      change: "+23%", // This could be calculated from historical data
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Active Students",
      value: metrics?.total_students?.toString() || "0",
      change: "+12%",
      trend: "up",
      icon: Users
    },
    {
      title: "Classes Taught",
      value: metrics?.total_classes?.toString() || "0",
      change: "+8%",
      trend: "up",
      icon: Calendar
    },
    {
      title: "Average Rating",
      value: metrics?.avg_rating?.toString() || "0",
      change: "+0.1",
      trend: "up",
      icon: Star
    }
  ];

  const growthMetrics = [
    { key: 'revenue', label: 'Revenue Growth', icon: DollarSign, color: '#10b981' },
    { key: 'students', label: 'Student Growth', icon: Users, color: '#3b82f6' },
    { key: 'classes', label: 'Classes Taught', icon: Calendar, color: '#8b5cf6' },
    { key: 'retention', label: 'Student Retention', icon: Heart, color: '#ef4444' },
    { key: 'rating', label: 'Average Rating', icon: Star, color: '#f59e0b' },
    { key: 'bookings', label: 'Booking Rate', icon: Target, color: '#06b6d4' },
    { key: 'completion', label: 'Class Completion', icon: Award, color: '#84cc16' },
    { key: 'engagement', label: 'Student Engagement', icon: Activity, color: '#f97316' },
    { key: 'sessions', label: 'Session Duration', icon: Clock, color: '#6366f1' },
    { key: 'referrals', label: 'Referral Rate', icon: TrendingUp, color: '#ec4899' }
  ];

  const getChartData = () => {
    switch (selectedMetric) {
      case 'revenue':
        return revenueTrend || [];
      case 'students':
        return studentGrowth || [];
      default:
        return revenueTrend || [];
    }
  };

  const exportToExcel = () => {
    // Create CSV content
    const csvContent = [
      ['Metric', 'Value', 'Change'],
      ...metricsData.map(m => [m.title, m.value, m.change]),
      [],
      ['Class Performance'],
      ['Class Name', 'Students', 'Revenue'],
      ...(classPerformance || []).map(c => [c.name, c.students, c.revenue])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yoga-studio-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Analytics data exported to Excel format.",
    });
  };

  const exportToPDF = () => {
    // Create a simple HTML content for PDF
    const htmlContent = `
      <html>
        <head><title>Yoga Studio Analytics Report</title></head>
        <body>
          <h1>Yoga Studio Analytics Report</h1>
          <h2>Key Metrics</h2>
          <table border="1">
            <tr><th>Metric</th><th>Value</th><th>Change</th></tr>
            ${metricsData.map(m => `<tr><td>${m.title}</td><td>${m.value}</td><td>${m.change}</td></tr>`).join('')}
          </table>
          <h2>Class Performance</h2>
          <table border="1">
            <tr><th>Class Name</th><th>Students</th><th>Revenue</th></tr>
            ${(classPerformance || []).map(c => `<tr><td>${c.name}</td><td>${c.students}</td><td>${c.revenue}</td></tr>`).join('')}
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();

    toast({
      title: "PDF Export",
      description: "PDF report opened in new window for printing/saving.",
    });
  };

  const chartConfig = {
    value: {
      label: "Value",
      color: growthMetrics.find(m => m.key === selectedMetric)?.color || "#10b981",
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your studio's performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              Back to Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={exportToExcel}
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button 
              variant="outline"
              onClick={exportToPDF}
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-black">{metric.value}</p>
                    <p className="text-sm text-green-600 font-medium flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {metric.change} from last month
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gray-100">
                    <metric.icon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="growth">Growth Trends</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-black">Class Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  {!classPerformance || classPerformance.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No class data available yet</p>
                      <p className="text-sm text-gray-400">Create classes to see performance metrics</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {classPerformance.slice(0, 5).map((classItem, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-black">{classItem.name}</h4>
                            <p className="text-sm text-gray-600">{classItem.students} students</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-black">{classItem.revenue}</p>
                            <p className="text-sm text-gray-600">Revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-black">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueTrend || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ fill: "#10b981" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="growth">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-black">Growth Trends</CardTitle>
                <p className="text-sm text-gray-600">Select a metric to view detailed growth trends</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {growthMetrics.map((metric) => (
                    <Button
                      key={metric.key}
                      variant={selectedMetric === metric.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMetric(metric.key)}
                      className={`flex flex-col items-center p-3 h-auto ${
                        selectedMetric === metric.key 
                          ? 'bg-black text-white' 
                          : 'border-gray-300 text-black hover:bg-gray-50'
                      }`}
                    >
                      <metric.icon className="h-4 w-4 mb-1" />
                      <span className="text-xs text-center">{metric.label}</span>
                    </Button>
                  ))}
                </div>
                
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="value" 
                        fill={growthMetrics.find(m => m.key === selectedMetric)?.color || "#10b981"}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-black">Student Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentGrowth || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
