// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9DY3YV-xOVgjuwNtqEd31R9texi4k5u8",
  authDomain: "tictac-20a29.firebaseapp.com",
  projectId: "tictac-20a29",
  storageBucket: "tictac-20a29.firebasestorage.app",
  messagingSenderId: "241285002589",
  appId: "1:241285002589:web:6ad696dc5f7382acb4e4b4",
  measurementId: "G-ER8H8KW8WY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);