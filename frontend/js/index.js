document.addEventListener("DOMContentLoaded", () => {

  async function fetchBooks(query = "") {
    try {
      const res = await fetch(`http://localhost:8080/api/books?search=${encodeURIComponent(query)}`);
      const books = await res.json();

      const list = document.getElementById("bookList");

      if (books.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:var(--dark); font-size:1.2rem; margin-top:2rem;">
                            No books found. Try adding some!
                          </p>`;
        return;
      }

      list.innerHTML = books.map(b => `
        <div class="book-card" data-id="${b.book_id}">
          <img src="${b.image_url || 'assets/images/default-book.jpg'}" alt="${b.title}" style="cursor:pointer;">
          <h3 style="cursor:pointer;">${b.title}</h3>
          <p><strong>${b.author}</strong></p>
          <p>₹${b.price}</p>
          <button class="cart-btn">Add to Cart</button>
        </div>
      `).join("");

      // Add click listener for image/title navigation & cart button
      document.querySelectorAll(".book-card").forEach(card => {
        const bookId = card.dataset.id;

        // Navigate to book details
        card.querySelector('img').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });
        card.querySelector('h3').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });

        // Add to cart
        card.querySelector(".cart-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(e, parseInt(bookId));
        });
      });

    } catch (e) {
      console.error("Error fetching books:", e);
    }
  }

  document.getElementById("searchBtn").addEventListener("click", () => {
    const q = document.getElementById("searchInput").value.trim();
    fetchBooks(q);
  });

  // Initial fetch
  fetchBooks();
});

async function addToCart(event, bookId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(i => i.id === bookId);
  if (existing) existing.quantity += 1;
  else cart.push({id: bookId, quantity: 1});
  localStorage.setItem("cart", JSON.stringify(cart));

  // Animate book flying to cart
  const bookCard = event.target.closest('.book-card');
  const clone = bookCard.cloneNode(true);
  const rect = bookCard.getBoundingClientRect();
  clone.style.position = 'absolute';
  clone.style.top = rect.top + 'px';
  clone.style.left = rect.left + 'px';
  clone.style.width = rect.width + 'px';
  clone.style.zIndex = 1000;
  clone.style.pointerEvents = 'none';
  clone.classList.add('flying-book');
  document.body.appendChild(clone);

  const cartLink = document.getElementById('cartLink');
  const cartRect = cartLink.getBoundingClientRect();
  const deltaX = cartRect.left - rect.left;
  const deltaY = cartRect.top - rect.top;

  clone.style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
  requestAnimationFrame(() => {
    clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
    clone.style.opacity = 0;
  });

  setTimeout(() => {
    document.body.removeChild(clone);
    alert("Book added to cart!");
  }, 800);
}
