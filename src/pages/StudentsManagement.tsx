
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  Calendar,
  MoreVertical,
  UserPlus,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentsManagement = () => {
  const navigate = useNavigate();

  const students = [
    {
      id: 1,
      name: "Emma Johnson",
      email: "emma.johnson@email.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2024-01-15",
      classesAttended: 24,
      status: "Active"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 987-6543",
      joinDate: "2024-02-20",
      classesAttended: 18,
      status: "Active"
    },
    {
      id: 3,
      name: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "+1 (555) 456-7890",
      joinDate: "2024-03-10",
      classesAttended: 12,
      status: "Inactive"
    }
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Students Management</h1>
            <p className="text-gray-600 mt-1">Manage your student community</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              Back to Dashboard
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="border border-gray-200 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search students by name or email..." 
                  className="pl-10 border-gray-300 focus:border-black focus:ring-black"
                />
              </div>
              <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-black flex items-center">
              <Users className="h-5 w-5 mr-2" />
              All Students ({students.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">{student.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-1" />
                          {student.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1" />
                          {student.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Classes</p>
                      <p className="text-lg font-bold text-black">{student.classesAttended}</p>
                    </div>
                    <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                      {student.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="border-gray-300">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentsManagement;
