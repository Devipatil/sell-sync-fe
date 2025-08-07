import React from "react";
import "../styles/Contact.css"; // Link to the external CSS
import { NavLink } from "react-router-dom";

export default function Contact() {
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

    <div className="contact-wrapper">
      <div className="contact-container">
        <h1 className="contact-title">Get in Touch with SellSync</h1>
        <p className="contact-description">
          We'd love to hear from you! Whether it's feedback, questions, or just to say hello — drop us a message.
        </p>

        <div className="contact-content">
          {/* Contact Form */}
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Your Name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="you@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="Subject of your message" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Type your message here..." required></textarea>
            </div>

            <button type="submit" className="contact-submit">Send Message</button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <h3>📍 Office Location</h3>
            <p>123 Trendy Lane, Innovation City, India</p>

            <h3>📞 Call Us</h3>
            <p>+91 98765 43210</p>

            <h3>📧 Email</h3>
            <p>support@sell-sync.in</p>

            <h3>⏰ Working Hours</h3>
            <p>Mon - Fri: 9:00 AM – 6:00 PM</p>
            <p>Sat - Sun: 10:00 AM – 4:00 PM</p>
          </div>
        </div>
      </div>
    </div>

     </>
  );
}