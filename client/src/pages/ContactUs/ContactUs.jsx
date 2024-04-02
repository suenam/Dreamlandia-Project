import './ContactUs.css';
import React, { useState } from 'react';
import Sparkles from '../../components/SparkleCursor/Sparkles';
import { useAuth } from '../auth/auth';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const auth = useAuth();
  // const userID = auth.user?.UserID ?? null;
  const userID = auth.user.UserID;

  const handleSubmit = async (e) => {
    let submittedTicketId = !ticketId ? null : ticketId;
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/contact-us`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, type, message, submittedTicketId, userID }),
      });

      if (response.ok) {
        alert('Message submitted successfully!');
        console.log('Message submitted successfully!');
        // Clear input fields after submission
        setName('');
        setTicketId('');
        setEmail('');
        setType('');
        setMessage('');
      } else {
        alert('Failed to submit message.');
        console.error('Failed to submit message.');
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <Sparkles />
        <h1>Contact Us</h1>
        <p>Note that only accounts with registered emails and at least one purchase order actually have their message sent to us</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="ticketId">Ticket ID (optional):</label>
          <input
            type="text"
            id="ticketId"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="query">Query</option>
            <option value="feedback">Feedback</option>
            <option value="issue">Issue</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
