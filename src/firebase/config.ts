// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVCFtj_S41XmsyjDq5bw7dXL3U9ODZUnw",
  authDomain: "astro-auth-407e0.firebaseapp.com",
  projectId: "astro-auth-407e0",
  storageBucket: "astro-auth-407e0.appspot.com",
  messagingSenderId: "298981745260",
  appId: "1:298981745260:web:eb2e47d8c6782924132e49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export const firebase = {
  app,
  auth
}
