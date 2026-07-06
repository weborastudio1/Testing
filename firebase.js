import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQ8x3KFmgEsfH1AQxsy0ljiBcIeX7tug8",
  authDomain: "dreamy-scrunch.firebaseapp.com",
  projectId: "dreamy-scrunch",
  storageBucket: "dreamy-scrunch.firebasestorage.app",
  messagingSenderId: "927358366614",
  appId: "1:927358366614:web:c1ce8b54b6a2e3379423b7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);