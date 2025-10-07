document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert('Please login first to view your cart.');
    window.location.href = 'login.html';
    return;
  }

  let cartData = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const grandTotalElem = document.getElementById('grand-total');

  async function fetchCartDetails() {
    if (cartData.length === 0) return renderCart();

    try {
      const res = await fetch('http://localhost:8080/api/books');
      const allBooks = await res.json();

      cartData = cartData.map(item => {
        const book = allBooks.find(b => b.book_id === item.id);
        return {...book, quantity: item.quantity};
      });

      renderCart();
    } catch (err) {
      console.error(err);
    }
  }

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cartData.length === 0) {
      cartItemsContainer.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
      grandTotalElem.textContent = 0;
      return;
    }

    cartData.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.author}</td>
        <td>₹${item.price}</td>
        <td><input type="number" min="1" value="${item.quantity}" data-id="${item.book_id}"></td>
        <td>₹${item.price * item.quantity}</td>
        <td><button class="remove-btn" data-id="${item.book_id}">Remove</button></td>
      `;
      cartItemsContainer.appendChild(row);
      total += item.price * item.quantity;
    });

    grandTotalElem.textContent = total;
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartData));
  }

  cartItemsContainer.addEventListener('input', e => {
    if(e.target.type === 'number') {
      const id = parseInt(e.target.dataset.id);
      const item = cartData.find(i => i.book_id === id);
      item.quantity = parseInt(e.target.value);
      renderCart();
    }
  });

  cartItemsContainer.addEventListener('click', e => {
    if(e.target.classList.contains('remove-btn')) {
      const id = parseInt(e.target.dataset.id);
      cartData = cartData.filter(i => i.book_id !== id);
      renderCart();
    }
  });

  function proceedToPayment() {
    if (cartData.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    localStorage.setItem(`order_${user.id}`, JSON.stringify(cartData));
    window.location.href = 'payment.html';
  }

  // Bind checkout button
  document.querySelector('.checkout-btn')?.addEventListener('click', proceedToPayment);

  fetchCartDetails();
});
