document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const orderItemsContainer = document.getElementById('order-items');
  const grandTotalElem = document.getElementById('grand-total');

  const orderData = JSON.parse(localStorage.getItem(`order_${user.id}`)) || [];

  let total = 0;
  orderItemsContainer.innerHTML = "";

  if (orderData.length === 0) {
    orderItemsContainer.innerHTML = `<tr><td colspan="3">No items in order.</td></tr>`;
    grandTotalElem.textContent = "0";
    return;
  }

  orderData.forEach(item => {
    const row = document.createElement('tr');
    const subtotal = item.book.price * item.quantity;

    row.innerHTML = `
      <td>${item.book.title}</td>
      <td>${item.quantity}</td>
      <td>₹${subtotal}</td>
    `;

    orderItemsContainer.appendChild(row);
    total += subtotal;
  });

  grandTotalElem.textContent = total.toFixed(2);

  document.getElementById("payBtn").addEventListener("click", async () => {
    try {
      const res = await fetch("http://localhost:8080/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: user.id })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Payment failed!");

      alert(`✅ Order placed successfully! Order ID: ${data.orderId}`);

      // Clear order data
      localStorage.removeItem(`order_${user.id}`);

      // Redirect to orders page (you will create this next)
      window.location.href = "orders.html";

    } catch (err) {
      console.error(err);
      alert("Error placing order. Try again.");
    }
  });
});
