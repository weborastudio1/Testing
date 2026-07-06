import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("products");
const colRef = collection(db, "products");

const snap = await getDocs(colRef);

snap.forEach(d => {
  const p = d.data();
  container.innerHTML += `
    <div class="product-card">
      <h3>${p.name}</h3>
      <p>₹${p.discountPrice}</p>
      <a href="products/product.html?id=${d.id}">View</a>
    </div>
  `;
});