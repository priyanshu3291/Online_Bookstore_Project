const userId = 1; // replace with logged-in user's ID dynamically

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wishlist-items');

  // Fetch wishlist items from backend
  fetch(`/api/wishlist/${userId}`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = '';

      if (data.length === 0) {
        container.innerHTML = '<p class="empty-message">Your wishlist is empty 😢</p>';
        return;
      }

      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'wishlist-item';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="item-details">
            <h3>${item.title}</h3>
            <p>${item.author}</p>
            <p>$${item.price}</p>
            <div class="wishlist-actions">
              <button class="move-to-cart" data-id="${item.id}">Move to Cart</button>
              <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `;
        container.appendChild(div);
      });

      addEventListeners();
    });

  function addEventListeners() {
    // Remove item
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        fetch(`/api/wishlist/${id}`, { method: 'DELETE' })
          .then(() => e.target.closest('.wishlist-item').remove())
          .finally(checkEmpty);
      });
    });

    // Move item to cart
    document.querySelectorAll('.move-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        fetch(`/api/cart/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: userId, bookId: id })
        })
        .then(() => {
          alert('Moved to cart!');
          e.target.closest('.wishlist-item').remove();
        })
        .finally(checkEmpty);
      });
    });
  }

  function checkEmpty() {
    if (container.children.length === 0) {
      container.innerHTML = '<p class="empty-message">Your wishlist is empty 😢</p>';
    }
  }
});
