document.addEventListener("DOMContentLoaded", () => {
  let allBooks = [];

  async function fetchBooks(query = "") {
    try {
      const res = await fetch(`http://localhost:8080/api/books?search=${encodeURIComponent(query)}`);
      allBooks = await res.json();
      renderBooks(allBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  }

  function renderBooks(books) {
    const grid = document.getElementById("bookGrid") || document.getElementById("bookList");
    if (!grid) return;

    if (books.length === 0) {
      grid.innerHTML = `<p style="text-align:center; color:#555;">No books found.</p>`;
      return;
    }

    grid.innerHTML = books.map(book => `
      <div class="book-card" data-id="${book.book_id}">
        <img src="${book.image_url || 'assets/images/default-book.jpg'}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p><strong>${book.author}</strong></p>
        <p class="price">₹${book.price}</p>
        <div>
          <button class="cart-btn">Add to Cart</button>
        </div>
      </div>
    `).join("");

    document.querySelectorAll(".book-card").forEach(card => {
      const bookId = parseInt(card.dataset.id);

      card.addEventListener("click", e => {
        if (!e.target.classList.contains("cart-btn")) {
          window.location.href = `book-details.html?id=${bookId}`;
        }
      });

      card.querySelector(".cart-btn").addEventListener("click", e => {
        e.stopPropagation();
        addToCart(bookId);
      });
    });
  }

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      fetchBooks(searchInput.value.trim());
    });
  }

  window.filterBooks = () => {
    let filtered = [...allBooks];
    const category = document.getElementById("categoryFilter")?.value;
    const priceSort = document.getElementById("priceFilter")?.value;

    if (category) filtered = filtered.filter(b => (b.category || '').toLowerCase() === category.toLowerCase());
    if (priceSort === "low") filtered.sort((a,b) => a.price - b.price);
    else if (priceSort === "high") filtered.sort((a,b) => b.price - a.price);

    renderBooks(filtered);
  };

  fetchBooks();
});

function addToCart(event, bookId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  // Get user-specific cart from localStorage
  const cartKey = `cart_${user.id}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find(i => i.id === bookId);
  if (existing) existing.quantity += 1;
  else cart.push({ id: bookId, quantity: 1 });

  localStorage.setItem(cartKey, JSON.stringify(cart));

  // Update the cart count dynamically if present
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    cartCountEl.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  alert("Book added to cart!");
}


function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartLink = document.getElementById("cartLink");
  if (cartLink) cartLink.innerHTML = `🛒 Cart (${cart.reduce((a,b)=>a+b.quantity,0)})`;
}
