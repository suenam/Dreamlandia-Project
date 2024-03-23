import React, { useState } from 'react';
import './ContactUs.css'; // Import ContactUs.css for styling

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [ticketID, setTicketID] = useState('');
    const [message, setMessage] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., sending data to server)
        console.log('Submitted:', { name, email, type, ticketID, message, date });
        // Clear input fields after submission
        setName('');
        setEmail('');
        setType('');
        setTicketID('');
        setMessage('');
        setDate('');
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <h2>Note that only accounts with registered emails and at</h2>
            <h2>least one purchase order actually have their message sent to us</h2>
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
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Query">Query</option>
                        <option value="Complaint">Complaint</option>
                        <option value="Feedback">Feedback</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="ticketID">Ticket ID:</label>
                    <input
                        type="text"
                        id="ticketID"
                        value={ticketID}
                        onChange={(e) => setTicketID(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
