// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrgSadBodA0PLx0Pf6C-bRK4mjWoww8k8",
  authDomain: "sdg-hackathon-eb008.firebaseapp.com",
  projectId: "sdg-hackathon-eb008",
  storageBucket: "sdg-hackathon-eb008.appspot.com",
  messagingSenderId: "208347623773",
  appId: "1:208347623773:web:c64e433d820c15b522f8b4",
  measurementId: "G-HJP2T08GV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
export const database = getFirestore();
export const firestore=getFirestore();
