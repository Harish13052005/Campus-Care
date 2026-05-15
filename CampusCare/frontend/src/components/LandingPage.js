import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// Centered image
import collegeImage from '../assets/kits.jpg'; // Your image for the campus
//import background from '../assets/background.jpg'; // Your background image


const LandingPage = () => {
  const navigate = useNavigate();

  return ( 
    <div className="landing-background">
      <div className="landing-wrapper">
        <div className="landing-welcome-text">
          <h3>Welcome to</h3>
          <h1 className="landing-title">CAMPUS CARE</h1>
        </div>
        <div className="landing-box">
          <img src={collegeImage} alt="Campus" className="landing-img" />
          <div className="landing-buttons">
            <button onClick={() => navigate('/user/login')} className="landing-btn">User</button>
            <button onClick={() => navigate('/admin/login')} className="landing-btn">Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
