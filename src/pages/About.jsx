import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css"; // External CSS
import { NavLink } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
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

            <div className="about-container">
                <h1 className="about-heading">About SellSync</h1>
                <p className="about-paragraph">
                    <strong>Welcome to SellSync – Where Smart Shopping Begins!</strong>
                </p>

                <p className="about-paragraph">
                    At <strong>SellSync</strong>, we believe that shopping should be easy,
                    affordable, and exciting. Whether you're looking for the latest fashion trends,
                    must-have gadgets, home essentials, or exclusive deals, we’ve got something
                    for everyone.
                </p>

                <h2 className="about-subheading">What Makes Us Different?</h2>
                <ul className="about-list">
                    <li>💡 <strong>Handpicked Products:</strong> Carefully selected for quality, style, and value.</li>
                    <li>🚀 <strong>Lightning-Fast Delivery:</strong> Orders are packed and shipped with speed and care.</li>
                    <li>🛒 <strong>Simple Shopping Experience:</strong> Clean design, smooth navigation, and secure checkout.</li>
                    <li>💸 <strong>Deals That Delight:</strong> The best products at the best prices — always.</li>
                </ul>

                <h2 className="about-subheading">Who We Serve</h2>
                <p className="about-paragraph">
                    From casual shoppers to deal-hunters and trendsetters, <strong>SellSync</strong> is built
                    for anyone who wants <em>value without compromise</em>.
                </p>

                <h2 className="about-subheading">Your Trust, Our Priority</h2>
                <p className="about-paragraph">
                    Your data is safe with us. We use modern security practices and respect your privacy
                    in every step.
                </p>

                <p className="about-thankyou">
                    <strong>Thank you for choosing SellSync. Let’s make every purchase a smart one!</strong>
                </p>
            </div>
        </>
    );
}