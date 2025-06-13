// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⬇️ Replace this with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCIEmZHJOrrRWUiYQ3P96Pw1jfCTCnSXHs",
  authDomain: "prepspeak.firebaseapp.com",
  projectId: "prepspeak",
  storageBucket: "prepspeak.firebasestorage.app",
  messagingSenderId: "534956160694",
  appId: "1:534956160694:web:479c16cab4e28d74c6d81",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
