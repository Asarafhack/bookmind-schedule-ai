# Welcome to your Lovable project

SmartPredict – AI-Powered Desk & Shift Booking System

SmartPredict is a full-stack scheduling platform for hybrid workplaces. Built using React, Flask, and Firebase. It enables employees to book desks or shift slots, view real-time seat availability, and receive AI-based recommendations on optimal booking times.

Admins can view live booking dashboards, analyze utilization trends, and forecast future traffic using an ML model trained on historical data.

=====================================
🚀 Features

👨‍💼 Employee Panel
- Book desks or shifts by date and time
- Real-time seat availability updates
- AI-based "Best time to book" suggestions
- QR check-in & booking reminders (optional)

🛠 Admin Dashboard
- Live occupancy graphs and seat usage trends
- ML-powered traffic prediction (hour/day)
- CSV export of bookings
- Heatmap view of shift traffic

🧠 Machine Learning
- Predicts future demand using:
  - Day of week, hour, department
  - Past bookings
  - Holidays / external data (optional)

=====================================
🧪 Tech Stack

Frontend    : React, TailwindCSS, Recharts
Backend     : Flask, Flask-RESTful, JWT Auth
ML Model    : Python (Scikit-learn), Pickle
Realtime DB : Firebase Firestore
Auth        : Firebase Authentication (Email/Google)
Deployment  : Vercel (React), Render (Flask)

=====================================
📁 Folder Structure

bookmind-scheduling-ai-main/
├── client/                   → React frontend
│   ├── pages/                → Booking, Dashboard
│   ├── components/           → SeatMap, Prediction UI
│   └── services/api.js       → Axios API calls
├── backend/                  → Flask backend
│   ├── app.py                → Main Flask app
│   ├── routes/               → API routes
│   ├── ml/                   → ML model + training code
│   └── utils/                → Firebase utils, DB service

=====================================
⚙️ Getting Started

BACKEND SETUP:
-------------
cd backend
pip install -r requirements.txt

Set environment variables (for Firebase):
export FIREBASE_PRIVATE_KEY_ID="..."
export FIREBASE_PRIVATE_KEY="..."
export FIREBASE_CLIENT_EMAIL="..."
export FIREBASE_CLIENT_ID="..."

Start Flask:
python app.py

FRONTEND SETUP:
---------------
cd client
npm install
npm run dev

=====================================
🧠 AI Model

Predicts hourly seat demand based on:
- Day of week
- Hour of day
- Department/team
- Historical data

Model is trained in `ml/train.py` and served via `/predict` API.

=====================================
🌐 Deployment

Frontend  : https://vercel.com
Backend   : https://render.com
Database/Auth : Firebase (Free Tier)

=====================================
📌 Challenges Overcome

- CORS issues between React and Flask
- Firebase key handling via environment
- ML integration with REST API
- Real-time sync with Firestore and React UI

=====================================
📎 Future Improvements

- Google Calendar sync
- No-show prediction
- Admin alerts for high occupancy
- Floor heatmap (SVG or Canvas based)

=====================================
👨‍💻 Author

Asaraf Ali  
GitHub: https://github.com/asarafcyber  
Email : asarafcyber@gmail.com  
Loom : Paste Loom demo link here

=====================================
📦 Edit Project Locally (CMD Style)

1. Clone the repo:
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME

2. Navigate into it:
   cd bookmind-scheduling-ai-main

3. Install dependencies:
   npm i

4. Start frontend server:
   npm run dev

=====================================
💡 Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

=====================================
