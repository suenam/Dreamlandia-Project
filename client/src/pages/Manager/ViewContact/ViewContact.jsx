import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ViewContact.css';

function ExpenseForm() {
  const { setShowNavbar } = useOutletContext();
  setShowNavbar(false);

  const [employeeId, setEmployeeId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseType, setExpenseType] = useState('');

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
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
              <option value="101">101 - Main Street Diner</option>
              <option value="202">202 - Uptown Bistro</option>
              <option value="305">305 - Seaside Café</option>
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