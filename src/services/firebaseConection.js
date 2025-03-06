import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoaHwsU4lw7Y5IOE7l6ELzJythaedBrgE",
  authDomain: "medicao-energia-agua.firebaseapp.com",
  projectId: "medicao-energia-agua",
  storageBucket: "medicao-energia-agua.firebasestorage.app",
  messagingSenderId: "513925354416",
  appId: "1:513925354416:web:ad2315d32fe14e6e5cbc75",
  measurementId: "G-K0DQL0JNKG",
};

const fireBaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(fireBaseApp);
export const auth = getAuth(fireBaseApp);
