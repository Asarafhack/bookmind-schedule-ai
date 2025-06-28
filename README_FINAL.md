
# BookMind AI - Professional Corporate Management System

A comprehensive corporate management system built with React, TypeScript, Firebase, and Flask. Developed by **Irfana Farhath** and **Asaraf**.

## 🚀 Features

### 🎨 Professional UI/UX
- Dynamic background images from Unsplash
- Responsive design for all devices
- Professional header with real-time clock
- Glassmorphism effects with backdrop blur
- Customizable themes and backgrounds

### 👨‍💼 Employee Features
- **Seat Booking System**: Book office seats with location and time preferences
- **Timesheet Tracking**: Clock in/out with flexible timing options
- **Incident Reporting**: Report and track workplace incidents
- **Achievement System**: Earn badges and track progress
- **Cheat Codes**: Special codes for enhanced features

### 👨‍💻 Admin Features
- **Booking Management**: Approve/reject employee bookings
- **Incident Management**: Review and resolve incidents
- **Task Management**: Assign and track employee tasks
- **System Analytics**: Real-time dashboard with statistics
- **Employee Oversight**: Monitor all employee activities

### 🔐 Advanced Features
- **Firebase Authentication**: Secure login/registration
- **Role-based Access**: Employee and Admin dashboards
- **Cheat Code System**: Special codes for timestamp manipulation
- **Real-time Updates**: Live data synchronization
- **Professional Branding**: Developer credits and contact information

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** components
- **Firebase** for authentication and database
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Flask** (Python) API server
- **CORS** enabled for cross-origin requests
- **File upload** handling
- **RESTful API** endpoints

## 📧 Contact Information

### Developers
- **Irfana Farhath** (Lead Developer)
  - Email: irfanafarhath@gmail.com
  - Role: Full Stack Development, UI/UX Design

- **Asaraf** (Partner Developer)
  - Email: asaraf@gmail.com
  - Role: Backend Development, System Architecture

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- Firebase account

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install flask flask-cors

# Start Flask server
python final_app.py
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎯 Cheat Codes

### Booking Cheat Codes
- `bm0123`: Casual dress code allowed
- `bm0111`: Health monitoring waived
- `bm0789`: Extended break time
- `bm0456`: Remote work option

### Timestamp Cheat Codes
- `ts2024`: Backdated entry for 2024
- `flex01`: Flexible timing mode
- `early9`: Early bird - 9 AM start
- `night8`: Night shift - 8 PM start
- `admin0`: Admin override for any time

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 Background Images

Professional corporate backgrounds from Unsplash:
- Modern office spaces
- Technology workspaces
- Corporate environments
- Minimalist designs

## 🔧 API Endpoints

### Flask Backend Endpoints
- `GET /` - Health check
- `POST /api/validate-cheat-code` - Validate cheat codes
- `POST /api/timestamp-override` - Handle timestamp modifications
- `GET /api/backgrounds` - Get background images
- `GET /api/system-stats` - System statistics
- `GET /api/employee-achievements` - Employee achievements
- `GET /api/developer-info` - Developer information
- `POST /api/upload-image` - Image upload

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Auth/              # Authentication components
│   ├── Dashboard/         # Dashboard components
│   ├── Layout/           # Layout components
│   ├── Admin/            # Admin-specific components
│   └── Employee/         # Employee-specific components
├── data/                 # Static data and configurations
├── contexts/             # React contexts
├── services/             # Firebase services
└── types/               # TypeScript type definitions

backend/
├── final_app.py         # Main Flask application
├── uploads/             # File upload directory
└── data/               # Backend data storage
```

## 🎯 Key Features Implemented

### ✅ Professional UI
- [x] Dynamic backgrounds
- [x] Responsive design
- [x] Professional header
- [x] Glassmorphism effects
- [x] Developer credits

### ✅ Authentication
- [x] Firebase authentication
- [x] Role-based access
- [x] Secure login/logout

### ✅ Employee Features
- [x] Seat booking with cheat codes
- [x] Timesheet tracking
- [x] Incident reporting
- [x] Achievement system

### ✅ Admin Features
- [x] Booking management
- [x] Incident management
- [x] Task management
- [x] System analytics

### ✅ Backend Integration
- [x] Flask API server
- [x] Cheat code validation
- [x] Timestamp manipulation
- [x] Image upload handling

## 📞 Support & Contact

For support, feature requests, or collaboration opportunities:

- **Irfana Farhath**: irfanafarhath@gmail.com
- **Asaraf**: asaraf@gmail.com

## 📄 License

This project is developed by Irfana Farhath and Asaraf. All rights reserved.

---

**BookMind AI** - Professional Corporate Management System
*Developed with ❤️ by Irfana Farhath & Asaraf*
