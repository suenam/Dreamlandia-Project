import React, { useState, useEffect, useRef } from 'react';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ExpenseForm.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';

const ExpenseForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [attractionList, setAttractionList] = useState([]);
  const [selectedAttractionId, setSelectedAttractionId] = useState('');
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] = useState(false);
const [openDeleteFailureModal, setOpenDeleteFailureModal] = useState(false);

const handleCloseDeleteSuccessModal = () => {
  setOpenDeleteSuccessModal(false);
};

const handleCloseDeleteFailureModal = () => {
  setOpenDeleteFailureModal(false);
};
  

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);
  const [openAttractionSuccessModal, setOpenAttractionSuccessModal] = useState(false);
  const [openAttractionFailureModal, setOpenAttractionFailureModal] = useState(false);
  const handleCloseAttractionSuccessModal = () => {
    setOpenAttractionSuccessModal(false);
  };

  const handleCloseAttractionFailureModal = () => {
    setOpenAttractionFailureModal(false);
  };
  const staffIdRef = useRef(null);

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showAttractionForm, setShowAttractionForm] = useState(false);

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
            setEmployeeId(staffIdRef.current);
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

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/expense-restaurant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          StaffID: staffIdRef.current,
          RestaurantID: restaurantId,
          ExpenseAmt: expenseAmount,
          ExpenseDate: expenseDate,
          ExpenseType: expenseType,
        }),
      });

      if (response.ok) {
        setOpenSuccessModal(true);
        console.log('Submitted!');
      } else {
        setOpenFailureModal(true);
        console.error('Failed!');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const handleCloseFailureModal = () => {
    setOpenFailureModal(false);
  };

  // Attraction Form
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    shortDescription: '',
    thrillLevel: '',
    heightRequirement: '',
    status: '',
    image: '',
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  useEffect(() => {
    const fetchAttractionList = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/attractions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch attraction list');
        }

        const data = await response.json();
        console.log('Attraction list data:', data);
        setAttractionList(data.attractions);
      } catch (error) {
        console.error('Error fetching attraction list:', error);
        // Set attractionList to an empty array in case of error
        setAttractionList([]);
      }
    };

    fetchAttractionList();
  }, []);
  
  
  const handleDeleteAttraction = async () => {
    try {
      console.log("Selected Attraction ID:", selectedAttractionId);
  
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/delete-attraction`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedAttractionId }),
      });
  
      if (response.ok) {
        setOpenDeleteSuccessModal(true); 
      } else {
        setOpenDeleteFailureModal(true); 

      }
    } catch (error) {
      console.error('Error deleting attraction:', error);
      console.log("!!!!!");

      setOpenDeleteFailureModal(true); // Update state variable for failure modal
    }
  };
  
 
  
  const handleAttractionSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/insert-new-attractions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          description: formData.description,
          shortDescription: formData.shortDescription,
          thrillLevel: formData.thrillLevel,
          heightRequirement: formData.heightRequirement,
          status: 1,
          image: formData.image,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setOpenAttractionSuccessModal(true);

        setMessage(data.message);
        setFormData({
          name: '',
          type: '',
          description: '',
          shortDescription: '',
          thrillLevel: '',
          heightRequirement: '',
          status: 1,
          image: '',
        });
      } else {
        setOpenAttractionFailureModal(true);

        setMessage('Error submitting attraction. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting attraction:', error);
      setOpenAttractionFailureModal(true);
      setMessage('Error submitting attraction. Please try again later.');
    }
  };

  return (
    <div className="expense-form">
      <MSidebar />
      <h1 className="h1-expense-form">Forms</h1>

      <div className="expense-section">
        <button
          onClick={() => setShowExpenseForm(!showExpenseForm)}
          className={`show-hide-button ${showExpenseForm ? 'hide' : 'show'}`}
        >
          {showExpenseForm ? '▲ Expense Form' : '▼ Expense Form'}
        </button>

        {showExpenseForm && (
          <form onSubmit={handleExpenseSubmit}>
            <div className="form-header">
              <h3>Resturant Expense Form</h3>
              <i title="Form for managers to submit restaurant expenses.">&#9432;</i>
            </div>

            <div className="form-row">
              <label>Restaurant:<span className="required">*</span></label>
              <select value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)}>
                <option value="">Select Restaurant</option>
                <option value="1">WhataSandwich</option>
                <option value="2">Burger Castle</option>
                <option value="3">The Velvet Vineyard</option>
                <option value="4">Silver Spoon Serenade</option>
                <option value="5">HerHarmony Eatery</option>
                <option value="6">Bella's Fairy Tale Feast</option>
              </select>
            </div>
            <div className="form-row">
              <label>Amount:<span className="required">*</span></label>
              <input type="number" step="0.01" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Date:<span className="required">*</span></label>
              <input type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Type:<span className="required">*</span></label>
              <select value={expenseType} onChange={(e) => setExpenseType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="produce">Produce</option>
                <option value="supplies">Supplies</option>
                <option value="utilities">Utilities</option>
              </select>
            </div>
            <button type="submit" onClick={handleExpenseSubmit}>Submit Expense</button>

          </form>
        )}
      </div>

      <div className="expense-section">
        <button
          onClick={() => setShowAttractionForm(!showAttractionForm)}
          className={`show-hide-button ${showAttractionForm ? 'hide' : 'show'}`}
        >
          {showAttractionForm ? '▲ Attraction Form' : '▼ Attraction Form'}
        </button>

        {showAttractionForm && (
          <>
          <form onSubmit={handleAttractionSubmit}>
            <div className="form-header">
              <h3>Add Attraction</h3>
              <i title="Form for managers to add new attractions.">&#9432;</i>
            </div>
            <div className="form-row">
              <label>Name:<span className="required">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Type:<span className="required">*</span></label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Description:<span className="required">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-row">
              <label>Short Description:<span className="required">*</span></label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-row">
              <label>Thrill Level:<span className="required">*</span></label>
              <input
                type="text"
                name="thrillLevel"
                value={formData.thrillLevel}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Height Requirement:<span className="required">*</span></label>
              <input
                type="text"
                name="heightRequirement"
                value={formData.heightRequirement}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>Image:<span className="required">*</span></label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" onClick={handleAttractionSubmit}>Add Attraction</button>
            </form>
            <div className="form-header">
              <h3>Delete Form</h3>
              <i title="Form for managers to add new attractions.">&#9432;</i>
            </div>
            <div className="form-row">
      <label>Select Attraction:</label>
      <select
        value={selectedAttractionId}
        onChange={(e) => setSelectedAttractionId(e.target.value)}
      >
        <option value="">Select Attraction</option>
        {attractionList.length > 0 ? (
          attractionList.map((attraction) => (
            <option key={attraction.attractionID} value={attraction.attractionID}>
              {attraction.name}
            </option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
      </select>
          <button onClick={handleDeleteAttraction}>Delete Attraction</button>
          </div>
            </>
        )}
          </div>

      <Modal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
        className="modal-container success-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="success-modal-title" className="modal-title">
            Expense Submitted
          </h2>
          <p id="success-modal-description" className="modal-description">
            The expense has been submitted successfully.
          </p>
          <button onClick={handleCloseSuccessModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openFailureModal}
        onClose={handleCloseFailureModal}
        aria-labelledby="failure-modal-title"
        aria-describedby="failure-modal-description"
        className="modal-container failure-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="failure-modal-title" className="modal-title">
            Failed to Submit Expense
          </h2>
          <p id="failure-modal-description" className="modal-description">
            There was an error while submitting the expense. Please try again later.
          </p>
          <button onClick={handleCloseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openAttractionSuccessModal}
        onClose={handleCloseAttractionSuccessModal}
        aria-labelledby="attraction-success-modal-title"
        aria-describedby="attraction-success-modal-description"
        className="modal-container success-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="attraction-success-modal-title" className="modal-title">
            Attraction Submitted
          </h2>
          <p id="attraction-success-modal-description" className="modal-description">
            The new attraction has been submitted successfully.
          </p>
          <button onClick={handleCloseAttractionSuccessModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={openAttractionFailureModal}
        onClose={handleCloseAttractionFailureModal}
        aria-labelledby="attraction-failure-modal-title"
        aria-describedby="attraction-failure-modal-description"
        className="modal-container failure-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="attraction-failure-modal-title" className="modal-title">
            Failed to Submit Attraction
          </h2>
          <p id="attraction-failure-modal-description" className="modal-description">
            There was an error while submitting the new attraction. Please try again later.
          </p>
          <button onClick={handleCloseAttractionFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
      <Modal
  open={openDeleteSuccessModal}
  onClose={handleCloseDeleteSuccessModal}
  aria-labelledby="delete-success-modal-title"
  aria-describedby="delete-success-modal-description"
  className="modal-container success-modal"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}
    className="modal-content"
  >
    <h2 id="delete-success-modal-title" className="modal-title">
      Attraction Deleted
    </h2>
    <p id="delete-success-modal-description" className="modal-description">
      The attraction has been deleted successfully.
    </p>
    <button onClick={handleCloseDeleteSuccessModal} className="modal-button">
      Close
    </button>
  </Box>
</Modal>

<Modal
  open={openDeleteFailureModal}
  onClose={handleCloseDeleteFailureModal}
  aria-labelledby="delete-failure-modal-title"
  aria-describedby="delete-failure-modal-description"
  className="modal-container failure-modal"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    }}
    className="modal-content"
  >
    <h2 id="delete-failure-modal-title" className="modal-title">
      Failed to Delete Attraction
    </h2>
    <p id="delete-failure-modal-description" className="modal-description">
      There was an error while deleting the attraction. Please try again later.
    </p>
    <button onClick={handleCloseDeleteFailureModal} className="modal-button">
      Close
    </button>
  </Box>
</Modal>

    </div>
  );
};

export default ExpenseForm;