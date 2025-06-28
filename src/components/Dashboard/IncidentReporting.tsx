
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, CheckCircle, Plus } from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'security' | 'facility' | 'hr' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  reportedAt: string;
  reportedBy: string;
}

const IncidentReporting = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: ''
  });

  const [incidents] = useState<Incident[]>([
    {
      id: '1',
      title: 'Network Connectivity Issues',
      description: 'Unable to access company servers from workstation',
      category: 'technical',
      priority: 'high',
      status: 'in-progress',
      reportedAt: '2024-01-08T10:30:00',
      reportedBy: 'John Doe'
    },
    {
      id: '2',
      title: 'Broken Chair in Meeting Room A',
      description: 'Chair leg is broken, potential safety hazard',
      category: 'facility',
      priority: 'medium',
      status: 'open',
      reportedAt: '2024-01-07T14:15:00',
      reportedBy: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Suspicious Email Received',
      description: 'Received phishing email claiming to be from IT department',
      category: 'security',
      priority: 'critical',
      status: 'resolved',
      reportedAt: '2024-01-06T09:00:00',
      reportedBy: 'Mike Johnson'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New incident:', formData);
    setShowForm(false);
    setFormData({ title: '', description: '', category: '', priority: '' });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'facility': return 'bg-green-100 text-green-800';
      case 'hr': return 'bg-purple-100 text-purple-800';
      case 'other': return 'bg-gray-100 text-gray-800';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'open':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'open':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Incident Reporting</h2>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Report Incident</span>
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Report New Incident</CardTitle>
            <CardDescription>Describe the incident in detail</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Incident Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Brief title of the incident"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="facility">Facility</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({...formData, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Detailed description of the incident"
                  rows={4}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">Submit Report</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">My Reported Incidents</h3>
        {incidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(incident.status)}
                  <CardTitle className="text-lg">{incident.title}</CardTitle>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getCategoryColor(incident.category)}>
                    {incident.category}
                  </Badge>
                  <Badge className={getPriorityColor(incident.priority)}>
                    {incident.priority}
                  </Badge>
                  <Badge className={getStatusColor(incident.status)}>
                    {incident.status}
                  </Badge>
                </div>
              </div>
              <CardDescription className="mt-2">
                {incident.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  <span>Reported: {new Date(incident.reportedAt).toLocaleString()}</span>
                  <span className="ml-4">By: {incident.reportedBy}</span>
                </div>
                <Button size="sm" variant="ghost">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IncidentReporting;
