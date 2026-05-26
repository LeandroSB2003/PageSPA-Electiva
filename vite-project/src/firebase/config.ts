// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_Firebase_ApiKey,
  authDomain: process.env.REACT_APP_FFirebase_AuthDomain,
  projectId: process.env.REACT_APP_Firebase_ProjectId,
  storageBucket: process.env.REACT_APP_Firebase_StorageBucket,
  messagingSenderId: process.env.REACT_APP_Firebase_MessagingSenderId,
  appId: process.env.REACT_APP_Firebase_AppId,
  measurementId: process.env.REACT_APP_Firebase_MeasurementId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);