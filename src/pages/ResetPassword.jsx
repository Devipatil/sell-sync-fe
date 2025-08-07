import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/ResetPassword.css"

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const email = location.state?.email;

  const handleReset = async () => {
    const res = await fetch("http://localhost:8080/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const result = await res.text();
    alert(result);
    if (result.includes("success")) {
      navigate("/sign_in");
    }
  };

  return (
    <>
    <header className="nav-container">
        <div className="logo">SELL-SYNC</div>
        <nav className="nav-links">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/sign_up" className="blink-link">REGISTER</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
        </nav>
      </header>
    <div className="reset-password-container">
  <h4>Reset Password</h4>

  <input
    type="password"
    placeholder="Enter your new password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
  />

  <input
    type="password"
    placeholder="Re-enter your new password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />

  {newPassword && confirmPassword && newPassword !== confirmPassword && (
    <p style={{ color: 'red' }}>Passwords do not match</p>
  )}

  <button
    onClick={handleReset}
    disabled={!newPassword || newPassword !== confirmPassword}
  >
    Update Password
  </button>
</div>

    </>
  );
}