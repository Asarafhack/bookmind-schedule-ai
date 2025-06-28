
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAJncq_nh3-qKCByE8iWS7yLq-S7DaP2w",
  authDomain: "bookmind-fe594.firebaseapp.com",
  projectId: "bookmind-fe594",
  storageBucket: "bookmind-fe594.firebasestorage.app",
  messagingSenderId: "527509892899",
  appId: "1:527509892899:web:00d5a986b605a6d50a2696",
  measurementId: "G-YJB2XWDGDZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
