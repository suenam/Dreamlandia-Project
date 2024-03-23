import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';import './Footer.css'; 

import icon from '../../assets/dreamlandia_minimized_logo.ico'; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="left-container">
        <img src={icon} alt="icon" className="icon" />
        <span>© 2024 Dreamlandia</span>
      </div>
        
      <div className="right-container">
      
        <NavLink className="links-footer" to="/ContactUs" >Contact Us</NavLink>
        <NavLink className="links-footer" to="/employee/login" >Employee Login</NavLink>
        <NavLink className="links-footer" to="https://github.com/suenam/Dreamlandia-Project">
          <GitHubIcon />
        </NavLink>
        
        
      </div>
    </footer>
  );
};

export default Footer;
