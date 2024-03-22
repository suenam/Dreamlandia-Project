import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ExpenseForm.css';

function ExpenseForm() {
  const { setShowNavbar } = useOutletContext();
  setShowNavbar(false);

  const [employeeId, setEmployeeId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseType, setExpenseType] = useState('');

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
  
     
  
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/expense-restaurant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          StaffID: employeeId,
          RestaurantID: restaurantId,
          ExpenseAmt: expenseAmount, 
          ExpenseDate: expenseDate,
          ExpenseType: expenseType
        }),
      });
  
      if (response.ok) {
        // Handle success
        alert('Maintenance request submitted successfully!');
        console.log('Maintenance request submitted successfully!');
      } else {
        // Handle errors
        alert('Failed to submit maintenance request.');
        console.error('Failed to submit maintenance request.');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
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
            <label>Employee ID:</label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Restaurant ID:</label>
            <select
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
            >
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
            <label>Expense Amount:</label>
            <input
              type="number"
              step="0.01"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Expense Date:</label>
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Expense Type:</label>
            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="produce">Produce</option>
              <option value="supplies">Supplies</option>
              <option value="utilities">Utilities</option>
            </select>
          </div>
          <button type="submit">Submit Expense</button>
        </form>
      </div>

    </div>
  );
}

export default ExpenseForm;