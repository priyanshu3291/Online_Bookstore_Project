document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const headerRight = document.getElementById("header-right");

  if (user) {
    headerRight.innerHTML = `
      <span style="color:white; margin-right:1rem;">Welcome, ${user.name || "Reader"}</span>
      <a href="cart.html" id="cartLink">🛒 Cart</a>
      <a href="#" id="logoutLink">🚪 Logout</a>
    `;

    document.getElementById("logoutLink").addEventListener("click", () => {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      window.location.reload();
    });
  } else {
    headerRight.innerHTML = `
      <a href="cart.html" id="cartLink">🛒 Cart</a>
      <a href="login.html" id="loginLink">👤 Login</a>
    `;
  }
});
