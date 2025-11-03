document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      fullName: document.querySelector("#fullname").value.trim(),
      email: document.querySelector("#email").value.trim(),
      password: document.querySelector("#password").value.trim()
    };

    // quick frontend validation
    if (!data.fullName || !data.email || !data.password) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert("Registration successful! Redirecting to login...");
        window.location.href = "login.html";
      } else {
        const msg = await res.text();
        alert("Registration failed: " + msg);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Server error. Please try again later.");
    }
  });
});
