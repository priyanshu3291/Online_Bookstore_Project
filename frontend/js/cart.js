document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first to view your cart.");
    window.location.href = "login.html";
    return;
  }

  const cartItemsContainer = document.getElementById("cart-items");
  const grandTotalElem = document.getElementById("grand-total");
  let cartData = [];

  // ✅ Fetch cart data directly from backend
  
  async function fetchCartDetails() {
    try {
      const res = await fetch(`http://localhost:8080/api/cart/${user.id}/`);
      if (!res.ok) throw new Error("Failed to load cart.");

      const data = await res.json();
      cartData = Array.isArray(data) ? data : []; // ensure array
      renderCart();
    } catch (err) {
      console.error("Error fetching cart:", err);
      cartItemsContainer.innerHTML = `<tr><td colspan="6">Failed to load cart.</td></tr>`;
    }
  }


  // ✅ Render cart table
  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (!cartData || cartData.length === 0) {
      cartItemsContainer.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
      grandTotalElem.textContent = 0;
      return;
    }

    cartData.forEach((item) => {
      const book = item.book;
      const row = document.createElement("tr");

      const subtotal = book.price * item.quantity;
      total += subtotal;

      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>₹${book.price}</td>
        <td><input type="number" min="1" value="${item.quantity}" data-id="${item.cart_item_id}"></td>
        <td>₹${subtotal}</td>
        <td><button class="remove-btn" data-id="${item.cart_item_id}">Remove</button></td>
      `;

      cartItemsContainer.appendChild(row);
    });

    grandTotalElem.textContent = total.toFixed(2);
  }

  // ✅ Handle quantity change (local UI update only)
  cartItemsContainer.addEventListener("input", (e) => {
    if (e.target.type === "number") {
      const id = parseInt(e.target.dataset.id);
      const item = cartData.find((i) => i.cart_item_id === id);
      if (item) {
        item.quantity = parseInt(e.target.value);
        renderCart();
      }
    }
  });

  // ✅ Remove item from cart (backend + UI)
  cartItemsContainer.addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = parseInt(e.target.dataset.id);

      if (confirm("Are you sure you want to remove this item?")) {
        try {
          const res = await fetch(`http://localhost:8080/api/cart/remove/${id}`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error("Failed to remove item");
          const data = await res.json();
          alert(data.message || "Item removed.");

          // Remove locally too
          cartData = cartData.filter((i) => i.cart_item_id !== id);
          renderCart();
        } catch (err) {
          console.error("Error removing item:", err);
          alert("Failed to remove item from cart.");
        }
      }
    }
  });


  // ✅ Checkout button handler
  document.querySelector(".checkout-btn")?.addEventListener("click", () => {
    if (cartData.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    localStorage.setItem(`order_${user.id}`, JSON.stringify(cartData));
    window.location.href = "payment.html";
  });

  fetchCartDetails();
});
