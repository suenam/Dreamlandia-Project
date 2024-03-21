import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import MSidebar from '../../../components/MSidebar/MSidebar';
import './ViewContact.css';

function ViewContact() {
  const { setShowNavbar } = useOutletContext();
  setShowNavbar(false);

  const [viewDate, setViewDate] = useState('');
  const [contactForms, setContactForms] = useState([]);

  const dummyContactForms = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2023-05-01', message: 'Hello, I have a question...' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2023-05-02', message: 'I would like to inquire about...' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', date: '2023-05-01', message: 'Can you please provide more details...' },
  ];

  const handleViewSubmit = (e) => {
    e.preventDefault();
    const formsForDate = dummyContactForms.filter((form) => form.date === viewDate);
    setContactForms(formsForDate);
  };

  return (
    <>
      <MSidebar />
      <h1 className='h1-dr-m'>View Contact Forms</h1>
      <div className='data-report'>
        <div className="report-section">
          <form onSubmit={handleViewSubmit}>
            <div className="form-header">
              <h3>View Contact Forms</h3>
              <i title="Select a date to view contact forms submitted on that date.">&#9432;</i>
            </div>
            <div className="form-row">
              <label>Date:</label>
              <input
                type="date"
                value={viewDate}
                onChange={(e) => setViewDate(e.target.value)}
              />
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
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contactForms.map((form) => (
                  <tr key={form.id}>
                    <td>{form.name}</td>
                    <td>{form.email}</td>
                    <td>{form.message}</td>
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