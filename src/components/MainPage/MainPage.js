// src/pages/Auth/MainPage.js or similar
import React from "react";
import "./Auth.css";
import logo from "../../assets/images/logo.png"; // Assuming relative path is correct
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <img className="logo" src={logo} alt="Logo" />
      <div className="buttons">
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="auth-green-button"
        >
          Sign up
        </button>
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className="auth-button"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default MainPage;
