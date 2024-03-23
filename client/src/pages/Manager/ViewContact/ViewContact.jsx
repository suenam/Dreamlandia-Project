import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ViewContact.css';

function ViewContact() {
  const { setShowNavbar, setShowFooter } = useOutletContext();
  setShowNavbar(false);
  setShowFooter(false);

  const [viewDate, setViewDate] = useState('');
  const [contactForms, setContactForms] = useState([]);

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
      <MSidebar />
      <h1 className="h1-dr-m">View Contact Forms</h1>
      <div className="data-report">
        <div className="report-section">
          <form onSubmit={handleViewSubmit}>
            <div className="form-header">
              <h3>View Contact Forms</h3>
              <i title="Select a date to view contact forms submitted on that date.">&#9432;</i>
            </div>
            <div className="form-row">
              <label>Date:</label>
              <input type="date" value={viewDate} onChange={(e) => setViewDate(e.target.value)} />
            </div>
            <button className="generate-but-dr" type="submit">
              View Contact Forms
            </button>
          </form>
        </div>
        <div className="report-section">
          <h3>Contact Forms</h3>
          {contactForms.length > 0 ? (
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Message</th>
                  <th>TicketID</th>
                </tr>
              </thead>
              <tbody>
                {contactForms.map((form) => (
                  <tr key={form.SubmissionID}>
                    <td>{form.Cname}</td>
                    <td>{form.Cemail}</td>
                    <td>{form.Cdate}</td>
                    <td>{form.CType}</td>
                    <td>{form.Content}</td>
                    <td>{form.TicketID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No contact forms found for the selected date.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewContact;