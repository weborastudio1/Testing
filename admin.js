// admin.js

let editId = null;

function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  PRODUCTS.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <b>${p.name}</b> (ID: ${p.id})<br>
        ₹${p.discountPrice} <del>₹${p.price}</del> (${p.discountPercent}% OFF)<br>
        Stock: ${p.stock}<br><br>

        <button class="action-btn" onclick="editProduct(${p.id})">Edit</button>
        <button class="action-btn" onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    `;
  });
}

function saveProduct() {
  const data = {
    id: editId ?? Date.now(),
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
    const index = PRODUCTS.findIndex(p => p.id === editId);
    PRODUCTS[index] = data;
  } else {
    PRODUCTS.push(data);
  }

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
  PRODUCTS = PRODUCTS.filter(p => p.id !== id);
  renderProducts();
}

function clearForm() {
  editId = null;
  document.querySelectorAll("input, textarea").forEach(e => e.value = "");
}

window.onload = renderProducts;