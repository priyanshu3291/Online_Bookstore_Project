// frontend/js/index.js
document.addEventListener("DOMContentLoaded", async () => {
  const bookList = document.getElementById("bookList");

  // 🧹 Sanitize user storage (avoid corrupt data)
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && (!user.id || typeof user.id !== "number")) {
      localStorage.removeItem("user");
    }
  } catch {
    localStorage.removeItem("user");
  }

  // 🧭 Fetch all books
  try {
    const response = await fetch("http://localhost:8080/api/books");
    if (!response.ok) throw new Error("Failed to fetch books");

    const books = await response.json();

    if (!Array.isArray(books) || books.length === 0) {
      bookList.innerHTML = "<p>No books found.</p>";
      return;
    }

    // Render all book cards
    books.forEach((book) => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p><strong>Price:</strong> ₹${book.price}</p>
        <button class="add-to-cart" data-id="${book.book_id}">🛒 Add to Cart</button>
      `;
      bookList.appendChild(card);
    });

    // Add click handlers for cart buttons
    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          alert("Please login first!");
          window.location.href = "login.html";
          return;
        }

        const bookId = parseInt(btn.dataset.id);
        try {
          const res = await fetch("http://localhost:8080/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: user.id,
              bookId: bookId,
              quantity: 1,
            }),
          });

          const data = await res.json();

          if (res.ok) {
            alert(data.message || "Book added to cart!");
          } else {
            alert("Failed: " + (data.error || "Could not add to cart."));
          }
        } catch (err) {
          console.error("Cart error:", err);
          alert("Server error. Try again later.");
        }
      });
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    bookList.innerHTML = "<p>Failed to load books.</p>";
  }
});
