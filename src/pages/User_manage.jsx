import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/ProductManage.css"; // Reusing same CSS for styling

export default function User_manage() {
  return (
    <div className="admin-page">
      {/* Navbar similar to Product Management */}
      <nav className="admin-navbar">
        <div className="admin-logo">Admin Dashboard</div>
        <div className="admin-nav-links">
          <NavLink to="/admin_home" className="nav-link">Order Management</NavLink> {/* Back to orders */}
          <NavLink to="/" className="nav-link logout">Logout</NavLink>
        </div>
      </nav>

      <div className="admin-links">
        <h2 className="section-heading">User Management</h2>
        <div className="admin-card-group">
          <NavLink to="/addUser" className="admin-card">➕ Add New User</NavLink>
          <NavLink to="/updateUser" className="admin-card">✏️ Update User</NavLink>
          <NavLink to="/deleteUser" className="admin-card">🗑️ Delete User</NavLink>
          <NavLink to="/searchUser" className="admin-card">🔍 Search User</NavLink>
        </div>
      </div>
    </div>
  );
}