// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, browserSessionPersistence, initializeAuth } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKqKS3caRrXryzJr4mJLJGBijtlHI2KpY",
  authDomain: "when3meet-baa3c.firebaseapp.com",
  projectId: "when3meet-baa3c",
  storageBucket: "when3meet-baa3c.appspot.com",
  messagingSenderId: "541841002814",
  appId: "1:541841002814:web:5ec4bb3785b9e1e7291c6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//TODO: Add Persistence
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: undefined
});

const db = getFirestore(app);

export { app, auth, db, getAuth }
