import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAkX6Ag5musydSuPaG4bL9p829TdTqcWAc",
  authDomain: "ghibli-web-reviews.firebaseapp.com",
  projectId: "ghibli-web-reviews",
  storageBucket: "ghibli-web-reviews.firebasestorage.app",
  messagingSenderId: "1042682787611",
  appId: "1:1042682787611:web:952ae1e895852fd53145be",
  measurementId: "G-Z9VEP8ZE4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Authentication
export const auth = getAuth(app);

export default app;