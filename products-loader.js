import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const snap = await getDocs(collection(db, "products"));
const first = snap.docs[0];

if (first) {
  const p = first.data();
  document.querySelector(".hp-name").innerText = p.name;
  document.querySelector(".hp-price").innerText = "₹" + p.discountPrice;
  document.querySelector(".hp-link").href =
    "products/product.html?id=" + first.id;
}