import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import Home from '../../pages/Home/Home';
import EProfile from '../../pages/Employee/EProfile/EProfile';

const Sidebar = () => {
    const handleSignOut = () => {
        navigate({Home}); 
    };
    const handleProfile = () => {
        navigate('../../pages/Employee/EProfile/EProfile'); 
    };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Employee Portal</h3>
      </div>
      <nav className="sidebar-links">
        <NavLink className="sidebar-link" to="/employee/dashboard" >Dashboard</NavLink>
        <NavLink className="sidebar-link" to="/EProfile" onClick={handleProfile}>Profile</NavLink>
        <NavLink className="sidebar-link" to="/employee/attendance" >Attendance</NavLink>
        <NavLink className="sidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;