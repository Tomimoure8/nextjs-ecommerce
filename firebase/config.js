// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-dVcrKMUdPhFQPwg9tUQC3kq-rA6Z15U",
    authDomain: "tomi-shop2.firebaseapp.com",
    projectId: "tomi-shop2",
    storageBucket: "tomi-shop2.firebasestorage.app",
    messagingSenderId: "18334316357",
    appId: "1:18334316357:web:a66c99f62e166f859ef02c",
    measurementId: "G-TJVW8Y5MGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);