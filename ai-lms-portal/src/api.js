// src/api.js
const BASE_URL = "http://localhost:5000";

// ✅ Login user with secure token
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/login-secure`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      // Save JWT token in localStorage
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (err) {
    console.error("loginUser error:", err);
    return { message: "Unable to login, try again" };
  }
};

// ✅ Send chat message to AI backend
export const sendChatMessage = async (message) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { reply: "Please login first" };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      // Handle 401 / 500 errors
      const errData = await res.json();
      return { reply: errData.error || "AI service unavailable" };
    }

    return await res.json();
  } catch (err) {
    console.error("sendChatMessage error:", err);
    return { reply: "Unable to reach AI service" };
  }
};