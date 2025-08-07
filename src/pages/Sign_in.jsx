// File: front-end/src/components/Sign_in.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";

export default function Sign_in() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { username, password };

    try {
      const resp = await fetch("http://localhost:8080/signIn", {
        method: "POST",
        credentials: "include",                // ← include cookies in request & accept Set-Cookie
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain"
        },
        body: JSON.stringify(data),
      });

      const msg = await resp.text();

      if (msg === "admin" || msg === "customer") {
        // store username locally if you need it elsewhere
        localStorage.setItem("username", username);
        // use replace: true so the login page isn't kept in history
        navigate(`/${msg}_home`, { replace: true });
      } else {
        alert(msg);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Could not sign in");
    }
  }

  return (
    <div className="signin-container">
      <h4 className="signin-title">Sign In</h4>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="signin-form-group">
          <label className="signin-label" htmlFor="username">Username</label>
          <input
            className="signin-input"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="signin-form-group">
          <label className="signin-label" htmlFor="password">Password</label>
          <input
            className="signin-input"
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="signin-button" type="submit">
          Log In
        </button>

        <p
          className="forgot-password-link"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
      </form>
    </div>
  );
}