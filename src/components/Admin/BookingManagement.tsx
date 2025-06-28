import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';
import { subscribeToBookingRequests, updateBookingRequest } from '@/services/firebaseService';
import { locations } from '@/data/locations';
import { SeatBookingRequest } from '@/types/booking';
import { deleteField } from 'firebase/firestore'; // ✅ Fix for Firestore optional field

const BookingManagement = () => {
  const { toast } = useToast();
  const [bookingRequests, setBookingRequests] = useState<SeatBookingRequest[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<SeatBookingRequest | null>(null);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToBookingRequests((requests) => {
      setBookingRequests(requests);
    });

    return () => unsubscribe();
  }, []);

  const handleBookingAction = async (booking: SeatBookingRequest, action: 'approve' | 'reject') => {
    setSelectedBooking(booking);
    setActionType(action);
    setShowActionDialog(true);
  };

  const confirmAction = async () => {
    if (!selectedBooking) return;

    setLoading(true);
    try {
      await updateBookingRequest(selectedBooking.id, {
        status: actionType === 'approve' ? 'approved' : 'rejected',
        reason: actionType === 'reject' ? reason.trim() : deleteField()  // ✅ Fix
      });

      toast({
        title: `Booking ${actionType === 'approve' ? 'Approved' : 'Rejected'}`,
        description: `Seat booking request has been ${actionType}d successfully`,
      });

      setShowActionDialog(false);
      setReason('');
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast({
        title: "Error",
        description: "Failed to update booking request",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingRequests = bookingRequests.filter(req => req.status === 'pending');
  const processedRequests = bookingRequests.filter(req => req.status !== 'pending');

  return (
    <div className="space-y-6">
      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Pending Booking Requests ({pendingRequests.length})</span>
          </CardTitle>
          <CardDescription>Review and approve seat booking requests</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No pending booking requests</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Seat</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Cheat Code</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.employeeName}</p>
                        <p className="text-sm text-gray-500">{request.employeeEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {locations.find(l => l.id === request.locationId)?.name}
                    </TableCell>
                    <TableCell>{request.seatId}</TableCell>
                    <TableCell>
                      <div>
                        <p>{request.date}</p>
                        <p className="text-sm text-gray-500">{request.timeSlot}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {request.cheatCode ? (
                        <Badge variant="outline">{request.cheatCode}</Badge>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleBookingAction(request, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleBookingAction(request, 'reject')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* All Booking Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>All Booking Requests</span>
          </CardTitle>
          <CardDescription>Complete history of booking requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Seat</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cheat Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.employeeName}</p>
                      <p className="text-sm text-gray-500">{request.employeeEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {locations.find(l => l.id === request.locationId)?.name}
                  </TableCell>
                  <TableCell>{request.seatId}</TableCell>
                  <TableCell>
                    <div>
                      <p>{request.date}</p>
                      <p className="text-sm text-gray-500">{request.timeSlot}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.cheatCode ? (
                      <Badge variant="outline">{request.cheatCode}</Badge>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve' : 'Reject'} Booking Request
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'Are you sure you want to approve this booking request?'
                : 'Please provide a reason for rejecting this booking request.'
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="py-4">
              <div className="space-y-2 text-sm">
                <p><strong>Employee:</strong> {selectedBooking.employeeName}</p>
                <p><strong>Location:</strong> {locations.find(l => l.id === selectedBooking.locationId)?.name}</p>
                <p><strong>Seat:</strong> {selectedBooking.seatId}</p>
                <p><strong>Date:</strong> {selectedBooking.date}</p>
                <p><strong>Time:</strong> {selectedBooking.timeSlot}</p>
                {selectedBooking.cheatCode && (
                  <p><strong>Cheat Code:</strong> {selectedBooking.cheatCode}</p>
                )}
              </div>

              {actionType === 'reject' && (
                <div className="mt-4">
                  <label className="text-sm font-medium">Reason for rejection:</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Enter reason for rejection..."
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActionDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmAction}
              disabled={loading || (actionType === 'reject' && !reason.trim())}
              className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              {loading ? 'Processing...' : (actionType === 'approve' ? 'Approve' : 'Reject')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
