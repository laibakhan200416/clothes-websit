
const products = [
  { id: 1, name: "Girls Pink Suit", price: 55.00, img: "https://i.pinimg.com/550x/0c/a9/db/0ca9dbfb3031de67e48922a00903088c.jpg" },
  { id: 2, name: "Girls White Trousers", price: 35.00, img: "https://assets.ajio.com/medias/sys_master/root/20210403/zu6C/60698c4caeb269a9e345929a/-1117Wx1400H-461674458-white-MODEL.jpg" },
  { id: 3, name: "Boys Navy Suit", price: 65.00, img: "https://ae01.alicdn.com/kf/HTB1pP48PVXXXXXVXFXXq6xXFXXX5/Latest-Coat-Pant-Designs-Navy-Blue-Formal-Bridegroom-Custom-Made-Wedding-Suit-For-Men-Slim-Fit.jpg" },
  { id: 4, name: "Boys Casual Trousers", price: 30.00, img: "https://tse2.mm.bing.net/th?id=OIP.A-f56-zJbSUmXDfdYKADHAHaHa&pid=Api&P=0&h=220" },
  { id: 5, name: "Girls Yellow Dress", price: 40.00, img: "https://tse1.mm.bing.net/th?id=OIP.3gh4F8OvSdHrdkR1_CyicwHaJy&pid=Api&P=0&h=220 " },
  { id: 6, name: "Boys Red T-shirt", price: 25.00, img: " https://tse4.mm.bing.net/th?id=OIP.KUcSawZVpyXS1xhKu6JOsgHaLF&pid=Api&P=0&h=220" },
  { id: 7, name: "Boys Blue Hoodie", price: 45.00, img: " https://tse3.mm.bing.net/th?id=OIP.df4xDwViTHSsdLFf89fsuAHaHa&pid=Api&P=0&h=220" },
  { id: 8, name: "Girls Floral Top", price: 33.00, img: " https://tse2.mm.bing.net/th?id=OIP.L17Vf_LfIml5_EHZzNaPygHaJ3&pid=Api&P=0&h=220" },
  { id: 9, name: "Boys Black Jeans", price: 50.00, img: " https://tse4.mm.bing.net/th?id=OIP.rA0j7uGs6Ps2mH408PwNNgHaHa&pid=Api&P=0&h=220" },
  { id: 10, name: "Girls White Sneakers", price: 60.00, img: "https://tse4.mm.bing.net/th?id=OIP.lpCM_W-oITN_Nz4GDZs7egHaHa&pid=Api&P=0&h=220 " },
  { id: 11, name: "Boys Grey Sweatshirt", price: 38.00, img: " https://tse4.mm.bing.net/th?id=OIP.T-IR7khMhMVUlCguiYMD-AHaHa&pid=Api&P=0&h=220" },
  { id: 12, name: "Girls Denim Jacket", price: 70.00, img: " https://tse3.mm.bing.net/th?id=OIP.tIKXdOElg0f0MSveoNyUtwHaHa&pid=Api&P=0&h=220" },
  { id: 13, name: "Boys White Shirt", price: 42.00, img: "  http://cdn.shopify.com/s/files/1/2077/2353/products/Long_Sleeve_Shirt_Blouse_1024x1024.png?v=1576508357" },
  { id: 14, name: "Girls Pink Shoes", price: 55.00, img: " https://i.etsystatic.com/8719236/r/il/0854cc/4223081595/il_1588xN.4223081595_p7c5.jpg" }
];


let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render Products
function renderProductList() {
  const container = document.getElementById("product-list");
  if (container) {
    container.innerHTML = "";
    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="buyNow(${product.id})">Buy Now</button>
      `;
      container.appendChild(div);
    });
  }
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Update cart count and save cart in localStorage
function updateCart() {
  const count = document.getElementById("cart-count");
  if (count) {
    count.textContent = cart.length;
  }

  // Save cart items in localStorage for checkout page
  localStorage.setItem('cart', JSON.stringify(cart));

  // Save total amount in localStorage (for payment page)
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  localStorage.setItem('totalAmount', totalAmount.toFixed(2));
}

// Render cart items on cart page
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartContainer && total) {
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cartData.forEach((item, index) => {
      totalPrice += item.price;
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.img}" width="50" height="50" />
        ${item.name} - $${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartContainer.appendChild(li);
    });

    total.textContent = `Total: $${totalPrice.toFixed(2)}`;
  }
}

// Buy now button
function buyNow(id) {
  addToCart(id);
  alert("Redirecting to checkout...");
  window.location.href = "checkout.html";
}

// Handle contact form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thanks for contacting us! We'll get back to you soon.");
    this.reset();
  });
}

// On DOM Loaded
document.addEventListener("DOMContentLoaded", renderProductList);

// Payment page total amount
window.addEventListener("load", function() {
  const totalAmount = localStorage.getItem('totalAmount');
  const totalAmountElement = document.getElementById('total-amount');
  
  if (totalAmount && totalAmountElement) {
    totalAmountElement.textContent = `$${totalAmount}`;
  }

  // Render cart items on checkout page
  if (window.location.pathname.includes("checkout.html")) {
    renderCart();
  }
});

// Cart Sidebar functionality
function toggleCart() {
  const sidebar = document.getElementById("cart-sidebar");
  sidebar.classList.toggle("show");
  updateCart();
}

// Render cart items inside the sidebar
function renderCartSidebar() {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total-amount-sidebar");

  if (cartItemsDiv && totalAmount) {
    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
      totalPrice += item.price;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" width="50" height="50" />
        ${item.name} - $${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
    });

    totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
  }
}



