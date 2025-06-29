import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

export const LoginSignup = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("BASE_URL =>", BASE_URL);
    try {
      if (action === "Login") {
        const res = await axios.post(`${BASE_URL}/auth/login`, {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", res.data.token);        
        localStorage.setItem("username", res.data.username);
        alert("Login successful!");
        navigate("/home");
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        const res = await axios.post(`${BASE_URL}/auth/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert("Signup successful!");
        setAction("Login");
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div className="container">
        <div className="header"></div>
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Sign Up" && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={handleChange}
        />
        {action === "Sign Up" && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input-field"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        )}

        {action === "Login"
        //  && (
        //   <div className="forgot-password">
        //     Lost your password? <span>Click Here!</span>
        //   </div>
        // )
        }
      </div>

      <div className="submit-container">
        <button
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </button>
        <button
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Log In
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button className="submit" onClick={handleSubmit}>
          {action}
        </button>
      </div>
    </>
  );
};
