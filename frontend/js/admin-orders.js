document.addEventListener("DOMContentLoaded", loadAdminOrders);

async function loadAdminOrders() {
  const res = await fetch("http://localhost:8080/api/orders");
  const orders = await res.json();

  const tbody = document.getElementById("order-table");
  tbody.innerHTML = "";

  orders.forEach(o => {
    tbody.innerHTML += `
      <tr>
        <td>${o.orderId}</td>
        <td>${o.customer.fullName}</td>
        <td>₹${o.total_amount}</td>
        <td>${o.status}</td>
        <td>
          <select onchange="updateStatus(${o.orderId}, this.value)">
            <option>Choose</option>
            <option value="Confirmed">Confirm</option>
            <option value="Shipped">Ship</option>
            <option value="Delivered">Deliver</option>
            <option value="Cancelled">Cancel</option>
          </select>
        </td>
      </tr>
    `;
  });
}

async function updateStatus(orderId, status) {
  const res = await fetch(`http://localhost:8080/api/orders/update-status/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  const data = await res.json();
  alert(data.message || data.error);
  loadAdminOrders();
}
