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
  apiKey: "AIzaSyD85ytR_2YSzLVUdUx4tlVqImP2O5xvA2M",
  authDomain: "learning-1718730002837.firebaseapp.com",
  projectId: "learning-1718730002837",
  storageBucket: "learning-1718730002837.appspot.com",
  messagingSenderId: "788798220648",
  appId: "1:788798220648:web:09dd07724a09932f8b0edd",
  measurementId: "G-Z4QEEFYXX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb=getStorage(app)
export const database = getDatabase();
export const firestore=getFirestore();
