import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Welcome.css"
import Sign_in from "./Sign_in";

export default function Welcome() {
  return (
    <>
      {/* Header/Navbar */}
      <header className="nav-container">
        <div className="logo">SELL-SYNC</div>
        <nav className="nav-links">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/sign_up" className="blink-link">REGISTER</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>SHOP SMART WITH SELL SYNC</h1>
          <p>Big deals. Fast delivery. Zero hassle. Shopping made smarter and stylish.</p>
        </div>

        <Sign_in />

      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-card">
          <h2>Why SELL SYNC?</h2>
          <p>We bring trending products and unbeatable deals to your fingertips. Fast delivery, trusted vendors, and a smooth shopping experience.</p>
          <ul>
            <li>🚚 Fast & Reliable Shipping</li>
            <li>📦 Wide Range of Products</li>
            <li>🎯 Personalized Recommendations</li>
          </ul>
        </div>

        <div className="info-card">
          <h2>What Sets Us Apart?</h2>
          <p>Designed for convenience and optimized for joy. We help you shop faster, smarter, and cheaper. Join a community of sync shoppers!</p>
          <ul>
            <li>💡 Smart Suggestions</li>
            <li>⚡ Lightning Deals</li>
            <li>🛒 Hassle-Free Returns</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/sign_up">REGISTER</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
          <NavLink to="/privacy">PRIVACY POLICY</NavLink>
        </div>
        <p className="footer-credit">
          Copyright ©2025 Created By <strong>DEVI PATIL</strong>
        </p>
      </footer>
    </>
  );
}