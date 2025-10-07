const customerId = JSON.parse(localStorage.getItem("user"))?.id;

if (!customerId) {
  alert("Please login to view your wishlist.");
  window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wishlist-items');

  async function fetchWishlist() {
    try {
      const res = await fetch(`/api/wishlist/${customerId}`);
      const data = await res.json();
      renderWishlist(data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      container.innerHTML = `<p style="text-align:center; color:red;">Failed to load wishlist.</p>`;
    }
  }

  function renderWishlist(data) {
    container.innerHTML = '';

    if (!data || data.length === 0) {
      container.innerHTML = '<p class="empty-message">Your wishlist is empty 😢</p>';
      return;
    }

    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'wishlist-item';
      div.innerHTML = `
        <img src="${item.image || 'assets/images/default-book.jpg'}" alt="${item.title}">
        <div class="item-details">
          <h3>${item.title}</h3>
          <p>${item.author || 'Unknown Author'}</p>
          <p>₹${item.price || 'N/A'}</p>
          <div class="wishlist-actions">
            <button class="move-to-cart" data-id="${item.book_id}" data-wishlist="${item.wishlist_id}">Move to Cart</button>
            <button class="remove-item" data-id="${item.wishlist_id}">Remove</button>
          </div>
        </div>
      `;
      container.appendChild(div);
    });

    addEventListeners();
  }

  function addEventListeners() {
    // Remove from wishlist
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const wishlistId = parseInt(e.target.dataset.id);
        try {
          await fetch(`/api/wishlist/${wishlistId}`, { method: 'DELETE' });
          fetchWishlist();
        } catch (err) {
          console.error("Error removing item:", err);
        }
      });
    });

    // Move to cart
    document.querySelectorAll('.move-to-cart').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const bookId = parseInt(e.target.dataset.id);
        const wishlistId = parseInt(e.target.dataset.wishlist);

        try {
          // Add to cart
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existing = cart.find(i => i.id === bookId);
          if (existing) existing.quantity += 1;
          else cart.push({ id: bookId, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount();

          // Remove from wishlist in backend
          await fetch(`/api/wishlist/${wishlistId}`, { method: 'DELETE' });
          fetchWishlist();

          alert("Book moved to cart!");
        } catch (err) {
          console.error("Error moving item to cart:", err);
        }
      });
    });
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartLink = document.getElementById("cartLink");
    if (cartLink) cartLink.innerHTML = `🛒 Cart (${cart.reduce((a,b)=>a+b.quantity,0)})`;
  }

  fetchWishlist();
});
