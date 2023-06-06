// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVxT9mhtwGDFy32HYvPmsOcCqlxXCPL-A",
  authDomain: "proplan-632d7.firebaseapp.com",
  projectId: "proplan-632d7",
  storageBucket: "proplan-632d7.appspot.com",
  messagingSenderId: "154375802507",
  appId: "1:154375802507:web:99be08196339d286bace8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
