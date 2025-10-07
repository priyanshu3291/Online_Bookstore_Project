document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const cartCountEl = document.getElementById("cartCount");
  const wishlistCountEl = document.getElementById("wishlistCount");
  const cartLink = document.getElementById("cartLink");
  const wishlistLink = document.getElementById("wishlistLink");
  const loginLink = document.getElementById("loginLink");
  const headerRight = document.getElementById("header-right");

  function updateHeaderLinks() {
    headerRight.innerHTML = "";

    if (!user) {
      // Not logged in
      headerRight.innerHTML = `
        <a href="login.html" id="loginLink">👤 Login</a>
      `;
      return;
    }

    // Logged in
    if (user.role === "customer") {
      headerRight.innerHTML = `
        <a href="wishlist.html" id="wishlistLink">❤️ Wishlist (<span id="wishlistCount">0</span>)</a>
        <a href="cart.html" id="cartLink">🛒 Cart (<span id="cartCount">0</span>)</a>
        <a href="#" id="logoutLink">👋 Logout</a>
      `;
    } else if (user.role === "admin") {
      headerRight.innerHTML = `
        <a href="admin-dashboard.html" id="adminLink">🛠 Admin Dashboard</a>
        <a href="#" id="logoutLink">👋 Logout</a>
      `;
    }

    // Add logout functionality
    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", () => {
        localStorage.removeItem("user");
        localStorage.removeItem(`cart_${user.id}`);
        localStorage.removeItem(`wishlist_${user.id}`);
        window.location.href = "index.html";
      });
    }
  }

  function updateCounts() {
    if (!user || user.role !== "customer") return;

    const cartData = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
    const wishlistData = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];

    const cartCountEl = document.getElementById("cartCount");
    const wishlistCountEl = document.getElementById("wishlistCount");

    if (cartCountEl) cartCountEl.textContent = cartData.reduce((sum, i) => sum + i.quantity, 0);
    if (wishlistCountEl) wishlistCountEl.textContent = wishlistData.length;
  }

  // Redirect cart/wishlist clicks if not logged in or admin
  document.body.addEventListener("click", (e) => {
    if (e.target.id === "cartLink" || e.target.id === "wishlistLink") {
      if (!user) {
        e.preventDefault();
        alert("Please login first.");
        window.location.href = "login.html";
      } else if (user.role === "admin") {
        e.preventDefault();
        alert("Admins do not have a cart/wishlist.");
      }
    }
  });

  updateHeaderLinks();
  updateCounts();
});
