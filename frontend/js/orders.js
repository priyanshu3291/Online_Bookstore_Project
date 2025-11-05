document.addEventListener("DOMContentLoaded", loadOrders);

async function loadOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const container = document.getElementById("ordersList");

  if (!user) {
    container.innerHTML = "<p>Please login to view your orders.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:8080/api/orders/customer/${user.id}`);
    const orders = await res.json();

    if (!Array.isArray(orders) || orders.length === 0) {
      container.innerHTML = "<p>No orders found.</p>";
      return;
    }

    container.innerHTML = "";

    orders.forEach(order => {
      const div = document.createElement("div");
      div.className = "order-card";

      const cancelBtn = 
        (order.status === "Pending" || order.status === "Confirmed")
        ? `<button class="btn-small" onclick="cancelOrder(${order.orderId})">Cancel Order</button>`
        : "";

      div.innerHTML = `
        <h3>Order #${order.orderId}</h3>
        <span><b>Date:</b> ${order.order_date?.split("T")[0] || "-"}</span>
        <span><b>Status:</b> ${order.status}</span>
        <span><b>Total:</b> ₹${order.total_amount}</span>
        <br>
        <button class="btn-small" onclick="viewOrder(${order.orderId})">View Details</button>
        ${cancelBtn}
      `;
      
      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p style="color:red">Failed to load orders.</p>`;
  }
}

function viewOrder(id) {
  window.location.href = `order-details.html?orderId=${id}`;
}

// ✅ Cancel Order Function
async function cancelOrder(orderId) {
  if (!confirm("Are you sure you want to cancel this order?")) return;

  const res = await fetch(`http://localhost:8080/api/orders/cancel/${orderId}`, {
    method: "PUT"
  });

  const data = await res.json();
  alert(data.message || data.error);

  loadOrders(); // Refresh orders
}
