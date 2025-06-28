
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { subscribeToIncidents, updateIncident } from '@/services/firebaseService';
import { Incident } from '@/types/booking';

const IncidentManagement = () => {
  const { toast } = useToast();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [resolution, setResolution] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToIncidents((incidentList) => {
      setIncidents(incidentList);
    });

    return () => unsubscribe();
  }, []);

  const handleViewIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowDetailDialog(true);
  };

  const handleResolveIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setShowResolveDialog(true);
  };

  const confirmResolve = async () => {
    if (!selectedIncident) return;

    setLoading(true);
    try {
      await updateIncident(selectedIncident.id, {
        status: 'resolved'
      });

      toast({
        title: "Incident Resolved",
        description: "The incident has been marked as resolved successfully",
      });

      setShowResolveDialog(false);
      setResolution('');
      setSelectedIncident(null);
    } catch (error) {
      console.error('Error resolving incident:', error);
      toast({
        title: "Error",
        description: "Failed to resolve incident",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
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

  const formatTimestampFull = (timestamp: any) => {
    if (!timestamp) return '';
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };

  const openIncidents = incidents.filter(incident => incident.status === 'open' || incident.status === 'in-progress');

  return (
    <div className="space-y-6">
      {/* Open Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Open Incidents ({openIncidents.length})</span>
          </CardTitle>
          <CardDescription>Incidents requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          {openIncidents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No open incidents</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-medium">{incident.title}</TableCell>
                    <TableCell>{incident.employeeName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{incident.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(incident.priority)}>
                        {incident.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatTimestamp(incident.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewIncident(incident)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleResolveIncident(incident)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
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

      {/* All Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>All Incidents</CardTitle>
          <CardDescription>Complete incident history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.title}</TableCell>
                  <TableCell>{incident.employeeName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{incident.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(incident.priority)}>
                      {incident.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatTimestamp(incident.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewIncident(incident)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Incident Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Incident Details</DialogTitle>
          </DialogHeader>
          
          {selectedIncident && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Title</h4>
                  <p>{selectedIncident.title}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Employee</h4>
                  <p>{selectedIncident.employeeName}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Category</h4>
                  <Badge variant="outline">{selectedIncident.category}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold">Priority</h4>
                  <Badge className={getPriorityColor(selectedIncident.priority)}>
                    {selectedIncident.priority}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold">Status</h4>
                  <Badge className={getStatusColor(selectedIncident.status)}>
                    {selectedIncident.status}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold">Created</h4>
                  <p>{formatTimestampFull(selectedIncident.createdAt)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold">Description</h4>
                <p className="text-gray-700 mt-1">{selectedIncident.description}</p>
              </div>

              {selectedIncident.resolvedAt && (
                <div>
                  <h4 className="font-semibold">Resolved At</h4>
                  <p>{formatTimestampFull(selectedIncident.resolvedAt)}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resolve Dialog */}
      <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Incident</DialogTitle>
            <DialogDescription>
              Mark this incident as resolved?
            </DialogDescription>
          </DialogHeader>
          
          {selectedIncident && (
            <div className="py-4">
              <div className="space-y-2 text-sm">
                <p><strong>Title:</strong> {selectedIncident.title}</p>
                <p><strong>Employee:</strong> {selectedIncident.employeeName}</p>
                <p><strong>Category:</strong> {selectedIncident.category}</p>
                <p><strong>Priority:</strong> {selectedIncident.priority}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResolveDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmResolve}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Resolving...' : 'Mark as Resolved'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncidentManagement;
