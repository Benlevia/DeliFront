// src/App.js
import React from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>DeliZariz User System</h1>
        <RegisterForm />
        <hr />
        <LoginForm />
      </div>
      <Routes>
        <Route path="/admindash" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
