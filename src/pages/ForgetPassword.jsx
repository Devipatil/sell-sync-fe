import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../styles/ForgotPassword.css"


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const navigate = useNavigate();

     const handleSendOtp = async () => {
  const response = await fetch(`http://localhost:8080/send-otp?email=${encodeURIComponent(email)}`, {
    method: "POST",
  });
  
  const result = await response.text();

  if (result === "success") {
    setOtpSent(true);
    alert("OTP sent to your email.");
  } else {
    alert(result); // Just show the plain error string
  }
};

  const handleVerifyOtp = () => {
    if (otp === serverOtp) {
      navigate("/resetPassword", { state: { email } });
    } else {
      alert("Invalid OTP");
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
  
    <div className="forgot-password-container">
      <h4>Forgot Password</h4>
      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
      </>
  );
}