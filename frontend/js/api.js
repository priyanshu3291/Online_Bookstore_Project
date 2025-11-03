// api.js — Central API helper for Reader's Heaven

const API_BASE_URL = "http://localhost:8080/api";

// Generic POST request
async function postData(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Request failed");
    }

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
