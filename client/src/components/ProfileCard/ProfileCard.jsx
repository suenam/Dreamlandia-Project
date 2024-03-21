import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  const [person, setperson] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: ''
  });
  
  return (
    <div className="person-profile">
      <h2>Welcome {person.name}!</h2>
    
      <div className="form-group">
        <label>Staff ID:</label>
        <input
          type="text"
          id="staffId"
          name="staffId"
          value={person.staffId}
          readonly="readonly"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={person.name}
          readonly="readonly"
          disabled
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={person.address}
          readonly="readonly"
          disabled
      
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={person.phoneNumber}
          readonly="readonly"
          disabled
        
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={person.email}
          readonly="readonly"
          disabled

          
        />
      </div>
    </div>
  );
}

export default ProfileCard;