// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEbPlCWCeEVfk1SWM8JbBIGqMl_pAQxGo",
  authDomain: "cobratour-05.firebaseapp.com",
  databaseURL: "https://cobratour-05-default-rtdb.firebaseio.com",
  projectId: "cobratour-05",
  storageBucket: "cobratour-05.firebasestorage.app",
  messagingSenderId: "939337388248",
  appId: "1:939337388248:web:57c6cd73d69bb48d4707ad",
  measurementId: "G-5MP2MGG1J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};