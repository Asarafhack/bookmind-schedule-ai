
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, Play, Square, Calendar } from 'lucide-react';
import { createTimesheet, getTimesheets, updateTimesheet } from '@/services/firebaseService';
import { Timesheet } from '@/types/booking';

const TimesheetTracking = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [activeTimesheet, setActiveTimesheet] = useState<Timesheet | null>(null);
  const [cheatCode, setCheatCode] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('bangalore');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadTimesheets();
    }
  }, [currentUser]);

  const loadTimesheets = async () => {
    try {
      const data = await getTimesheets(currentUser?.uid);
      setTimesheets(data);
      const active = data.find(ts => ts.status === 'active');
      setActiveTimesheet(active || null);
    } catch (error) {
      console.error('Error loading timesheets:', error);
    }
  };

  const handleCheckIn = async () => {
    if (activeTimesheet) {
      toast({
        title: "Already Checked In",
        description: "You are already checked in. Please check out first.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const timesheet: Omit<Timesheet, 'id' | 'createdAt' | 'updatedAt'> = {
        employeeId: currentUser?.uid || '',
        employeeName: currentUser?.displayName || currentUser?.email || '',
        locationId: selectedLocation,
        date: new Date().toISOString().split('T')[0],
        checkIn: new Date().toLocaleTimeString(),
        status: 'active'
      };

      if (cheatCode.trim()) {
        timesheet.cheatCode = cheatCode.trim();
      }

      await createTimesheet(timesheet);
      
      toast({
        title: "Checked In",
        description: "You have successfully checked in for today",
      });

      setCheatCode('');
      loadTimesheets();
    } catch (error) {
      console.error('Error checking in:', error);
      toast({
        title: "Error",
        description: "Failed to check in",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!activeTimesheet) {
      toast({
        title: "Not Checked In",
        description: "You need to check in first before checking out.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const checkOutTime = new Date().toLocaleTimeString();
      const checkInTime = new Date(`1970-01-01 ${activeTimesheet.checkIn}`);
      const checkOutTimeObj = new Date(`1970-01-01 ${checkOutTime}`);
      const workingHours = (checkOutTimeObj.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

      await updateTimesheet(activeTimesheet.id, {
        checkOut: checkOutTime,
        workingHours: Math.max(0, workingHours),
        status: 'completed'
      });

      toast({
        title: "Checked Out",
        description: `You have worked for ${workingHours.toFixed(2)} hours today`,
      });

      loadTimesheets();
    } catch (error) {
      console.error('Error checking out:', error);
      toast({
        title: "Error",
        description: "Failed to check out",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return '';
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Check In/Out Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Time Tracking</span>
          </CardTitle>
          <CardDescription>
            Track your daily work hours with check-in and check-out
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeTimesheet ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800">Currently Checked In</h3>
                  <p className="text-green-600">
                    Started at: {activeTimesheet.checkIn} | Location: {activeTimesheet.locationId}
                  </p>
                  {activeTimesheet.cheatCode && (
                    <p className="text-xs text-green-600">Code: {activeTimesheet.cheatCode}</p>
                  )}
                </div>
                <Button 
                  onClick={handleCheckOut}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Square className="h-4 w-4 mr-2" />
                  {loading ? 'Checking Out...' : 'Check Out'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="bangalore">Bangalore</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="chennai">Chennai</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Cheat Code (Optional)</label>
                  <input
                    type="text"
                    value={cheatCode}
                    onChange={(e) => setCheatCode(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter cheat code"
                  />
                </div>
              </div>
              <Button 
                onClick={handleCheckIn}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 mr-2" />
                {loading ? 'Checking In...' : 'Check In'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timesheet History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>My Timesheet History</span>
          </CardTitle>
          <CardDescription>View your daily work hour records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timesheets.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No timesheet records found</p>
            ) : (
              timesheets.map((timesheet) => (
                <div key={timesheet.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{timesheet.date}</h4>
                      <p className="text-sm text-gray-600">
                        Location: {timesheet.locationId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Check-in: {timesheet.checkIn}
                        {timesheet.checkOut && ` | Check-out: ${timesheet.checkOut}`}
                      </p>
                      {timesheet.workingHours && (
                        <p className="text-sm text-blue-600 font-medium">
                          Working Hours: {timesheet.workingHours.toFixed(2)} hrs
                        </p>
                      )}
                      {timesheet.cheatCode && (
                        <p className="text-xs text-gray-500">
                          Code: {timesheet.cheatCode}
                        </p>
                      )}
                    </div>
                    <Badge className={getStatusColor(timesheet.status)}>
                      {timesheet.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimesheetTracking;
