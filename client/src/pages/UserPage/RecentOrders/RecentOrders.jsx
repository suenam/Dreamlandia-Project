import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import UserSidebar from '../../../components/UserSidebar/UserSidebar';
import './RecentOrders.css';

function ViewContact() {

  const [viewDate, setViewDate] = useState('');
  const [contactForms, setContactForms] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('3'); // Default value is 3

  const handleViewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/viewContactForms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate: viewDate, endDate: viewDate }),
      });

      if (response.ok) {
        const data = await response.json();
        setContactForms(data);
      } else {
        const errorData = await response.json();
        console.error('Error retrieving contact forms:', errorData.message);
      }
    } catch (error) {
      console.error('Error retrieving contact forms:', error);
    }
  };

  return (
    <>
      <UserSidebar />
      <h1 className="h1-dr-m">View Recent Orders</h1>
      <div className="data-report">
        <div className="report-section">
          <p>Orders placed within&nbsp;
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                backgroundColor: '#f2f2f2',
                padding: '8px', // Slightly thicker padding
                borderRadius: '5px',
                border: '1px solid black', // Black border
              }}
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="9">9 months</option>
              <option value="12">12 months</option>
            </select>
          </p>
        </div>
        <div className="report-section">
          <h3>Recent Orders</h3>
          {contactForms.length > 0 ? (
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>TicketID</th>
                  <th>Attractions-Visited</th>{/* We might change this later */}
                </tr>
              </thead>
              <tbody>
                {contactForms.map((form) => (
                  <tr key={form.SubmissionID}>
                    <td>{form.Cname}</td>
                    <td>{form.Cemail}</td>
                    <td>{form.Cemaill}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders have been placed within this time frame</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewContact;
