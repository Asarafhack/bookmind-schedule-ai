
# BookMind Backend

AI-Powered Corporate Management System Backend

## Features

- **Firebase Integration**: User authentication and Firestore database
- **Machine Learning**: Booking prediction using scikit-learn
- **RESTful API**: Complete CRUD operations for all entities
- **Real-time Analytics**: Dashboard insights and predictions
- **Scalable Architecture**: Built with Flask and modular design

## Installation

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the server:
   ```bash
   python app.py
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication & Users
- `GET /api/health` - Health check

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking

### Seats
- `GET /api/seats` - Get all seats with availability

### Tasks
- `GET /api/tasks?user_id=<id>` - Get user tasks
- `POST /api/tasks` - Create new task

### Incidents
- `GET /api/incidents` - Get all incidents
- `POST /api/incidents` - Report new incident

### Contacts
- `GET /api/contacts` - Get client contacts
- `POST /api/contacts` - Add new contact

### Analytics
- `GET /api/analytics/bookings` - Get booking analytics and ML predictions
- `GET /api/analytics/dashboard` - Get dashboard analytics

## Machine Learning Features

The system includes a booking prediction model that:
- Analyzes historical booking patterns
- Predicts future booking demand
- Provides optimization recommendations
- Achieves high accuracy through continuous learning

## Firebase Configuration

The system uses Firebase for:
- User authentication
- Firestore database
- Real-time data synchronization
- Secure API access

## Environment Variables

Create a `.env` file with:
```
FLASK_ENV=development
FIREBASE_PROJECT_ID=bookmind-fe594
```

## Production Deployment

For production deployment:
1. Set `FLASK_ENV=production`
2. Use Gunicorn: `gunicorn app:app`
3. Configure proper Firebase security rules
4. Set up proper CORS policies
