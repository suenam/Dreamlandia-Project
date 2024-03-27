import React, { useState, useEffect } from 'react';
import './UCard.css';

const UCard = () => {
  const [user, setUser] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleChange = (u) => {
    setUser({ ...user, [u.target.name]: u.target.value });
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  const saveChanges = () => {
    localStorage.setItem('user', JSON.stringify(user));
    setIsEditing(false);
  }

  return (
    <div className="employee-profile">
      <h3>User Profile</h3>
      <button onClick={isEditing ? saveChanges : toggleEditing} className="edit-btn">
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={user.address}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
}

export default UCard;