import { initializeApp} from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyDrgSadBodA0PLx0Pf6C-bRK4mjWoww8k8",
  authDomain: "sdg-hackathon-eb008.firebaseapp.com",
  projectId: "sdg-hackathon-eb008",
  storageBucket: "sdg-hackathon-eb008.appspot.com",
  messagingSenderId: "208347623773",
  appId: "1:208347623773:web:c64e433d820c15b522f8b4",
  measurementId: "G-HJP2T08GV2" // If you have it in your environment
=======
  apiKey: process.env.NEXT_apiKey,
  authDomain: process.env.NEXT_authDomain,
  projectId: process.env.NEXT_projectId,
  storageBucket: process.env.NEXT_storageBucket,
  messagingSenderId: process.env.NEXT_messagingSenderId,
  appId: process.env.NEXT_appId
>>>>>>> d8a047e0d813fe7e8abbe208322a0a00a1357075
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Initialize storage with your Firebase app instance
export const database = getFirestore(app); // Initialize Firestore database with your Firebase app instance
export const userdb = getFirestore(app); // Initialize Firestore (assuming a separate database, replace with your setup)
<<<<<<< HEAD
export const firestore = getFirestore(app); // Initialize another Firestore instance (if needed)
=======
export const firestore = getFirestore(app); // Initialize another Firestore instance (if needed)
>>>>>>> d8a047e0d813fe7e8abbe208322a0a00a1357075
