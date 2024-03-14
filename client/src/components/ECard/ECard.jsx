import React, { useState, useEffect } from 'react';
import './ECard.css';

const ECard = () => {
  const [employee, setEmployee] = useState({
    staffId: '',
    name: '',
    address: '',
    phoneNumber: '',
    email: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedEmployee = JSON.parse(localStorage.getItem('employee'));
    if (storedEmployee) {
      setEmployee(storedEmployee);
    }
  }, []);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  }

  const saveChanges = () => {
    localStorage.setItem('employee', JSON.stringify(employee));
    setIsEditing(false);
  }

  return (
    <div className="employee-profile">
      <h2>Employee Profile</h2>
      <button onClick={isEditing ? saveChanges : toggleEditing} className="edit-btn">
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <div className="form-group">
        <label htmlFor="staffId">Staff ID:</label>
        <input
          type="text"
          id="staffId"
          name="staffId"
          value={employee.staffId}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={employee.name}
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
          value={employee.address}
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
          value={employee.phoneNumber}
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
          value={employee.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
}

export default ECard;