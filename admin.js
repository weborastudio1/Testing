import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const colRef = collection(db, "products");
let editId = null;

// Inputs
const fields = [
  "name",
  "price",
  "discountPrice",
  "discountPercent",
  "tagline",
  "colours",
  "material",
  "stock",
  "description",
  "delivery",
  "image"
];

const els = {};
fields.forEach(f => els[f] = document.getElementById(f));

// LOAD
async function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const snapshot = await getDocs(colRef);

  snapshot.forEach(d => {
    const p = d.data();
    list.innerHTML += `
      <div class="product">
        <b>${p.name}</b><br>
        ₹${p.discountPrice} <del>₹${p.price}</del><br>
        ID: ${d.id}<br><br>

        <button onclick="editProduct('${d.id}')">Edit</button>
        <button onclick="deleteProduct('${d.id}')">Delete</button>
      </div>
    `;
  });
}

// SAVE
window.saveProduct = async function () {
  const data = {};
  fields.forEach(f => data[f] = els[f].value);
  data.price = +data.price;
  data.discountPrice = +data.discountPrice;
  data.discountPercent = +data.discountPercent;
  data.stock = +data.stock;

  if (editId) {
    await updateDoc(doc(db, "products", editId), data);
    editId = null;
  } else {
    await addDoc(colRef, data); // 🔥 auto unique ID
  }

  clearForm();
  renderProducts();
};

// EDIT
window.editProduct = async function (id) {
  editId = id;
  const snapshot = await getDocs(colRef);
  snapshot.forEach(d => {
    if (d.id === id) {
      const p = d.data();
      fields.forEach(f => els[f].value = p[f]);
    }
  });
};

// DELETE
window.deleteProduct = async function (id) {
  await deleteDoc(doc(db, "products", id));
  renderProducts();
};

function clearForm() {
  fields.forEach(f => els[f].value = "");
}

window.onload = renderProducts;