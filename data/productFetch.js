// data/productFetch.js

import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function fetchProduct() {
  const productId = "silk-rose-scrunchie"; // SAME as Firestore doc ID
  const ref = doc(db, "products", productId);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    console.log("🔥 PRODUCT DATA:", snap.data());
  } else {
    console.log("❌ Product not found");
  }
}

fetchProduct();