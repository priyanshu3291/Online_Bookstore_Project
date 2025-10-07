document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user exists and is an admin
  if (!user || user.role !== "admin") {
    alert("Access denied. Admins only.");
    window.location.href = "index.html"; // Redirect non-admins to homepage
    return;
  }

  // OPTIONAL: Update admin header links (if you have header.js for admin pages)
  const headerRight = document.getElementById("header-right");
  if (headerRight) {
    headerRight.innerHTML = `
      <span>Welcome, Admin ${user.full_name}</span>
      <a href="admin-dashboard.html">Dashboard</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }


  const addForm = document.getElementById("addBookForm");
  const editForm = document.getElementById("editBookForm");

  // Detect if this is edit page
  if (editForm) {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");
    if (bookId) loadBook(bookId);

    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const bookId = document.getElementById("book_id").value;
      await saveBook(bookId, true);
    });
  }

  if (addForm) {
    addForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await saveBook(null, false);
    });
  }

  async function loadBook(id) {
    const res = await fetch(`http://localhost:8080/api/books/${id}`);
    const book = await res.json();
    document.getElementById("book_id").value = book.book_id;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("category").value = book.category;
    document.getElementById("price").value = book.price;
    document.getElementById("description").value = book.description;
    document.getElementById("image_url").value = book.image_url;
  }

  async function saveBook(bookId, isEdit) {
    const data = {
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      category: document.getElementById("category").value,
      price: parseFloat(document.getElementById("price").value),
      description: document.getElementById("description").value,
      image_url: document.getElementById("image_url").value
    };

    const url = isEdit ? `http://localhost:8080/api/books/${bookId}` : `http://localhost:8080/api/books/`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert(isEdit ? "Book updated!" : "Book added!");
      window.location.href = "admin-dashboard.html";
    } else {
      alert("Failed to save book.");
    }
  }
});
