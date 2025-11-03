// register.js — Handles registration form submission

document.querySelector("#registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    full_name: document.querySelector("#fullname").value.trim(),
    email: document.querySelector("#email").value.trim(),
    password: document.querySelector("#password").value.trim(),
    address: document.querySelector("#address").value.trim(),
    contact_number: document.querySelector("#contact").value.trim(),
  };

  try {
    const response = await postData("/auth/register", data);
    alert("Registration successful! Redirecting to login...");
    window.location.href = "login.html";
  } catch (err) {
    alert("Registration failed: " + err.message);
  }
});
