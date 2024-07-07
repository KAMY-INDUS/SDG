
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.NEXT_apiKey,
  authDomain: process.env.NEXT_authDomain,
  projectId: process.env.NEXT_projectId,
  storageBucket: process.env.NEXT_storageBucket,
  messagingSenderId: process.env.NEXT_messagingSenderId,
  appId: process.env.NEXT_appId,
  measurementId: process.env.NEXT_measurementId
};


const app = initializeApp(firebaseConfig);
export const storage=getStorage()
export const database = getFirestore();
export const userdb = getFirestore();
export const firestore=getFirestore();
export const dynamic = "force-static";
