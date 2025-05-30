// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const URL =
    process.env.REACT_APP_ENVIRONMENT === "product"
      ? "https://deli-back.vercel.app"
      : "http://localhost:5000";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/users/login`, formData, {
        withCredentials: true,
      });
      setMessage(`✅ ${res.data.message}, Token: ${res.data.token}`);
      localStorage.setItem("token", res.data.token);
      navigate("/admindash");
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || "Error occurred"}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
