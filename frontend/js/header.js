// frontend/js/header.js
document.addEventListener("DOMContentLoaded", () => {
  const headerRight = document.getElementById("header-right");

  // Try reading user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.email) {
    // Logged-in view
    headerRight.innerHTML = `
      <a href="index.html" class="nav-link">🏠 Home</a>
      <a href="wishlist.html" class="nav-link">❤️ Wishlist</a>
      <a href="cart.html" class="nav-link">🛒 Cart</a>
      ${user.role && user.role.toLowerCase() === "admin" ? `<a href="admin-dashboard.html" class="nav-link">⚙️ Admin</a>` : ""}
      <button id="logoutBtn" class="btn btn-logout">🚪 Logout</button>
    `;

    // Logout logic
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      alert("You have been logged out!");
      window.location.href = "login.html";
    });

  } else {
    // Logged-out view
    headerRight.innerHTML = `
      <a href="login.html" class="nav-link">👤 Login</a>
      <a href="register.html" class="nav-link">📝 Register</a>
    `;
  }
});
