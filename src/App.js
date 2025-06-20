// src/App.js
import React from "react";
import RegisterForm from "./components/MainPage/RegisterForm";
import LoginForm from "./components/MainPage/LoginForm";
import MainPage from "./components/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="title">
          Deli<span className="Ztitle">Z</span>ari
          <span className="Ztitle">Z</span>
        </div>
        <hr />
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/admindash" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
