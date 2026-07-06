// products-data.js

let PRODUCTS = [
  {
    id: 1,
    name: "Pink Velvet Scrunchie",
    price: 199,
    discountPrice: 149,
    discountPercent: 25,
    tagline: "Soft & Premium",
    colours: "Pink, Peach",
    material: "Velvet",
    stock: 20,
    description: "Premium velvet scrunchie for daily & party use.",
    delivery: "Free delivery in 5–7 days"
  },
  {
    id: 2,
    name: "Silk Scrunchie",
    price: 249,
    discountPrice: 199,
    discountPercent: 20,
    tagline: "Smooth Silk Feel",
    colours: "Black, White",
    material: "Silk",
    stock: 15,
    description: "Smooth silk scrunchie prevents hair breakage.",
    delivery: "Delivered in 4–6 days"
  }
];

// 🔐 Load saved data if exists
if (localStorage.getItem("PRODUCTS")) {
  PRODUCTS = JSON.parse(localStorage.getItem("PRODUCTS"));
}