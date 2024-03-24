import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MSidebar.css';
import Home from '../../pages/Home/Home';

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
        <NavLink className="sidebar-link" to="/manager/dashboard" >Dashboard</NavLink>
        <NavLink className="sidebar-link" to="/manager/data-reports" >Data Reports</NavLink>
        <NavLink className="sidebar-link" to="/manager/expense-form" >Expense Form</NavLink>

        <NavLink className="sidebar-link" to="/manager/maintenance">Maintenance Requests</NavLink>
        <NavLink className="sidebar-link" to="/manager/manage-employees">Manage Employees</NavLink>
        <NavLink className="sidebar-link" to="/manager/view-contact-forms">View Contact Forms</NavLink>

        <NavLink className="sidebar-link" to="/manager/HR" >HR</NavLink>
        <NavLink className="sidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;