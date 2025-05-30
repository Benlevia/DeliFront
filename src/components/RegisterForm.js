// src/components/RegisterForm.js
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "", // ✅ נוסיף את שדה הטלפון
    userType: "customer",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const URL =
    process.env.REACT_APP_ENVIORMENT === "product"
      ? "https://deli-back.vercel.app"
      : "http://localhost:5000";
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ פונקציית ולידציה לטלפון ישראלי
  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/[^0-9]/g, ""); // מנקה תווים לא מספריים
    return /^05\d{8}$/.test(cleaned);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ בדיקת טלפון לפני שליחה
    if (!isValidPhone(formData.phone)) {
      setError("❌ מספר טלפון לא תקין. השתמש בפורמט כמו 0521234567");
      return;
    }

    try {
      setError(""); // ננקה שגיאה קודמת
      const res = await axios.post(`${URL}/users/register`, formData, {
        withCredentials: true,
      });

      setMessage(`✅ ${res.data.message}, Token: ${res.data.token}`);
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Error occurred"}`);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone (e.g., 0521234567)"
          onChange={handleChange}
          required
        />
        <select name="userType" onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
          <option value="deleveryguy">Delivery Guy</option>
        </select>
        <button type="submit">Register</button>
      </form>

      {/* הודעת שגיאה או הצלחה */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
