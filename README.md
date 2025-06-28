# 🧠 SmartPredict – AI-Powered Desk & Shift Booking System

SmartPredict is a real-time desk and shift booking platform for hybrid workspaces, powered by React, Flask, and Firebase. It uses machine learning to predict peak traffic hours and suggest the best times for employees to book office desks or shifts.

Admins can manage and monitor live bookings, analyze utilization patterns, and view ML-based future predictions to optimize resource allocation.



## 🚀 Features

### 👥 Employee Portal
- 📅 Book desks or shifts by date and time
- ✅ Real-time seat availability updates
- 🎯 AI-powered booking suggestions
- 🔔 Optional QR check-in & reminders

### 🛠 Admin Dashboard
- 📊 Live booking heatmaps and usage stats
- 🔮 Future traffic prediction using ML
- 📂 CSV export of booking data
- 📈 Visual analytics with filters by date/department

---

## 🧪 Tech Stack

| Layer       | Technologies                          |
|-------------|---------------------------------------|
| Frontend    | React, TailwindCSS, Vite, shadcn/ui   |
| Backend     | Flask, Flask-RESTful, JWT             |
| ML Model    | Scikit-learn, Pickle, Pandas          |
| Realtime DB | Firebase Firestore                    |
| Auth        | Firebase Authentication               |
| Deployment  | Vercel (frontend), Render (backend)   |

---

## 📁 Folder Structure


bookmind-scheduling-ai-main/
├── client/ # React frontend
│ ├── pages/ # Dashboard, Booking
│ ├── components/ # SeatMap, Charts, Forms
│ └── services/api.js # Axios API service
│
├── backend/ # Flask backend
│ ├── app.py # Main entry point
│ ├── routes/ # API endpoints
│ ├── ml/ # ML model training & serving
│ └── utils/ # Firebase & helper services


---

## ⚙️ Getting Started

### 🔧 Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Set environment variables (for Firebase Admin SDK)
export FIREBASE_PRIVATE_KEY_ID="your_private_key_id"
export FIREBASE_PRIVATE_KEY="your_private_key"
export FIREBASE_CLIENT_EMAIL="your_client_email"
export FIREBASE_CLIENT_ID="your_client_id"

# Run the Flask app
python app.py

💻 Frontend Setup


cd client
npm install
npm run dev
🧠 AI Prediction
The machine learning model uses historical booking data, weekdays, time ranges, and departments to predict future demand. Predictions are served via a /predict API endpoint and visualized in the admin dashboard.

🌐 Deployment
Frontend: Deployed on Vercel

Backend: Hosted on Render

Database & Auth: Firebase (Firestore + Authentication)

💡 Challenges Solved
CORS and async communication between React and Flask

Firebase key handling with secure environment variables

ML model integration and lightweight prediction API

Real-time data sync and optimistic UI updates

📌 Roadmap & Improvements
 Google Calendar integration

 Admin alerts for overbooking

 Multi-office seat mapping support

 Advanced anomaly detection for no-shows

👨‍💻 Author
Asaraf Ali

GitHub: @asarafcyber

Email: asarafcyber@gmail.com

Loom Demo: [Insert your video link here]

📝 License
Licensed under the MIT License – free to use, modify, and share.

