// Base URL for backend API
const API_BASE = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------
  // FETCH BOOKS
  // ------------------------------
  async function fetchBooks(query = "") {
    try {
      const response = await fetch(`${API_BASE}/api/books?search=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch books");

      const books = await response.json();
      const bookList = document.getElementById("bookList");

      if (!bookList) return;

      if (books.length === 0) {
        bookList.innerHTML = `
          <p style="text-align:center; color:var(--dark); font-size:1.2rem; margin-top:2rem;">
            No books found. Try adding some!
          </p>`;
        return;
      }

      bookList.innerHTML = books.map(book => `
        <div class="book-card" data-id="${book.book_id}">
          <img src="${book.image || 'assets/images/default-book.jpg'}" alt="${book.title}" style="cursor:pointer;">
          <h3 style="cursor:pointer;">${book.title}</h3>
          <p><strong>${book.author}</strong></p>
          <p>₹${book.price}</p>
          <button class="cart-btn">Add to Cart</button>
        </div>
      `).join("");

      // Attach event listeners
      document.querySelectorAll(".book-card").forEach(card => {
        const bookId = card.dataset.id;

        // Go to book details on image/title click
        card.querySelector('img').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });

        card.querySelector('h3').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });

        // Add to cart
        card.querySelector(".cart-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(bookId);
        });
      });

    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  // ------------------------------
  // SEARCH FUNCTIONALITY
  // ------------------------------
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = document.getElementById("searchInput").value.trim();
      fetchBooks(query);
    });
  }

  // ------------------------------
  // INITIAL LOAD
  // ------------------------------
  fetchBooks();
});


// ------------------------------
// ADD TO CART FUNCTION
// ------------------------------
async function addToCart(bookId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/api/cart/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        customer_id: user.id,
        book_id: parseInt(bookId),
        quantity: 1
      })
    });

    if (response.ok) {
      alert("Book added to cart!");
      const cartCountElem = document.getElementById("cartCount");
      if (cartCountElem) {
        cartCountElem.textContent = parseInt(cartCountElem.textContent) + 1;
      }
    } else {
      alert("Failed to add book to cart");
    }

  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}
