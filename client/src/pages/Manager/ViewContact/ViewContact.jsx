import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ViewContact.css';

function ViewContact() {

  const [viewStartDate, setViewStartDate] = useState('');
  const [viewEndDate, setViewEndDate] = useState('');
  const [contactType, setContactType] = useState('all'); 

  const [contactForms, setContactForms] = useState([]);

  const handleViewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/viewContactForms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate: viewStartDate, endDate: viewEndDate, type: contactType }),
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
              <label>Start Date:<span className="required">*</span></label>
              <input type="date" value={viewStartDate} onChange={(e) => setViewStartDate(e.target.value)} />
            </div>
            <div className="form-row">
              <label>End Date:<span className="required">*</span></label>
              <input type="date" value={viewEndDate} onChange={(e) => setViewEndDate(e.target.value)} />
            </div>
            <div className="form-row">
              <label>Contact Type:<span className="required">*</span></label>
              <select value={contactType} onChange={(e) => setContactType(e.target.value)}>
                <option value="all">All</option>
                <option value="query">Query</option>
                <option value="issue">Issue</option>
                <option value="feedback">Feedback</option>
              </select>
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
                  <th>Date (UTC)</th>
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
            <p>No contact forms found for the selected date and type.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewContact;
