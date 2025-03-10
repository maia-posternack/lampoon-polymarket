import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Import Firebase Storage
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA6OVgIyMRQYeRzbk62jQFyeIs6H-nLTBQ",
    authDomain: "lampoon-polymarket.firebaseapp.com",
    projectId: "lampoon-polymarket",
    storageBucket: "lampoon-polymarket.firebasestorage.app",
    messagingSenderId: "1045306485179",
    appId: "1:1045306485179:web:9aed52b35428b6b759bc9e",
    measurementId: "G-3X21KKG99Y"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Initialize Firebase Storage
const auth = getAuth(app);


export { db, storage, collection, addDoc, auth };