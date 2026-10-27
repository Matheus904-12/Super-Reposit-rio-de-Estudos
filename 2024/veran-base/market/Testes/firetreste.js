// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "REMOVIDA_CHAVE_API",
  authDomain: "sunnythinghs.firebaseapp.com",
  projectId: "sunnythinghs",
  storageBucket: "sunnythinghs.appspot.com",
  messagingSenderId: "591270376409",
  appId: "1:591270376409:web:512bc90d0c5b4473229fc8",
  measurementId: "G-SCSHL3Z5X3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);