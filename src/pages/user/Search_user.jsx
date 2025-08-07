import React, { useState } from 'react';

export default function Search_user() {
  const [id, setId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    setError('');
    setUser(null);

    try {
      const resp = await fetch(`http://localhost:8080/user/${id}`);
      if (!resp.ok) {
        throw new Error("User not found");
      }

      const data = await resp.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h3>Search User by ID</h3>
      <form onSubmit={handleSearch}>
        <input
          type="number"
          placeholder="Enter user ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <h4>User Details</h4>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>DOB:</strong> {user.dob}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
}