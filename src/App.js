// src/App.js
import React from "react";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>DeliZariz User System</h1>
      <RegisterForm />
      <hr />
      <LoginForm />
    </div>
  );
}

export default App;
