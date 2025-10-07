document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");

  if (!bookId) {
    document.getElementById("bookDetails").innerHTML = `<p style="color:red; text-align:center;">Book not found!</p>`;
    return;
  }

  try {
    const res = await fetch(`http://localhost:8080/api/books/${bookId}`);
    const book = await res.json();

    if (!book || !book.book_id) {
      document.getElementById("bookDetails").innerHTML = `<p style="color:red; text-align:center;">Book not found!</p>`;
      return;
    }

    const detailsContainer = document.getElementById("bookDetails");
    detailsContainer.innerHTML = `
      <img src="${book.image_url || 'assets/images/default-book.jpg'}" alt="${book.title}">
      <div class="book-info">
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category || 'N/A'}</p>
        <p class="price">₹${book.price}</p>
        <p>${book.description || 'No description available.'}</p>
        <button id="addCartBtn">Add to Cart</button>
      </div>
    `;

    // Add to Cart
    document.getElementById("addCartBtn").addEventListener("click", (e) => {
      addToCart(e, parseInt(book.book_id));
    });

  } catch (err) {
    console.error("Error fetching book:", err);
    document.getElementById("bookDetails").innerHTML = `<p style="color:red; text-align:center;">Error loading book details.</p>`;
  }
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
  else cart.push({id: bookId, quantity: 1});
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Book added to cart!");
}
