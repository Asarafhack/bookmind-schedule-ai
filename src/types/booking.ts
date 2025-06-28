
import { Timestamp } from 'firebase/firestore';

export interface Location {
  id: string;
  name: string;
  code: string;
  image: string;
  timezone: string;
}

export interface SeatBookingRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  seatId: string;
  locationId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  cheatCode?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Incident {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo?: string;
  type?: string;
  resolvedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CheatCode {
  code: string;
  type: 'casual' | 'fever';
  locationId: string;
  isActive: boolean;
  createdAt: string;
}

export interface Seat {
  id: string;
  number: string;
  locationId: string;
  floor: string;
  area: string;
  status: 'available' | 'booked' | 'maintenance';
  amenities: string[];
}

export interface Timesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  locationId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  workingHours?: number;
  cheatCode?: string;
  status: 'active' | 'completed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  completedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
