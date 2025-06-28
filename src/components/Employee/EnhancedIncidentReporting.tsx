
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, Plus } from 'lucide-react';
import { createIncident, getIncidents } from '@/services/firebaseService';
import { Incident } from '@/types/booking';

const EnhancedIncidentReporting = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [myIncidents, setMyIncidents] = useState<Incident[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technical' as const,
    priority: 'medium' as const
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadMyIncidents();
    }
  }, [currentUser]);

  const loadMyIncidents = async () => {
    try {
      const incidents = await getIncidents(currentUser?.uid);
      setMyIncidents(incidents);
    } catch (error) {
      console.error('Error loading incidents:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const incident: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'> = {
        employeeId: currentUser?.uid || '',
        employeeName: currentUser?.displayName || currentUser?.email || '',
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        status: 'open'
      };

      await createIncident(incident);
      
      toast({
        title: "Incident Reported",
        description: "Your incident has been reported successfully",
      });

      setFormData({
        title: '',
        description: '',
        category: 'technical',
        priority: 'medium'
      });
      setShowForm(false);
      loadMyIncidents();
    } catch (error) {
      console.error('Error creating incident:', error);
      toast({
        title: "Error",
        description: "Failed to report incident",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
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
      {/* Report New Incident */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Report Incident</span>
              </CardTitle>
              <CardDescription>Report any issues or incidents that need attention</CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              New Incident
            </Button>
          </div>
        </CardHeader>
        
        {showForm && (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  placeholder="Brief description of the incident"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="technical">Technical</option>
                    <option value="facility">Facility</option>
                    <option value="security">Security</option>
                    <option value="hr">HR</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  rows={4}
                  placeholder="Detailed description of the incident..."
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Reporting...' : 'Report Incident'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      {/* My Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>My Reported Incidents</CardTitle>
          <CardDescription>Track the status of your reported incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myIncidents.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No incidents reported yet</p>
            ) : (
              myIncidents.map((incident) => (
                <div key={incident.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{incident.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{incident.category}</Badge>
                        <Badge className={getPriorityColor(incident.priority)}>
                          {incident.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatTimestamp(incident.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  {incident.resolvedAt && (
                    <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                      Resolved on {formatTimestamp(incident.resolvedAt)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedIncidentReporting;
