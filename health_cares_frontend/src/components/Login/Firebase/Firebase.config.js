// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADZkO8JjzNn444TD6M-WDrL8Q1pQADCKg",
  authDomain: "healthcareapp-2a885.firebaseapp.com",
  projectId: "healthcareapp-2a885",
  storageBucket: "healthcare-service-app.appspot.com",
  messagingSenderId: "1023129059122",
  appId: "1:70743240819:android:5a330981a3b0bcc7f77a06",
  measurementId: "G-8DZ1762158"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;