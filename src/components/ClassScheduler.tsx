
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, DollarSign, Video, Save, ArrowLeft } from 'lucide-react';

const ClassScheduler = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    level: '',
    duration: '',
    maxStudents: '',
    price: '',
    date: '',
    time: '',
    recurringType: 'none',
    platform: 'zoom'
  });

  const classTypes = [
    'Hatha Yoga',
    'Vinyasa Flow',
    'Yin Yoga',
    'Restorative Yoga',
    'Hot Yoga',
    'Meditation',
    'Breathwork',
    'Prenatal Yoga',
    'Gentle Yoga',
    'Power Yoga'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  const durations = ['30 minutes', '45 minutes', '60 minutes', '75 minutes', '90 minutes'];

  return (
    <div className="min-h-screen bg-yoga-gradient p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schedule New Class</h1>
              <p className="text-gray-600 mt-1">Create and schedule your yoga session</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Class Details</CardTitle>
                <CardDescription>Fill in the information for your new class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">Class Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Morning Vinyasa Flow"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what students can expect from this class..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Class Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select class type" />
                        </SelectTrigger>
                        <SelectContent>
                          {classTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Level *</Label>
                      <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level.toLowerCase().replace(' ', '-')}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-yoga-600" />
                    Schedule
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="time" className="text-sm font-medium text-gray-700">Start Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Duration *</Label>
                      <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durations.map((duration) => (
                            <SelectItem key={duration} value={duration}>
                              {duration}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Class Settings */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-yoga-600" />
                    Class Settings
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="maxStudents" className="text-sm font-medium text-gray-700">Max Students</Label>
                      <Input
                        id="maxStudents"
                        type="number"
                        placeholder="15"
                        value={formData.maxStudents}
                        onChange={(e) => setFormData({...formData, maxStudents: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price" className="text-sm font-medium text-gray-700">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="25"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">Platform</Label>
                      <Select value={formData.platform} onValueChange={(value) => setFormData({...formData, platform: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zoom">Zoom</SelectItem>
                          <SelectItem value="google-meet">Google Meet</SelectItem>
                          <SelectItem value="in-person">In-Person</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                  <Button className="bg-yoga-600 hover:bg-yoga-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Schedule Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Tips */}
          <div className="space-y-6">
            {/* Class Preview */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Preview</CardTitle>
                <CardDescription>How your class will appear to students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yoga-50 p-4 rounded-lg border border-yoga-100">
                    <h3 className="font-semibold text-gray-900">{formData.title || 'Class Title'}</h3>
                    <p className="text-sm text-gray-600 mt-1">{formData.description || 'Class description will appear here...'}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formData.duration || '60 minutes'}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {formData.maxStudents || '15'} spots
                        </div>
                      </div>
                      <div className="text-yoga-600 font-semibold">
                        ${formData.price || '25'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-ocean-50 to-yoga-50 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">💡 Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-700">
                  <strong>Clear Titles:</strong> Use descriptive names that tell students exactly what to expect.
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Detailed Descriptions:</strong> Include props needed, class intensity, and what students will learn.
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Optimal Timing:</strong> Consider your audience's time zones and schedules.
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Fair Pricing:</strong> Research similar classes to price competitively.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassScheduler;
