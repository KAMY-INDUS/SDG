import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_apiKey,
  authDomain: process.env.NEXT_authDomain,
  projectId: process.env.NEXT_projectId,
  storageBucket: process.env.NEXT_storageBucket,
  messagingSenderId: process.env.NEXT_messagingSenderId,
  appId: process.env.NEXT_appId
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Initialize storage with your Firebase app instance
export const database = getFirestore(app); // Initialize Firestore database with your Firebase app instance
export const userdb = getFirestore(app); // Initialize Firestore (assuming a separate database, replace with your setup)
export const firestore = getFirestore(app); // Initialize another Firestore instance (if needed)
