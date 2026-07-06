// admin.js

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

let editId = null;

function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  PRODUCTS.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <strong>${p.name}</strong> (ID: ${p.id})<br>
        ₹${p.discountPrice} <del>₹${p.price}</del> • ${p.discountPercent}% OFF<br>
        Stock: ${p.stock}<br><br>

        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    `;
  });
}

function saveProduct() {
  if (!name.value || !price.value) {
    alert("Name & Price required");
    return;
  }

  const data = {
    id: editId ?? Date.now(),
    name: name.value,
    price: Number(price.value),
    discountPrice: Number(discountPrice.value),
    discountPercent: Number(discountPercent.value),
    tagline: tagline.value,
    colours: colours.value,
    material: material.value,
    stock: Number(stock.value),
    description: description.value,
    delivery: delivery.value
  };

  if (editId) {
    const index = PRODUCTS.findIndex(p => p.id === editId);
    PRODUCTS[index] = data;
  } else {
    PRODUCTS.push(data);
  }

  localStorage.setItem("PRODUCTS", JSON.stringify(PRODUCTS));

  clearForm();
  renderProducts();
}

function editProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  editId = id;

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

function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;

  PRODUCTS = PRODUCTS.filter(p => p.id !== id);
  localStorage.setItem("PRODUCTS", JSON.stringify(PRODUCTS));
  renderProducts();
}

function clearForm() {
  editId = null;
  document.querySelectorAll("input, textarea").forEach(e => e.value = "");
}

window.onload = renderProducts;