import React, { useState } from 'react';

const EmployeeCard = ({ employeeData, onSave }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({ ...employeeData });
  
  const { name, title, department, email, phone } = updatedEmployeeData;

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployeeData({
      ...updatedEmployeeData,
      [name]: value
    });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setIsEdit(false);
    // Call onSave with updated employee data
    onSave(updatedEmployeeData);
  };

  return (
    <div className="employee-card">
      <img src="https://placehold.it/150" alt="Profile Picture" />
      <div className="info-container">
        {isEdit ? (
          <form onSubmit={handleEditSubmit}>
            <h2>
              <input type="text" name="name" value={name} onChange={handleInputChange} />
            </h2>
            <p>
              <input type="text" name="title" value={title} onChange={handleInputChange} />
            </p>
            <p>
              <input type="text" name="department" value={department} onChange={handleInputChange} />
            </p>
            <ul className="contact-details">
              <li>
                <span className="label">Email:</span>
                <span className="value">
                  <input type="email" name="email" value={email} onChange={handleInputChange} />
                </span>
              </li>
              <li>
                <span className="label">Phone:</span>
                <span className="value">
                  <input type="text" name="phone" value={phone} onChange={handleInputChange} />
                </span>
              </li>
            </ul>
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            <h2>{name}</h2>
            <p>{title}</p>
            <p>{department}</p>
            <ul className="contact-details">
              <li>
                <span className="label">Email:</span>
                <span className="value">{email}</span>
              </li>
              <li>
                <span className="label">Phone:</span>
                <span className="value">{phone}</span>
              </li>
            </ul>
          </>
        )}
        <button onClick={handleEditClick}>
          {isEdit ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
