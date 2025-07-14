// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLtWyG8imuJ3fMkPGQPY6dKE4f02WHEOc",
  authDomain: "hydrowatch-b4067.firebaseapp.com",
  projectId: "hydrowatch-b4067",
  storageBucket: "hydrowatch-b4067.appspot.com",
  messagingSenderId: "648367912931",
  appId: "1:648367912931:web:44646edcbab130352152d6",
  measurementId: "G-9BFY9Z75NQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // <- necesario para Firestore

export { auth, googleProvider, db };
export default app;
