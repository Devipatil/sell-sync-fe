import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Add_user() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('customer'); // default role

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
      gender,
      dob,
      role
    };

    try {
      const resp = await fetch('http://localhost:8080/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const msg = await resp.text();
      alert(msg);

      if (msg === "User created successfully!") {
        navigate('/'); // redirect after success
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register user");
    }
  }

  return (
    <>
      <h4>Create New User</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input
            type="text"
            value={gender}
            required
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            required
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </>
  );
}