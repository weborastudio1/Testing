// products/product-render.js

function renderProducts(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  PRODUCTS.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <a href="product.html?id=${p.id}">View</a>
      </div>
    `;
  });
}