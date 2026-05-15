import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./UserStyles.css";
import loginBg from "../../assets/login2.jpg"; // Ensure the image path is correct

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        alert("Registered successfully!");
        navigate("/user/login");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Server error or invalid data");
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
      <form className="user-form" onSubmit={handleRegister}>
        <h2>User Register</h2>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/user/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegister;
