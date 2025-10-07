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


  const tableBody = document.querySelector("#booksTable tbody");
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });

  async function loadBooks() {
    try {
      const res = await fetch("http://localhost:8080/api/books");
      const books = await res.json();

      tableBody.innerHTML = "";
      books.forEach(book => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${book.book_id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.category || "N/A"}</td>
          <td>₹${book.price}</td>
          <td>
            <button onclick="editBook(${book.book_id})">Edit</button>
            <button onclick="deleteBook(${book.book_id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load books.");
    }
  }

  window.editBook = (id) => {
    window.location.href = `admin-edit-book.html?id=${id}`;
  };

  window.deleteBook = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/books/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Book deleted!");
        loadBooks();
      } else {
        alert("Failed to delete book.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting book.");
    }
  };

  loadBooks();
});
