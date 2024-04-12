import './ContactUs.css';
import React, {useEffect, useRef, useState } from 'react';
import Sparkles from '../../components/SparkleCursor/Sparkles';
import { useAuth } from '../auth/auth';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';





const ContactUs = () => {
  const [name, setName] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const auth = useAuth();
  const userIdRef = useRef(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseFailureModal = () => {
    setShowFailureModal(false);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          if (userData && userData.UserID) {
            userIdRef.current = userData.UserID;
          } else {
            setUserId(null);

          }
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        setShowFailureModal(true);

        setUserId(null);
      }
    };
    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submittedTicketId = ticketId || null;
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/contact-us`, {
        name,
        email,
        type,
        message,
        submittedTicketId,
      }, {
        withCredentials: true,
      });
  
      if (response.status === 201) {
        setShowSuccessModal(true);
        console.log('Message submitted successfully!');
        setName('');
        setTicketId('');
        setEmail('');
        setType('');
        setMessage('');
      } else {
        setShowFailureModal(true);
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
        <p>Please feel free to contact us!</p>
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
      <Modal
        open={showSuccessModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
        className="modal-container success-modal"
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
          <h2 id="success-modal-title" className="modal-title">
            Message Submitted Successfully
          </h2>
          <p id="success-modal-description" className="modal-description">
            Your message has been submitted successfully.
          </p>
          <button onClick={handleCloseSuccessModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      <Modal
        open={showFailureModal}
        onClose={handleCloseFailureModal}
        aria-labelledby="failure-modal-title"
        aria-describedby="failure-modal-description"
        className="modal-container failure-modal"
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
          <h2 id="failure-modal-title" className="modal-title">
            Failed to Submit Message
          </h2>
          <p id="failure-modal-description" className="modal-description">
            There was an error while submitting your message. Please try again.
          </p>
          <button onClick={handleCloseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ContactUs;
