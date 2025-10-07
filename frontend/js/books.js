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

    // Add click listeners
    document.querySelectorAll(".book-card").forEach(card => {
      const bookId = card.dataset.id;

      // Click on card navigates to details
      card.addEventListener("click", e => {
        if (!e.target.classList.contains("cart-btn")) {
          window.location.href = `book-details.html?id=${bookId}`;
        }
      });

      // Click on "Add to Cart"
      card.querySelector(".cart-btn").addEventListener("click", e => {
        e.stopPropagation();
        addToCart(e, parseInt(bookId));
      });
    });
  }

  // Search
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      fetchBooks(searchInput.value.trim());
    });
  }

  // Filter by category / price (if on books.html)
  window.filterBooks = () => {
    let filtered = [...allBooks];
    const category = document.getElementById("categoryFilter")?.value;
    const priceSort = document.getElementById("priceFilter")?.value;

    if (category) filtered = filtered.filter(b => b.category?.toLowerCase() === category.toLowerCase());
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

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(i => i.id === bookId);
  if (existing) existing.quantity += 1;
  else cart.push({id: bookId, quantity:1});
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Book added to cart!");
}
