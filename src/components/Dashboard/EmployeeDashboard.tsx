
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  User, 
  CheckSquare,
  LogOut 
} from 'lucide-react';
import EnhancedSeatBooking from '@/components/Booking/EnhancedSeatBooking';
import EnhancedIncidentReporting from '@/components/Employee/EnhancedIncidentReporting';
import TimesheetTracking from '@/components/Employee/TimesheetTracking';

const EmployeeDashboard = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
            <p className="text-gray-600">Welcome back, {currentUser?.displayName || currentUser?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="booking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="booking" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Seat Booking</span>
            </TabsTrigger>
            <TabsTrigger value="timesheet" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Timesheet</span>
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Incidents</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <CheckSquare className="h-4 w-4" />
              <span>My Tasks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking">
            <EnhancedSeatBooking />
          </TabsContent>

          <TabsContent value="timesheet">
            <TimesheetTracking />
          </TabsContent>

          <TabsContent value="incidents">
            <EnhancedIncidentReporting />
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckSquare className="h-5 w-5" />
                  <span>My Assigned Tasks</span>
                </CardTitle>
                <CardDescription>Tasks assigned to you by admin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">Task tracking feature coming soon...</p>
                  <p className="text-sm text-gray-400 mt-2">You'll be able to view and update your assigned tasks here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
