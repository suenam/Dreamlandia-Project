import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import Home from '../../pages/Home/Home';
import Dashboard from '../../pages/Employee/Dashboard/Dashboard';

const Sidebar = () => {
    const handleSignOut = () => {
        navigate({Home}); 
    };
    const handleDashboard = () => {
        navigate({Dashboard}); 
    };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Employee Portal</h3>
      </div>
      <nav className="sidebar-links">
        <NavLink className="sidebar-link" to="/Dashboard" onClick={handleDashboard} >Dashboard</NavLink>
        <NavLink className="sidebar-link" to="/EProfile">Edit Profile</NavLink>
        <NavLink className="sidebar-link" to="/Maintenance" >Maintenance Requests</NavLink>
        <NavLink className="sidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;