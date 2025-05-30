// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const URL =
    process.env.REACT_APP_ENVIORMENT === "product"
      ? "https://deli-back.vercel.app"
      : "http://localhost:5000";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${URL}/users/getUsers`, {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        setError("לא הצלחנו להביא את המשתמשים");
      }
    };

    // בדיקת סוג המשתמש לפי ה-token
    const userData = JSON.parse(atob(token.split(".")[1]));
    if (userData.userType === "admin") {
      fetchUsers();
    } else {
      setError("רק אדמין יכול לצפות בעמוד זה");
    }
  }, [token]);

  const handleDelete = async (userId, username) => {
    const confirm = window.confirm(
      `האם אתה בטוח שאתה רוצה למחוק את המשתמש ${username}?`
    );
    if (!confirm) return;

    try {
      await axios.delete(`${REACT_APP_ENVIORMENT}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      alert("שגיאה במחיקה");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>משתמשים רשומים</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} ({user.userType}) - {user.email}{" "}
            <button onClick={() => handleDelete(user._id, user.username)}>
              מחק
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
