document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user exists and is an admin
  if (!user || user.role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "index.html"; // Redirect non-admins to homepage
    return;
  }

  // OPTIONAL: Update admin header links (if you have header.js for admin pages)
  const headerRight = document.getElementById("header-right");
  if (headerRight) {
    headerRight.innerHTML = `
      <span>Welcome, Admin ${user.full_name}</span>
      <a href="admin-dashboard.html">Dashboard</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }


  const ordersTableBody = document.querySelector("#ordersTable tbody");
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });

  async function loadOrders() {
    try {
      const res = await fetch("http://localhost:8080/api/orders");
      const orders = await res.json();

      ordersTableBody.innerHTML = "";
      orders.forEach(order => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${order.order_id}</td>
          <td>${order.customer_name}</td>
          <td>${order.book_title}</td>
          <td>${order.quantity}</td>
          <td>₹${order.total}</td>
          <td>
            <select onchange="updateStatus(${order.order_id}, this.value)">
              <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
              <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>Shipped</option>
              <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
            </select>
          </td>
        `;
        ordersTableBody.appendChild(tr);
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load orders.");
    }
  }

  window.updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!res.ok) alert("Failed to update status.");
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    }
  };

  loadOrders();
});
