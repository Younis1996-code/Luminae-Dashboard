// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.FIRE_BASE_API ,
  authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
  databaseURL:process.env.FIRE_BASE_DATA_BASE_URL,
  projectId: "luminae-ca224",
  storageBucket: "luminae-ca224.firebasestorage.app",
  messagingSenderId: "1048878162907",
  appId:process.env.FIRE_BASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app)