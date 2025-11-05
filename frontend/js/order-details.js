document.addEventListener("DOMContentLoaded", loadOrderDetails);

async function loadOrderDetails() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");

  document.getElementById("orderId").textContent = orderId;

  const res = await fetch(`http://localhost:8080/api/orders/${orderId}`);
  const data = await res.json();

  document.getElementById("orderStatus").textContent = data.status;
  document.getElementById("orderDate").textContent = data.order_date?.split("T")[0] || "-";
  document.getElementById("orderTotal").textContent = data.total_amount;

  const tbody = document.getElementById("orderItems");
  tbody.innerHTML = "";

  data.items.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
      </tr>
    `;
  });
}
