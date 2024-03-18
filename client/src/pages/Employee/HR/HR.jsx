import React from 'react';
import './HR.css';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useOutletContext } from 'react-router-dom';

const HR = () => {
  const { setShowNavbar } = useOutletContext();
    setShowNavbar(false);
  return (
    <>
    <Sidebar />
    <div className="hr-container">
      <div className="hr-page">
        <h1>Welcome to the HR Portal</h1>
        <p>
          At Dreamlandia, we believe in creating a vibrant and inclusive workplace culture. Our HR team is dedicated to supporting our employees' professional growth, well-being, and success.
        </p>
        <h2>Contact Information</h2>
        <div className="contact-info">
          <p><strong>Human Resources Department</strong></p>
          <p><strong>Phone:</strong> +1 (123) 456-7890</p>
          <p><strong>Email:</strong> hr@dreamlandia.com</p>
        </div>
        <h2>Benefits</h2>
        <ul>
          <li>Comprehensive health insurance plans</li>
          <li>Retirement savings programs</li>
          <li>Paid time off and holidays</li>
          <li>Career development opportunities</li>
          <li>Employee assistance programs</li>
        </ul>
        <p>
          Our HR team is committed to providing support and resources to help you thrive in your career at OurCompany. Feel free to reach out to us with any questions or concerns.
        </p>
      </div>
    </div>
    </>
  );
};

export default HR;
