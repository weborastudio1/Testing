// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase Config (Values Added)
const firebaseConfig = {
  apiKey: "AIzaSyDQ8x3KFmgEsfH1AQxsy0ljiBcIeX7tug8",
  authDomain: "dreamy-scrunch.firebaseapp.com",
  projectId: "dreamy-scrunch",
  storageBucket: "dreamy-scrunch.firebasestorage.app",
  messagingSenderId: "927358366614",
  appId: "1:927358366614:web:56a8b014baa05c1c9423b7"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 📦 Export Firestore DB
export const db = getFirestore(app);