// admin/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 Firebase Config (Values Added)
const firebaseConfig = {
  apiKey: "AIzaSyDQ8x3KFmgEsfH1AQxsy0ljiBcIeX7tug8",
  authDomain: "dreamy-scrunch.firebaseapp.com",
  projectId: "dreamy-scrunch",
  storageBucket: "dreamy-scrunch.firebasestorage.app",
  messagingSenderId: "927358366614",
  appId: "1:927358366614:web:ee50a93e06d3c7869423b7"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Export Auth
export const auth = getAuth(app);