
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  User, 
  CheckSquare,
  TrendingUp,
  Award,
  Target,
  Activity,
  Settings
} from 'lucide-react';
import EnhancedSeatBooking from '@/components/Booking/EnhancedSeatBooking';
import EnhancedIncidentReporting from '@/components/Employee/EnhancedIncidentReporting';
import TimesheetTracking from '@/components/Employee/TimesheetTracking';
import ProfessionalHeader from '@/components/Layout/ProfessionalHeader';
import ProfessionalFooter from '@/components/Layout/ProfessionalFooter';
import { professionalBackgrounds, getRandomBackground } from '@/data/backgrounds';

const EnhancedEmployeeDashboard = () => {
  const { currentUser } = useAuth();
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(getRandomBackground(professionalBackgrounds));
  }, []);

  const stats = [
    { label: 'Bookings This Month', value: '12', icon: Calendar, color: 'text-blue-600' },
    { label: 'Working Hours', value: '160h', icon: Clock, color: 'text-green-600' },
    { label: 'Tasks Completed', value: '8', icon: CheckSquare, color: 'text-purple-600' },
    { label: 'Incidents Reported', value: '2', icon: AlertTriangle, color: 'text-orange-600' }
  ];

  const achievements = [
    { title: 'Perfect Attendance', description: 'No missed days this month', icon: Award },
    { title: 'Early Bird', description: 'Consistently on time', icon: Target },
    { title: 'Team Player', description: 'Helped 5+ colleagues', icon: Activity }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`
      }}
    >
      <ProfessionalHeader 
        title="Employee Dashboard" 
        subtitle={`Welcome back, ${currentUser?.displayName || currentUser?.email}`}
        userRole="employee"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <achievement.icon className="h-6 w-6 text-yellow-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Background Selector */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Customize Background</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 overflow-x-auto">
              {professionalBackgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => setBackgroundImage(bg)}
                  className={`flex-shrink-0 w-20 h-12 rounded-lg bg-cover bg-center border-2 transition-all hover:scale-105 ${
                    backgroundImage === bg ? 'border-blue-500 shadow-lg' : 'border-gray-300'
                  }`}
                  style={{ backgroundImage: `url(${bg})` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="booking" className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              <TabsTrigger 
                value="booking" 
                className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Seat Booking</span>
              </TabsTrigger>
              <TabsTrigger 
                value="timesheet" 
                className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Timesheet</span>
              </TabsTrigger>
              <TabsTrigger 
                value="incidents" 
                className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Incidents</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">My Tasks</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="booking">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <EnhancedSeatBooking />
            </div>
          </TabsContent>

          <TabsContent value="timesheet">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <TimesheetTracking />
            </div>
          </TabsContent>

          <TabsContent value="incidents">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <EnhancedIncidentReporting />
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckSquare className="h-5 w-5" />
                  <span>My Assigned Tasks</span>
                </CardTitle>
                <CardDescription>Tasks assigned to you by admin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8">
                    <CheckSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">Task Management Coming Soon</p>
                    <p className="text-sm text-gray-500 mt-2">You'll be able to view and update your assigned tasks here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <ProfessionalFooter />
    </div>
  );
};

export default EnhancedEmployeeDashboard;
