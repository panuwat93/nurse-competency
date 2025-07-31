// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyjhRuRFbfG7uac5sbVyDVVX9e55ESK54",
  authDomain: "nurse-competency-form.firebaseapp.com",
  projectId: "nurse-competency-form",
  storageBucket: "nurse-competency-form.appspot.com",
  messagingSenderId: "507085320924",
  appId: "1:507085320924:web:8ab681172280ca92eb7a19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }; 