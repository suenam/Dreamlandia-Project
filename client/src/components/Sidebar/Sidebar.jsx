import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Sidebar.css';
import Home from '../../pages/Home/Home';
import Maintenance from '../../pages/Maintenance/Maintenance';
import Dashboard from '../../pages/Employee/Dashboard/Dashboard';
import HR from '../../pages/Employee/HR/HR';
import Employee from '../../pages/Employee/Employee';
const Sidebar = () => {
    const handleSignOut = () => {
        navigate({Home}); 
    };
    const handleDashboard = () => {
        navigate({Dashboard}); 
    };
    const handleMaintenance = () => {
        navigate({Maintenance}); 
    };
    const handleHR = () => {
        navigate({HR}); 
    };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <NavLink to='/Employee' style={{textDecoration: 'none'}}><h3>Employee Portal</h3></NavLink>
      </div>
      <nav className="sidebar-links">
        <NavLink className="sidebar-link" to="/Dashboard" onClick={handleDashboard} >Dashboard</NavLink>
        <NavLink className="sidebar-link" to="/Maintenance" onClick={handleMaintenance}>Maintenance Requests</NavLink>
        <NavLink className="sidebar-link" to="/HR" onClick={handleHR}>HR</NavLink>
        <NavLink className="sidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;