# Welcome to your Lovable project

# 🧠 SmartPredict – AI-Powered Desk & Shift Booking System

SmartPredict is a full-stack scheduling platform for hybrid workplaces. Built using **React**, **Flask**, and **Firebase**, it enables employees to book desks or shift slots, view real-time seat availability, and receive AI-based recommendations on optimal booking times.

Admins can view live booking dashboards, analyze utilization trends, and forecast future traffic using an ML model trained on historical data.

---

## 🚀 Features

### 👨‍💼 Employee Panel

* 📅 Book desks or shifts by date and time
* 👀 Real-time seat availability updates
* 🎯 AI-based "Best time to book" suggestions
* 🔔 QR check-in & booking reminders (optional)

### 🛠 Admin Dashboard

* 📊 Live occupancy graphs and seat usage trends
* 🔮 ML-powered traffic prediction (hour/day)
* 🗂️ CSV export of bookings
* 🧠 Heatmap view of shift traffic

### 🧠 Machine Learning

* Predicts future demand using:

  * Day of week, hour, department
  * Past bookings
  * Holidays / external data (optional)

---

## 🧪 Tech Stack

| Layer       | Tech Used                              |
| ----------- | -------------------------------------- |
| Frontend    | React, TailwindCSS, Recharts           |
| Backend     | Flask, Flask-RESTful, JWT Auth         |
| ML Model    | Python (Scikit-learn), Pickle          |
| Realtime DB | Firebase Firestore                     |
| Auth        | Firebase Authentication (Email/Google) |
| Deployment  | Vercel (React), Render (Flask)         |

---

## 📁 Folder Structure

```
bookmind-scheduling-ai-main/
│
├── client/                   # React frontend
│   ├── pages/                # Booking, Dashboard
│   ├── components/           # SeatMap, Prediction UI
│   └── services/api.js       # Axios API calls
│
├── backend/                 # Flask backend
│   ├── app.py                # Main Flask app
│   ├── routes/               # API routes
│   ├── ml/                   # ML model + training code
│   └── utils/                # Firebase utils, DB service
```

---

## ⚙️ Getting Started

### 🔧 Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Set environment variables (for Firebase)
export FIREBASE_PRIVATE_KEY_ID="..."
export FIREBASE_PRIVATE_KEY="..."
export FIREBASE_CLIENT_EMAIL="..."
export FIREBASE_CLIENT_ID="..."

# Start Flask API
python app.py
```

### 💻 Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🧠 AI Model

The ML model predicts hourly seat demand based on:

* Day of week
* Hour of day
* Department/team
* Historical data

Model is trained in `ml/train.py` and served via `/predict` API.

---

## 🌐 Deployment

* **Frontend:** [Vercel](https://vercel.com)
* **Backend API:** [Render](https://render.com)
* **Database & Auth:** Firebase (Free Tier)

---

## 📌 Challenges Overcome

* Cross-Origin issues between React and Flask
* Firebase private key parsing in environment variables
* ML model integration in REST API
* Real-time sync between Firestore and seat UI

---

## 📎 Future Improvements

* Google Calendar sync for shifts
* No-show prediction model
* Admin alerts for 90%+ occupancy
* Floor-plan based heatmap (SVG/Canvas)

---

## 📸 Screenshots

> (Optional: Add screenshots of dashboard, booking UI, and prediction graph)

---

## 👨‍💻 Author

**Asaraf Ali**
GitHub: [github.com/asarafcyber](https://github.com/asarafcyber)
Email: [asarafcyber@gmail.com](mailto:asarafcyber@gmail.com)
Loom Demo: *Paste your video link here after recording*

---

## 📝 License

MIT License – Free to use, share, and improve.

---

### ✅ Final Step:

1. Open VS Code
2. Create a new file: `README.md`
3. Paste the content
4. Save and commit:

   ```bash
   git add README.md
   git commit -m "Add project README"
   git push
   ```


## Project info

**URL**: https://lovable.dev/projects/aa06325d-49c8-4f29-8c6e-a6e4c6630192

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/aa06325d-49c8-4f29-8c6e-a6e4c6630192) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/aa06325d-49c8-4f29-8c6e-a6e4c6630192) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
