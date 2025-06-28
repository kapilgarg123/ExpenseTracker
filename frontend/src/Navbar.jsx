import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/home")}>
        <FaHome className="navbar-icon" />
        <h2 className="navbar-title">Home</h2>
      </div>
      <div className="navbar-right">
        {token ? (
          <>
            <FaUserCircle className="navbar-icon" />
            <span className="navbar-username">{username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="logout-icon" />
              Logout
            </button>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogin}>
            <FaSignInAlt className="logout-icon" />
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;