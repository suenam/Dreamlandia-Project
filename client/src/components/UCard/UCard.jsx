import React, { useState, useEffect } from 'react';
import './UCard.css';
import { useAuth } from '../../pages/auth/auth';
import axios from 'axios';

const UCard = () => {
  const auth = useAuth();


  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (u) => {
    auth.setUser(prevUser => ({ ...prevUser, [u.target.name]: u.target.value }));
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  const saveChanges = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/user`, auth.user, { withCredentials: true });
      if (response.status === 200) {
        auth.setUser(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

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
          value={auth.user.UName}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">UserName:</label>
        <input
          type="text"
          id="username"
          name="UUserName"
          value={auth.user.UUserName}
          onChange={handleChange}
          disabled={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="UEmail"
          value={auth.user.UEmail}
          onChange={handleChange}
          disabled={true}
        />
      </div>
    </div>
  );
}

export default UCard;