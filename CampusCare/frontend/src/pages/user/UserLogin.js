import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserStyles.css";
import { Link } from "react-router-dom";
import loginBg from "../../assets/login2.jpg"; // Make sure this path is correct

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      console.log("Response from server:", res.data);
      const { userId, name } = res.data;

      if (userId) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", name);
        alert("Login successful!");

        setTimeout(() => {
          navigate("/user/home");
        }, 100);
      } else {
        alert("Login failed: Unexpected response from server.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "Invalid credentials or server error.");
    }
  };

  return (
    <div
      className="user-container"
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
      <form className="user-form" onSubmit={handleLogin}>
        <h2>User Login</h2>
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
        <p>
          Don’t have an account? <Link to="/user/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
