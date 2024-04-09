import React, { useState, useEffect, useRef } from 'react';
import './ECard.css';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { STATES } from '../../constants/stateOptions';


const ECard = () => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false); 
  const staffIdRef = useRef(null);

  useEffect(() => {
    const fetchStaffId = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/employee`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData && userData.StaffID) {
            staffIdRef.current = userData.StaffID; 
            console.log('staffid:', staffIdRef.current);
          }
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    console.log('staffid:', staffIdRef.current);
    fetchStaffId();
  }, []);

  useEffect(() => {
    fetchLoggedInEmployee();
  }, []);

  const fetchLoggedInEmployee = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/loggedInEmployee`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setEmployee(data.employee);
      } else {
        console.error('Failed to fetch logged-in employee:', data.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { id, name, address, city, state, zipcode, phoneNumber, email } = employee;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/updateLoggedInEmployee`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ id, name, address, city, state, zipcode, phoneNumber, email }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('Employee updated successfully:', data);
        setIsEditing(false);
        setOpenUpdateModal(true);
        await fetchLoggedInEmployee();
      } else {
        const errorData = await response.json();
        console.error('Failed to update employee:', errorData);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  return (
    <div className="employee-profile">
      <h3>Employee Profile</h3>
      {isEditing ? (
        <>
          <button onClick={handleSave} className="edit-btn">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="edit-btn" style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </>
      ) : (
        <button onClick={handleEdit} className="edit-btn">
          Edit
        </button>
      )}
      {employee ? (
        <>
          <div className="form-group">
            <label className="eprofile-label">EID:</label>
            <input type="text" id="staffId" name="id" value={employee.id} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={employee.name}
              onChange={handleEmployeeChange}
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
              onChange={handleEmployeeChange}
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
              onChange={handleEmployeeChange}
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
              onChange={handleEmployeeChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={employee.city}
              onChange={handleEmployeeChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <TextField className='state-emp'
              id="outlined-select-state"
              select
              value={employee.state}
              onChange={(e) => {
                setEmployee((prevEmployee) => ({
                  ...prevEmployee,
                  state: e.target.value,
                }));
              }}
              disabled={!isEditing}
            >
              {STATES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="form-group">
            <label htmlFor="zipcode">Zipcode:</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={employee.zipcode}
              onChange={handleEmployeeChange}
              disabled={!isEditing}
            />
          </div>
          
        </>
      ) : (
        <p>Loading employee information...</p>
      )}

      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
        className="modal-container update-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="update-modal-title" className="modal-title">
            Employee Updated
          </h2>
          <p id="update-modal-description" className="modal-description">
            The employee information has been updated successfully.
          </p>
          <button onClick={handleCloseUpdateModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ECard;
