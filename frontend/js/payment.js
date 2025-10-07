const orderItemsContainer = document.getElementById('order-items');
const grandTotalElem = document.getElementById('grand-total');
const orderData = JSON.parse(localStorage.getItem('order')) || [];

function renderOrder() {
  let total = 0;
  orderItemsContainer.innerHTML = '';

  orderData.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.title}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price * item.quantity}</td>
    `;
    orderItemsContainer.appendChild(row);
    total += item.price * item.quantity;
  });

  grandTotalElem.textContent = total;
  localStorage.removeItem('cart'); // clear cart
}

renderOrder();
