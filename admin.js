// admin.js
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

// DOM
const name = document.getElementById("name");
const price = document.getElementById("price");
const discountPrice = document.getElementById("discountPrice");
const discountPercent = document.getElementById("discountPercent");
const tagline = document.getElementById("tagline");
const colours = document.getElementById("colours");
const material = document.getElementById("material");
const stock = document.getElementById("stock");
const description = document.getElementById("description");
const delivery = document.getElementById("delivery");

// ================= LOAD =================
async function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const snapshot = await getDocs(colRef);

  snapshot.forEach(docu => {
    const p = docu.data();

    list.innerHTML += `
      <div class="product">
        <b>${p.name}</b><br>
        ₹${p.discountPrice} <del>₹${p.price}</del><br>
        Stock: ${p.stock}<br><br>

        <button onclick="editProduct('${docu.id}')">Edit</button>
        <button onclick="deleteProduct('${docu.id}')">Delete</button>
      </div>
    `;
  });
}

// ================= SAVE =================
window.saveProduct = async function () {
  const data = {
    name: name.value,
    price: +price.value,
    discountPrice: +discountPrice.value,
    discountPercent: +discountPercent.value,
    tagline: tagline.value,
    colours: colours.value,
    material: material.value,
    stock: +stock.value,
    description: description.value,
    delivery: delivery.value
  };

  if (editId) {
    await updateDoc(doc(db, "products", editId), data);
    editId = null;
  } else {
    await addDoc(colRef, data);
  }

  clearForm();
  renderProducts();
};

// ================= EDIT =================
window.editProduct = async function (id) {
  editId = id;

  const snapshot = await getDocs(colRef);
  snapshot.forEach(d => {
    if (d.id === id) {
      const p = d.data();
      name.value = p.name;
      price.value = p.price;
      discountPrice.value = p.discountPrice;
      discountPercent.value = p.discountPercent;
      tagline.value = p.tagline;
      colours.value = p.colours;
      material.value = p.material;
      stock.value = p.stock;
      description.value = p.description;
      delivery.value = p.delivery;
    }
  });
};

// ================= DELETE =================
window.deleteProduct = async function (id) {
  await deleteDoc(doc(db, "products", id));
  renderProducts();
};

function clearForm() {
  document.querySelectorAll("input, textarea").forEach(e => e.value = "");
}

window.onload = renderProducts;