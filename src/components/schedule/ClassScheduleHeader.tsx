
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassScheduleHeaderProps {
  viewMode: 'day' | 'week' | 'month';
  setViewMode: (mode: 'day' | 'week' | 'month') => void;
}

const ClassScheduleHeader = ({ viewMode, setViewMode }: ClassScheduleHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="border-gray-300 text-black hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-black">Class Schedule</h1>
          <p className="text-gray-600 mt-1">Manage your class calendar</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'day' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('day')}
            className={viewMode === 'day' ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}
          >
            Day
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('week')}
            className={viewMode === 'week' ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}
          >
            Week
          </Button>
          <Button
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('month')}
            className={viewMode === 'month' ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}
          >
            Month
          </Button>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Class
        </Button>
      </div>
    </div>
  );
};

export default ClassScheduleHeader;
