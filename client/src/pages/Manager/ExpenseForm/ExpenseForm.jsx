import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ExpenseForm.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function ExpenseForm() {


  const [employeeId, setEmployeeId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseType, setExpenseType] = useState('');

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/expense-restaurant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          StaffID: employeeId,
          RestaurantID: restaurantId,
          ExpenseAmt: expenseAmount,
          ExpenseDate: expenseDate,
          ExpenseType: expenseType
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

  return (
    <div className="expense-form">
      <MSidebar />
      <h1 className="h1-expense-form">Expense Form</h1>
      <div className="expense-section">
        <form onSubmit={handleExpenseSubmit}>
          <div className="form-header">
            <h3>Resturant Expense Form</h3>
            <i title="Form for managers to submit restaurant expenses.">&#9432;</i>
          </div>
          <div className="form-row">
            <label>EID:<span className="required">*</span></label>
            <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
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
          <button type="submit">Submit Expense</button>
        </form>
      </div>

      {/* Success Modal */}
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
    </div>
  );
}

export default ExpenseForm;