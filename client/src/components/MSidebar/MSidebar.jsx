import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MSidebar.css';
import Home from '../../pages/Home/Home';
import MMaintenance from '../../pages/Manager/MMaintenance/MMaintenance';
import MDashboard from '../../pages/Manager/MDashboard/MDashboard';
import MHR from '../../pages/Manager/MHR/MHR';
import Manager from '../../pages/Manager/Manager';

const Sidebar = () => {
    const handleSignOut = () => {
        navigate({Home}); 
    };
    const handleMDashboard = () => {
        navigate({MDashboard}); 
    };
    const handleMaintenance = () => {
        navigate({MMaintenance}); 
    };
    const handleHR = () => {
        navigate({MHR}); 
    };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <NavLink to='/Manager' style={{textDecoration: 'none'}}><h3>Manager Portal</h3></NavLink>
      </div>
      <nav className="sidebar-links">
        <NavLink className="sidebar-link" to="/MDashboard" onClick={handleMDashboard} >Dashboard</NavLink>
        <NavLink className="sidebar-link" to="/MMaintenance" onClick={handleMaintenance}>Maintenance Requests</NavLink>
        <NavLink className="sidebar-link" to="/MHR" onClick={handleHR}>HR</NavLink>
        <NavLink className="sidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;