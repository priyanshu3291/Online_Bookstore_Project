document.addEventListener("DOMContentLoaded", () => {
  const orderItemsContainer = document.getElementById('order-items');
  const grandTotalElem = document.getElementById('grand-total');
  const orderData = JSON.parse(localStorage.getItem('cart')) || [];

  if (!orderItemsContainer) return;

  let total = 0;
  orderItemsContainer.innerHTML = '';

  if (orderData.length === 0) {
    orderItemsContainer.innerHTML = `<tr><td colspan="3">No items in order.</td></tr>`;
    grandTotalElem.textContent = "0";
    return;
  }

  orderData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.title || 'Book'}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price ? item.price * item.quantity : 'N/A'}</td>
    `;
    orderItemsContainer.appendChild(row);
    total += item.price ? item.price * item.quantity : 0;
  });

  grandTotalElem.textContent = total.toFixed(2);
  localStorage.removeItem('cart'); // clear cart
  updateCartCount();
});

function updateCartCount() {
  const cartLink = document.getElementById("cartLink");
  if (cartLink) cartLink.innerHTML = `🛒 Cart (0)`;
}
