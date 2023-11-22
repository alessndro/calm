// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr4w6Eo317d8kKKBpOykAvVCb293bUylo",
  authDomain: "calm-16d69.firebaseapp.com",
  projectId: "calm-16d69",
  storageBucket: "calm-16d69.appspot.com",
  messagingSenderId: "367566500469",
  appId: "1:367566500469:web:7a10c62aacae43fcb57e3c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)