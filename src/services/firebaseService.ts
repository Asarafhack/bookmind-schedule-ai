
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { SeatBookingRequest, Incident, Task, Timesheet } from '@/types/booking';

// Seat booking services
export const createSeatBooking = async (booking: Omit<SeatBookingRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
  const bookingData = {
    ...booking,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  return await addDoc(collection(db, 'seatBookings'), bookingData);
};

export const createBookingRequest = createSeatBooking;

export const getSeatBookings = async (employeeId?: string) => {
  let q = query(collection(db, 'seatBookings'), orderBy('createdAt', 'desc'));
  
  if (employeeId) {
    q = query(collection(db, 'seatBookings'), where('employeeId', '==', employeeId), orderBy('createdAt', 'desc'));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SeatBookingRequest));
};

export const getBookingRequests = getSeatBookings;

export const updateSeatBookingStatus = async (bookingId: string, status: 'approved' | 'rejected', reason?: string) => {
  const bookingRef = doc(db, 'seatBookings', bookingId);
  await updateDoc(bookingRef, {
    status,
    reason,
    updatedAt: Timestamp.now()
  });
};

export const updateBookingRequest = async (bookingId: string, updates: Partial<SeatBookingRequest>) => {
  const bookingRef = doc(db, 'seatBookings', bookingId);
  await updateDoc(bookingRef, {
    ...updates,
    updatedAt: Timestamp.now()
  });
};

export const subscribeToBookingRequests = (callback: (requests: SeatBookingRequest[]) => void) => {
  const q = query(collection(db, 'seatBookings'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SeatBookingRequest));
    callback(requests);
  });
};

// Incident services
export const createIncident = async (incident: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>) => {
  const incidentData = {
    ...incident,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  return await addDoc(collection(db, 'incidents'), incidentData);
};

export const getIncidents = async (employeeId?: string) => {
  let q = query(collection(db, 'incidents'), orderBy('createdAt', 'desc'));
  
  if (employeeId) {
    q = query(collection(db, 'incidents'), where('employeeId', '==', employeeId), orderBy('createdAt', 'desc'));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Incident));
};

export const updateIncidentStatus = async (incidentId: string, status: Incident['status'], assignedTo?: string) => {
  const incidentRef = doc(db, 'incidents', incidentId);
  const updateData: any = {
    status,
    updatedAt: Timestamp.now()
  };
  
  if (assignedTo) {
    updateData.assignedTo = assignedTo;
  }
  
  if (status === 'resolved') {
    updateData.resolvedAt = Timestamp.now();
  }
  
  await updateDoc(incidentRef, updateData);
};

export const updateIncident = async (incidentId: string, updates: Partial<Incident>) => {
  const incidentRef = doc(db, 'incidents', incidentId);
  await updateDoc(incidentRef, {
    ...updates,
    updatedAt: Timestamp.now()
  });
};

export const subscribeToIncidents = (callback: (incidents: Incident[]) => void) => {
  const q = query(collection(db, 'incidents'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const incidents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Incident));
    callback(incidents);
  });
};

// Task services
export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
  const taskData = {
    ...task,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  return await addDoc(collection(db, 'tasks'), taskData);
};

export const getTasks = async (assignedTo?: string) => {
  let q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
  
  if (assignedTo) {
    q = query(collection(db, 'tasks'), where('assignedTo', '==', assignedTo), orderBy('createdAt', 'desc'));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};

export const updateTaskStatus = async (taskId: string, status: Task['status']) => {
  const taskRef = doc(db, 'tasks', taskId);
  const updateData: any = {
    status,
    updatedAt: Timestamp.now()
  };
  
  if (status === 'completed') {
    updateData.completedAt = Timestamp.now();
  }
  
  await updateDoc(taskRef, updateData);
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, {
    ...updates,
    updatedAt: Timestamp.now()
  });
};

// Timesheet services
export const createTimesheet = async (timesheet: Omit<Timesheet, 'id' | 'createdAt' | 'updatedAt'>) => {
  const timesheetData = {
    ...timesheet,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  return await addDoc(collection(db, 'timesheets'), timesheetData);
};

export const getTimesheets = async (employeeId?: string) => {
  let q = query(collection(db, 'timesheets'), orderBy('createdAt', 'desc'));
  
  if (employeeId) {
    q = query(collection(db, 'timesheets'), where('employeeId', '==', employeeId), orderBy('createdAt', 'desc'));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Timesheet));
};

export const updateTimesheet = async (timesheetId: string, data: Partial<Timesheet>) => {
  const timesheetRef = doc(db, 'timesheets', timesheetId);
  await updateDoc(timesheetRef, {
    ...data,
    updatedAt: Timestamp.now()
  });
};

// Validation services
export const validateCheatCode = async (code: string) => {
  // This would typically check against a database
  const validCodes = ['bm0123', 'bm0111', 'bm0789', 'bm0456', 'ts2024', 'flex01', 'early9', 'night8', 'admin0'];
  return validCodes.includes(code);
};
