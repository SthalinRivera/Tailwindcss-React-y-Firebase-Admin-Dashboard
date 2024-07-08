import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore  } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFxPNu_LJY-bANvpD0QLtPSKuRDBQEDxg",
  authDomain: "tutorial-538a4.firebaseapp.com",
  projectId: "tutorial-538a4",
  storageBucket: "tutorial-538a4.appspot.com",
  messagingSenderId: "453631372977",
  appId: "1:453631372977:web:87e5815fb4762737737c90"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)