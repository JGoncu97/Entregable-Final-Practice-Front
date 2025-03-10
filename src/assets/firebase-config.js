// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUrA6y-DpgkFfMG0th8gr2u6p7lgWGrnA",
  authDomain: "market-fef72.firebaseapp.com",
  projectId: "market-fef72",
  storageBucket: "market-fef72.firebasestorage.app",
  messagingSenderId: "938220210049",
  appId: "1:938220210049:web:d7027bd15476c972440a80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db };