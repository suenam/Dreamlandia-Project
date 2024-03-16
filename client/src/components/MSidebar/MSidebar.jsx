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
    

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <NavLink to='/Manager' style={{textDecoration: 'none'}}><h3>Manager Portal</h3></NavLink>
      </div>
      <nav className="sidebar-links">
        <NavLink className="sidebar-link" to="/MDashboard" >Dashboard</NavLink>
        <NavLink className="sidebar-link" to="/DataReport" >Data Reports</NavLink>
        <NavLink className="sidebar-link" to="/MMaintenance">Maintenance Requests</NavLink>
        <NavLink className="sidebar-link" to="/MHR" >HR</NavLink>
        <NavLink className="sidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;