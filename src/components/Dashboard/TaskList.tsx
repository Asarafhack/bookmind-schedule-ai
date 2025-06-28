
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  assignedBy: string;
}

const TaskList = () => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Q4 Report',
      description: 'Prepare and submit quarterly performance report',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-01-15',
      assignedBy: 'Manager Smith'
    },
    {
      id: '2',
      title: 'Update Client Database',
      description: 'Review and update client contact information',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-01-20',
      assignedBy: 'Team Lead Johnson'
    },
    {
      id: '3',
      title: 'Training Session Attendance',
      description: 'Attend mandatory cybersecurity training',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-12',
      assignedBy: 'HR Department'
    },
    {
      id: '4',
      title: 'Code Review',
      description: 'Review pull requests from junior developers',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-01-10',
      assignedBy: 'Senior Developer'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <div className="flex space-x-2">
          <Badge variant="outline">12 Total</Badge>
          <Badge variant="outline">8 Pending</Badge>
          <Badge variant="outline">4 Completed</Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              </div>
              <CardDescription className="mt-2">
                {task.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <span>Assigned by: {task.assignedBy}</span>
                </div>
                <div className="flex space-x-2">
                  {task.status === 'pending' && (
                    <Button size="sm" variant="outline">
                      Start Task
                    </Button>
                  )}
                  {task.status === 'in-progress' && (
                    <Button size="sm">
                      Mark Complete
                    </Button>
                  )}
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
