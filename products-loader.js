/* ================================
   PRODUCTS LOADER (HOME PAGE)
   Static version → Firebase ready
================================ */

// 🔹 Central product source (abhi static)
const PRODUCTS = {
  "silk-rose-scrunchie": {
    id: "silk-rose-scrunchie",
    name: "Silk Rose Scrunchie",
    brand: "Dreamy Scrunch",
    price: 199,
    originalPrice: 299,
    rating: "4.9 / 5",
    link: "products/silk-rose-srcunchie.html"
  }
};

/* ================================
   LOAD HOME FEATURED PRODUCT
================================ */

function loadHomeFeaturedProduct(productId, cardId) {
  const product = PRODUCTS[productId];
  const card = document.getElementById(cardId);

  if (!product || !card) {
    console.warn("Product or card not found:", productId);
    return;
  }

  card.querySelector(".hp-name").innerText = product.name;
  card.querySelector(".hp-brand").innerText = product.brand;
  card.querySelector(".hp-price").innerText = product.price;
  card.querySelector(".hp-original").innerText =
    "₹" + product.originalPrice;

  card.querySelector(".hp-link").href = product.link;
}

/* ================================
   INIT
================================ */

document.addEventListener("DOMContentLoaded", () => {
  loadHomeFeaturedProduct(
    "silk-rose-scrunchie",
    "home-silk-rose-card"
  );
});