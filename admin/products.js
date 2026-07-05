import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const productsRef = collection(db, "products");

window.addProduct = async function () {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  await addDoc(productsRef, {
    title,
    price,
    image
  });

  alert("Product Added");
  loadProducts();
};

async function loadProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const snap = await getDocs(productsRef);
  snap.forEach(docu => {
    const d = docu.data();
    list.innerHTML += `
      <div>
        <b>${d.title}</b><br>
        ₹${d.price}<br>
        <button onclick="deleteProduct('${docu.id}')">Delete</button>
      </div>
    `;
  });
}

window.deleteProduct = async function (id) {
  await deleteDoc(doc(db, "products", id));
  loadProducts();
};

loadProducts();