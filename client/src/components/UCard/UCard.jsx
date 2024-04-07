import React, { useState, useEffect } from 'react';
import './UCard.css';
import { useAuth } from '../../pages/auth/auth';
import axios from 'axios';

const UCard = () => {
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);

  useEffect(() => {
    setUpdatedUser(auth.user);
  }, [auth.user]);

  const handleChange = (e) => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/user`,
        updatedUser,
        { withCredentials: true }
      );
      if (response.status === 200) {
        auth.setUser(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    return null;
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
          name="UName"
          value={updatedUser?.UName || ''}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="UEmail"
          value={updatedUser?.UEmail || ''}
          onChange={handleChange}
          disabled={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={updatedUser?.address || ''}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={updatedUser?.state || ''}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label htmlFor="zipcode">Zipcode:</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={updatedUser?.zipcode || ''}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
};

export default UCard;