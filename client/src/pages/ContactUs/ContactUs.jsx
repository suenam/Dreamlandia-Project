import './ContactUs.css'
import React, { useState } from 'react';
import { Link } from "react-router-dom";


const ContactUs = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., sending data to server)
        console.log("Submitted:", { email, message });
        // Clear input fields after submission
        setEmail('');
        setMessage('');
    };

    return (
        <div className="home-container">
            <div className="home-text">
                <h1>Contact Us</h1>
                <h2>Note that only accounts with registered</h2>
                <h2>emails and at least one purchase order</h2>
                <h2>actually have their message sent to us</h2>
                <h2></h2>
                <form className="contact-form" onSubmit={handleSubmit}>
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
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
                <Link className="link" to="/">Back to Home</Link>
            </div>
        </div>
    );
};

export default ContactUs;
