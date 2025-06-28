
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  Users, 
  AlertTriangle, 
  CheckSquare,
  Clock,
  BarChart3,
  TrendingUp,
  UserCheck,
  Settings
} from 'lucide-react';
import BookingManagement from '@/components/Admin/BookingManagement';
import IncidentManagement from '@/components/Admin/IncidentManagement';
import TaskManagement from '@/components/Admin/TaskManagement';
import ProfessionalHeader from '@/components/Layout/ProfessionalHeader';
import ProfessionalFooter from '@/components/Layout/ProfessionalFooter';
import { professionalBackgrounds, getRandomBackground } from '@/data/backgrounds';

const EnhancedAdminDashboard = () => {
  const { currentUser } = useAuth();
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setBackgroundImage(getRandomBackground(professionalBackgrounds));
  }, []);

  const adminStats = [
    { label: 'Total Employees', value: '156', icon: Users, color: 'text-blue-600', change: '+12' },
    { label: 'Active Bookings', value: '89', icon: Calendar, color: 'text-green-600', change: '+5' },
    { label: 'Open Incidents', value: '7', icon: AlertTriangle, color: 'text-red-600', change: '-3' },
    { label: 'Pending Tasks', value: '23', icon: CheckSquare, color: 'text-purple-600', change: '+8' }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`
      }}
    >
      <ProfessionalHeader 
        title="Admin Dashboard" 
        subtitle={`System Administrator - ${currentUser?.displayName || currentUser?.email}`}
        userRole="admin"
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>System Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">System Health</h3>
                    <p className="text-sm text-gray-600">All systems operational</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Active Users</h3>
                    <p className="text-sm text-gray-600">89% engagement rate</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                    <p className="text-sm text-gray-600">Avg: 2.3 seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Background Selector */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Admin Theme</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 overflow-x-auto">
              {professionalBackgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => setBackgroundImage(bg)}
                  className={`flex-shrink-0 w-20 h-12 rounded-lg bg-cover bg-center border-2 transition-all hover:scale-105 ${
                    backgroundImage === bg ? 'border-purple-500 shadow-lg' : 'border-gray-300'
                  }`}
                  style={{ backgroundImage: `url(${bg})` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              <TabsTrigger 
                value="bookings" 
                className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Seat Bookings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="incidents" 
                className="flex items-center space-x-2 data-[state=active]:bg-red-500 data-[state=active]:text-white"
              >
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Incidents</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tasks" 
                className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Task Management</span>
              </TabsTrigger>
              <TabsTrigger 
                value="timesheets" 
                className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">Timesheets</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="bookings">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <BookingManagement />
            </div>
          </TabsContent>

          <TabsContent value="incidents">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <IncidentManagement />
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
              <TaskManagement />
            </div>
          </TabsContent>

          <TabsContent value="timesheets">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-4">Timesheet Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-8">
                    <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">Advanced Timesheet Management</p>
                    <p className="text-sm text-gray-500 mt-2">Comprehensive timesheet approval and analytics coming soon...</p>
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

export default EnhancedAdminDashboard;
