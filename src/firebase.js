import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUL-f5tg1vhCLd4WYhoUsIPH8m0xb3F04",
    authDomain: "react-fb-router-vite.firebaseapp.com",
    projectId: "react-fb-router-vite",
    storageBucket: "react-fb-router-vite.appspot.com",
    messagingSenderId: "132565134646",
    appId: "1:132565134646:web:2088433796ccba93ba1797",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
