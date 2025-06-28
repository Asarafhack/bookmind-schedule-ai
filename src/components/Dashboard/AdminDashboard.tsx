
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  Users, 
  AlertTriangle, 
  CheckSquare,
  Clock,
  LogOut 
} from 'lucide-react';
import BookingManagement from '@/components/Admin/BookingManagement';
import IncidentManagement from '@/components/Admin/IncidentManagement';
import TaskManagement from '@/components/Admin/TaskManagement';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentUser?.displayName || currentUser?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Seat Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Incidents</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <CheckSquare className="h-4 w-4" />
              <span>Task Management</span>
            </TabsTrigger>
            <TabsTrigger value="timesheets" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Timesheets</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <BookingManagement />
          </TabsContent>

          <TabsContent value="incidents">
            <IncidentManagement />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManagement />
          </TabsContent>

          <TabsContent value="timesheets">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Timesheet Management</h2>
              <p className="text-gray-500">Timesheet approval feature coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
