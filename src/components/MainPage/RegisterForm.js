// src/components/RegisterForm.js
import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const URL =
    process.env.REACT_APP_ENVIRONMENT === "product"
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
      navigate("/signin"); // ✅ נוודא שהניווט מתבצע רק לאחר הצלחה
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Error occurred"}`);
    }
  };

  return (
    <div className="auth-container">
      <span className="subtitle">Register</span>
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
        <button className="command-button" type="submit">
          Register
        </button>
      </form>

      {/* הודעת שגיאה או הצלחה */}
      <span className="auth-error">{error}</span>
      {message && <p className="auth-error">{message}</p>}
    </div>
  );
};

export default RegisterForm;
