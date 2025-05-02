// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATXNW9bdYhBuV2-rHSiai0E_tCnrbk7Tc",
  authDomain: "eventpro-2101a.firebaseapp.com",
  projectId: "eventpro-2101a",
  storageBucket: "eventpro-2101a.firebasestorage.app",
  messagingSenderId: "286266514000",
  appId: "1:286266514000:web:862b3432ce89ded9c70f55",
  measurementId: "G-BWTRGR14XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;