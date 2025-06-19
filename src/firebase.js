import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { data } from "autoprefixer";

// Make sure these match your .env.local variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || "AIzaSyCXop1WxJpsRVHhAGNmHtb15iNF8fzzoag" ,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "bookiy-eb99f.firebaseapp.com" ,
  projectId: import.meta.env.VITE_PROJECT_ID || "bookiy-eb99f" ,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "bookiy-eb99f.firebasestorage.app" ,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "60822659737" ,
  appId: import.meta.env.VITE_APP_ID || "1:60822659737:web:4301c7b7fda23494a4ce08" ,
  databaseURL: import.meta.env.VITE_DATABASE_URL || "https://bookiy-eb99f-default-rtdb.firebaseio.com"  ,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// For debugging - remove in production
console.log("Firebase initialized with project:", firebaseConfig.projectId);    