document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById("fullname").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      address: document.getElementById("address").value.trim(),
      contact: document.getElementById("contact").value.trim()
    };

    if (!payload.name || !payload.email || !payload.password) {
      alert("Please fill required fields.");
      return;
    }

    try {
      const res = await apiPost("/api/customers", payload);
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
