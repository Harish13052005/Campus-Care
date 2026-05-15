import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";

const UserHome = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!userName) {
      navigate("/user/login");  // Redirect to login if no user is logged in
    }
  }, [navigate, userName]);

  const handleLogout = () => {
    localStorage.clear();  // Clear user session data
    navigate("/");  // Redirect to home or login page after logout
  };

  return (
    <div className="user-home-wrapper">
      <div className="user-navbar">
        <h2>CampusCare</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="user-home-content">
        <h3>Welcome, {userName || "User"}!</h3>
        <div className="home-buttons">
          <button onClick={() => navigate("/user/submit-complaint")}>Submit Complaint</button>
          <button onClick={() => navigate("/user/my-complaints")}>My Complaints</button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
