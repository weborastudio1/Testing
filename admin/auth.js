import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      document.getElementById("error").innerText = err.message;
    });
};

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};

// 🔐 Page Protection
onAuthStateChanged(auth, user => {
  if (!user && location.pathname.includes("dashboard")) {
    window.location.href = "index.html";
  }
});