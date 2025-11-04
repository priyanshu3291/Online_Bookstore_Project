// register.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      // these names match your backend Customer.getFullName(), getEmail(), getPassword()
      fullName: document.getElementById("fullname").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      // optional fields sent if present (backend can ignore extra fields)
      address: document.getElementById("address").value.trim(),
      contactNumber: document.getElementById("contact").value.trim()
    };

    // minimal client-side validation
    if (!payload.fullName || !payload.email || !payload.password) {
      alert("Please fill required fields.");
      return;
    }

    try {
      const res = await apiPost("/api/auth/register", payload);
      if (res.ok) {
        alert("Registration successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        const body = await res.json().catch(() => null);
        const msg = body?.error || (await res.text()) || "Registration failed";
        alert("Registration failed: " + msg);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  });
});
