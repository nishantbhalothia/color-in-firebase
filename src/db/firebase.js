
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCRDsZjjy3U9l7eKrBq-AnaD2jdsjnjTrE",
  authDomain: "colors-73455.firebaseapp.com",
  projectId: "colors-73455",
  storageBucket: "colors-73455.appspot.com",
  messagingSenderId: "652737479475",
  appId: "1:652737479475:web:f3a6d0e53c5f73ca907446"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
