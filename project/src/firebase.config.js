// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj5isx2nwjywNZJEQoYVYKHckbBT0ixcQ",
  authDomain: "iit-dhanbad-dd57d.firebaseapp.com",
  projectId: "iit-dhanbad-dd57d",
  storageBucket: "iit-dhanbad-dd57d.appspot.com",
  messagingSenderId: "131773650590",
  appId: "1:131773650590:web:5bdead7ae2b1e0c09b8d8f",
  measurementId: "G-FWDKZRJZ0R"
};

// Initialize Firebase
let app;
let auth;
let db;
let analytics;
let isFirebaseAuthAvailable = false;

try {
  // Initialize Firebase app first
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");

  // Initialize Firebase Auth
  auth = getAuth(app);
  if (auth) {
    isFirebaseAuthAvailable = true;
    console.log("Firebase Auth initialized successfully");
  }

  // Initialize Firestore
  db = getFirestore(app);
  if (db) {
    console.log("Firestore initialized successfully");
  }

  // Initialize Analytics (only in production environments)
  if (import.meta.env.PROD) {
    analytics = getAnalytics(app);
    if (analytics) {
      console.log("Firebase Analytics initialized successfully");
    }
  }
} catch (error) {
  console.error("Firebase initialization error:", error.message);
  console.error("Full error:", error);
  isFirebaseAuthAvailable = false;
}

export { app, analytics, auth, db, isFirebaseAuthAvailable };