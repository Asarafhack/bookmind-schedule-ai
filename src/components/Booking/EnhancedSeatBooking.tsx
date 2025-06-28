import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MapPin, User, Code } from 'lucide-react';
import { locations, cheatCodes } from '@/data/locations';
import { createBookingRequest, getBookingRequests } from '@/services/firebaseService';
import { SeatBookingRequest, Seat } from '@/types/booking';

const EnhancedSeatBooking = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [cheatCode, setCheatCode] = useState('');
  const [myBookings, setMyBookings] = useState<SeatBookingRequest[]>([]);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '09:00-12:00', '12:00-15:00', '15:00-18:00', '09:00-18:00'
  ];

  const seats: Seat[] = [
    { id: 'A1', number: 'A1', locationId: selectedLocation, floor: '1st Floor', area: 'Open Space', status: 'available', amenities: ['WiFi', 'Power'] },
    { id: 'A2', number: 'A2', locationId: selectedLocation, floor: '1st Floor', area: 'Open Space', status: 'available', amenities: ['WiFi', 'Power'] },
    { id: 'B1', number: 'B1', locationId: selectedLocation, floor: '2nd Floor', area: 'Quiet Zone', status: 'available', amenities: ['WiFi', 'Power', 'AC'] },
    { id: 'B2', number: 'B2', locationId: selectedLocation, floor: '2nd Floor', area: 'Quiet Zone', status: 'available', amenities: ['WiFi', 'Power', 'AC'] },
    { id: 'C1', number: 'C1', locationId: selectedLocation, floor: '3rd Floor', area: 'Collaboration', status: 'available', amenities: ['WiFi', 'Power', 'Whiteboard'] },
    { id: 'C2', number: 'C2', locationId: selectedLocation, floor: '3rd Floor', area: 'Collaboration', status: 'available', amenities: ['WiFi', 'Power', 'Whiteboard'] }
  ];

  useEffect(() => {
    if (currentUser) {
      loadMyBookings();
    }
  }, [currentUser]);

  const loadMyBookings = async () => {
    try {
      const bookings = await getBookingRequests(currentUser?.uid);
      setMyBookings(bookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const handleBookSeat = async () => {
    if (!selectedLocation || !selectedDate || !selectedTime || !selectedSeat) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const bookingRequest: Omit<SeatBookingRequest, 'id' | 'createdAt' | 'updatedAt'> = {
        employeeId: currentUser?.uid || '',
        employeeName: currentUser?.displayName || currentUser?.email || '',
        employeeEmail: currentUser?.email || '',
        seatId: selectedSeat,
        locationId: selectedLocation,
        date: selectedDate,
        timeSlot: selectedTime,
        status: 'pending'
      };

      // Only add cheatCode if it's not empty
      if (cheatCode.trim()) {
        bookingRequest.cheatCode = cheatCode.trim();
      }

      await createBookingRequest(bookingRequest);
      
      setShowBookingDialog(true);
      resetForm();
      loadMyBookings();
      
      toast({
        title: "Booking Request Submitted",
        description: "Your seat booking request is pending admin approval",
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedLocation('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedTime('');
    setSelectedSeat('');
    setCheatCode('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
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

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="space-y-6">
      {/* Location Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Select Office Location</span>
          </CardTitle>
          <CardDescription>Choose your preferred office location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                  selectedLocation === location.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedLocation(location.id)}
              >
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-3 text-white">
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm opacity-90">{location.code}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      {selectedLocation && (
        <Card>
          <CardHeader>
            <CardTitle>Book Your Seat - {selectedLocationData?.name}</CardTitle>
            <CardDescription>Select date, time, and seat for your booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Date</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cheat Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>Cheat Code (Optional)</span>
              </label>
              <input
                type="text"
                value={cheatCode}
                onChange={(e) => setCheatCode(e.target.value)}
                placeholder="Enter cheat code (e.g., bm0123)"
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="text-xs text-gray-500 space-y-1">
                <p>Available codes:</p>
                {cheatCodes.map((code) => (
                  <p key={code.code}>
                    <code className="bg-gray-100 px-1 rounded">{code.code}</code> - {code.description}
                  </p>
                ))}
              </div>
            </div>

            {/* Seat Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Seats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seats.map((seat) => (
                  <div
                    key={seat.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedSeat === seat.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedSeat(seat.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">Seat {seat.number}</h4>
                      <Badge className="bg-green-100 text-green-800">Available</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{seat.floor}</p>
                    <p className="text-sm text-gray-600">{seat.area}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {seat.amenities.map((amenity) => (
                        <span key={amenity} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleBookSeat} 
              disabled={loading || !selectedSeat}
              className="w-full"
            >
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* My Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>My Booking Requests</span>
          </CardTitle>
          <CardDescription>Track your seat booking requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No booking requests found</p>
            ) : (
              myBookings.map((booking) => (
                <div key={booking.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">
                        Seat {booking.seatId} - {locations.find(l => l.id === booking.locationId)?.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {booking.date} | {booking.timeSlot}
                      </p>
                      {booking.cheatCode && (
                        <p className="text-xs text-blue-600">
                          Cheat Code: {booking.cheatCode}
                        </p>
                      )}
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  {booking.reason && (
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Reason:</strong> {booking.reason}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Booking Confirmation Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Request Submitted Successfully!</DialogTitle>
            <DialogDescription>
              Your seat booking request has been submitted and is now pending admin approval.
              You will be notified once the admin reviews your request.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedSeatBooking;
