import React, { useState } from 'react';
import './AdminStyles.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import loginBg from "../../assets/login2.jpg"; // ✅ same image as user login/register

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      console.log("Response from server:", res.data);

      const { admin } = res.data;

      if (res.data) {
        localStorage.setItem("adminId", admin._id);
        localStorage.setItem("adminName", admin.name);
        alert("Login successful!");

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 100);
      } else {
        alert("Login failed: Unexpected response from server.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials or server error.");
    }
  };

  return (
    <div
      className="admin-auth-container"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="auth-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
