// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPFOqXo73Hn7RmOIaLPk6IODbBmCacCCc",
  authDomain: "weather-zimozi.firebaseapp.com",
  projectId: "weather-zimozi",
  storageBucket: "weather-zimozi.appspot.com",
  messagingSenderId: "235685196617",
  appId: "1:235685196617:web:36b35771406ae4bf80e098",
  measurementId: "G-N4VPHEJ3SP"
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export const firestore = getFirestore(app);

// export const auth = getAuth();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };