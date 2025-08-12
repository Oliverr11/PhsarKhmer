// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBem9PHfUy97ofvQy7VRAQYaFxqA1G3qm0",
  authDomain: "fir-react-afternoon2.firebaseapp.com",
  projectId: "fir-react-afternoon2",
  storageBucket: "fir-react-afternoon2.firebasestorage.app",
  messagingSenderId: "700516629089",
  appId: "1:700516629089:web:59c4b5c8d0f57b3c8a8820",
  measurementId: "G-QF2HGZGR6Q",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };
// const analytics = getAnalytics(app);
