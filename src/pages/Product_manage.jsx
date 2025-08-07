import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/ProductManage.css"; // Reusing the same styling

export default function Product_manage() {
  return (
    <div className="admin-page">
      {/* Navbar from Admin Home - customized for this view */}
      <nav className="admin-navbar">
        <div className="admin-logo">Admin Dashboard</div>
        <div className="admin-nav-links">
          <NavLink to="/admin_home" className="nav-link">Order Management</NavLink> {/* back to admin home */}
          <NavLink to="/" className="nav-link logout">Logout</NavLink>
        </div>
      </nav>

      <div className="admin-links">
        <h2 className="section-heading">Product Management</h2>
        <div className="admin-card-group">
          <NavLink to="/addProd" className="admin-card">➕ Add New Product</NavLink>
          <NavLink to="/updateProd" className="admin-card">✏️ Update Product</NavLink>
          <NavLink to="/deleteProd" className="admin-card">🗑️ Delete Product</NavLink>
          <NavLink to="/searchProd" className="admin-card">🔍 Search Product</NavLink>
        </div>
      </div>
    </div>
  );
}