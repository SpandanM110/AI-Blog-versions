// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBAk1188RtVubdze3vqALJVOhHGB3hgoKg",
    authDomain: "think41-e8a42.firebaseapp.com",
    projectId: "think41-e8a42",
    storageBucket: "think41-e8a42.firebasestorage.app",
    messagingSenderId: "83248323692",
    appId: "1:83248323692:web:17d2707ff0e26131a24c49",
    measurementId: "G-GYE179DR87"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();