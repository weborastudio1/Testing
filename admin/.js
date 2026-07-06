let products = [];

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function addProduct() {
  const name = document.getElementById('pName').value;
  const price = document.getElementById('pPrice').value;
  const image = document.getElementById('pImage').value;
  const desc = document.getElementById('pDesc').value;

  if (!name || !price) {
    alert("Name & Price required");
    return;
  }

  const product = { name, price, image, desc };
  products.push(product);

  document.getElementById('totalProducts').innerText = products.length;
  renderProducts();

  document.getElementById('pName').value = "";
  document.getElementById('pPrice').value = "";
  document.getElementById('pImage').value = "";
  document.getElementById('pDesc').value = "";
}

function renderProducts() {
  const list = document.getElementById('productList');
  list.innerHTML = "";

  products.forEach((p, i) => {
    list.innerHTML += `
      <div class="product-item">
        <b>${p.name}</b> - ₹${p.price}
        <br>
        <small>${p.desc}</small>
      </div>
    `;
  });
}
