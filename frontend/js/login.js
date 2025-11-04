// frontend/js/login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Login failed: " + (data.error || "Invalid credentials"));
        return;
      }

      // ✅ Extract and store only clean, minimal user data
      const userInfo = {
        id: data.user?.id || data.id,
        name: data.user?.name || data.name,
        email: data.user?.email || data.email,
        role: data.user?.role || data.role || "customer",
      };

      if (!userInfo.id) {
        throw new Error("Invalid user data received from server");
      }

      localStorage.setItem("user", JSON.stringify(userInfo));
      if (data.token) localStorage.setItem("token", data.token);

      alert("Login successful!");

      // ✅ Redirect based on role
      if (userInfo.role.toLowerCase() === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "index.html";
        setTimeout(() => location.reload(), 200);
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");

      // Cleanup any broken or partial session data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  });
});
