import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
    apiKey: "AIzaSyBEbPlCWCeEVfk1SWM8JbBIGqMl_pAQxGo",
    authDomain: "cobratour-05.firebaseapp.com",
    projectId: "cobratour-05",
    storageBucket: "cobratour-05.firebasestorage.app",
    messagingSenderId: "939337388248",
    appId: "1:939337388248:web:57c6cd73d69bb48d4707ad",
    measurementId: "G-5MP2MGG1J6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore
