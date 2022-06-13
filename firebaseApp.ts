import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA02bNkBl7KiCzOrxzJtz0pjDek6dQdOlA",
  authDomain: "kck-app-9b6f6.firebaseapp.com",
  projectId: "kck-app-9b6f6",
  storageBucket: "kck-app-9b6f6.appspot.com",
  messagingSenderId: "1078450657252",
  appId: "1:1078450657252:web:e8064d36f0a04515b499f1",
  measurementId: "G-40FWV8V1V1"
};

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);
export const firestore = getFirestore(app);