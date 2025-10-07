document.addEventListener("DOMContentLoaded", () => {

  async function fetchBooks(query = "") {
    try {
      const res = await fetch(`/api/books?search=${encodeURIComponent(query)}`);
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
          <img src="${b.image || 'assets/images/default-book.jpg'}" alt="${b.title}" style="cursor:pointer;">
          <h3 style="cursor:pointer;">${b.title}</h3>
          <p><strong>${b.author}</strong></p>
          <p>₹${b.price}</p>
          <button class="cart-btn">Add to Cart</button>
        </div>
      `).join("");

      document.querySelectorAll(".book-card").forEach(card => {
        const bookId = card.dataset.id;

        card.querySelector('img').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });
        card.querySelector('h3').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });

        card.querySelector(".cart-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(bookId);
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

  fetchBooks();
});

async function addToCart(bookId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(`/api/cart/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ customer_id: user.id, book_id: parseInt(bookId), quantity: 1 })
  });

  if (res.ok) {
    alert("Book added to cart!");
    // Update header cart count
    const cartCountElem = document.getElementById("cartCount");
    if (cartCountElem) cartCountElem.textContent = parseInt(cartCountElem.textContent) + 1;
  }
}
document.addEventListener("DOMContentLoaded", () => {

  async function fetchBooks(query = "") {
    try {
      const res = await fetch(`/api/books?search=${encodeURIComponent(query)}`);
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
          <img src="${b.image || 'assets/images/default-book.jpg'}" alt="${b.title}" style="cursor:pointer;">
          <h3 style="cursor:pointer;">${b.title}</h3>
          <p><strong>${b.author}</strong></p>
          <p>₹${b.price}</p>
          <button class="cart-btn">Add to Cart</button>
        </div>
      `).join("");

      document.querySelectorAll(".book-card").forEach(card => {
        const bookId = card.dataset.id;

        card.querySelector('img').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });
        card.querySelector('h3').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });

        card.querySelector(".cart-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(bookId);
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

  fetchBooks();
});

async function addToCart(bookId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(`/api/cart/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ customer_id: user.id, book_id: parseInt(bookId), quantity: 1 })
  });

  if (res.ok) {
    alert("Book added to cart!");
    // Update header cart count
    const cartCountElem = document.getElementById("cartCount");
    if (cartCountElem) cartCountElem.textContent = parseInt(cartCountElem.textContent) + 1;
  }
}
document.addEventListener("DOMContentLoaded", () => {

  async function fetchBooks(query = "") {
    try {
      const res = await fetch(`/api/books?search=${encodeURIComponent(query)}`);
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
          <img src="${b.image || 'assets/images/default-book.jpg'}" alt="${b.title}" style="cursor:pointer;">
          <h3 style="cursor:pointer;">${b.title}</h3>
          <p><strong>${b.author}</strong></p>
          <p>₹${b.price}</p>
          <button class="cart-btn">Add to Cart</button>
        </div>
      `).join("");

      document.querySelectorAll(".book-card").forEach(card => {
        const bookId = card.dataset.id;

        card.querySelector('img').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });
        card.querySelector('h3').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });

        card.querySelector(".cart-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(bookId);
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

  fetchBooks();
});

async function addToCart(bookId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(`/api/cart/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ customer_id: user.id, book_id: parseInt(bookId), quantity: 1 })
  });

  if (res.ok) {
    alert("Book added to cart!");
    // Update header cart count
    const cartCountElem = document.getElementById("cartCount");
    if (cartCountElem) cartCountElem.textContent = parseInt(cartCountElem.textContent) + 1;
  }
}
document.addEventListener("DOMContentLoaded", () => {

  async function fetchBooks(query = "") {
    try {
      const res = await fetch(`/api/books?search=${encodeURIComponent(query)}`);
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
          <img src="${b.image || 'assets/images/default-book.jpg'}" alt="${b.title}" style="cursor:pointer;">
          <h3 style="cursor:pointer;">${b.title}</h3>
          <p><strong>${b.author}</strong></p>
          <p>₹${b.price}</p>
          <button class="cart-btn">Add to Cart</button>
        </div>
      `).join("");

      document.querySelectorAll(".book-card").forEach(card => {
        const bookId = card.dataset.id;

        card.querySelector('img').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });
        card.querySelector('h3').addEventListener('click', () => {
          window.location.href = `book-details.html?id=${bookId}`;
        });

        card.querySelector(".cart-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(bookId);
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

  fetchBooks();
});

async function addToCart(bookId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch(`/api/cart/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ customer_id: user.id, book_id: parseInt(bookId), quantity: 1 })
  });

  if (res.ok) {
    alert("Book added to cart!");
    // Update header cart count
    const cartCountElem = document.getElementById("cartCount");
    if (cartCountElem) cartCountElem.textContent = parseInt(cartCountElem.textContent) + 1;
  }
}
