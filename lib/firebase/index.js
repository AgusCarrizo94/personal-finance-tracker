// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ9gbD0S2fmqS91xeAj3XFeedh2qScjFk",
  authDomain: "finance-tracker-38c20.firebaseapp.com",
  projectId: "finance-tracker-38c20",
  storageBucket: "finance-tracker-38c20.appspot.com",
  messagingSenderId: "696350048792",
  appId: "1:696350048792:web:8bbafb48b022556874b96d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
