import React, { useEffect, useState } from 'react';

export default function Update_user() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    role: 'customer',
  });
  const [message, setMessage] = useState('');

  // Load all users when component mounts
  useEffect(() => {
    fetch('http://localhost:8080/getAllUser')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Failed to load users', err));
  }, []);

  // Fetch individual user when Update is clicked
  const handleEdit = async (id) => {
    setMessage('');
    try {
      const res = await fetch(`http://localhost:8080/user/${id}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setSelectedUserId(id);
      setUserData(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Handle form submission to update the user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/user/${selectedUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error('Failed to update user');
      setMessage('User updated successfully!');

      // Optional: Reload user list
      const updatedList = await fetch('http://localhost:8080/getAllUser').then((res) => res.json());
      setUsers(updatedList);
      setSelectedUserId(null); // hide form
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h3>All Users</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.gender}</td>
              <td>{u.dob}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEdit(u.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUserId && (
        <>
          <h3 style={{ marginTop: '30px' }}>Edit User (ID: {selectedUserId})</h3>
          <form onSubmit={handleUpdateUser} style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Gender"
            value={userData.gender}
            onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
          />
          <input
            type="date"
            value={userData.dob}
            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
          />
          <select
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">Update User</button>
        </div>
</form>
        </>
      )}

      {message && (
        <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
}