// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_KEY,
  authDomain: import.meta.env.VITE_AUTHDOM,
  projectId: import.meta.env.VITE_PROJID,
  storageBucket: import.meta.env.VITE_STO,
  messagingSenderId: import.meta.env.VITE_SENDER,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)