import React from 'react';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import './MSidebar.css';
import { useAuth } from "../../pages/auth/auth";


const Sidebar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const handleSignOut = async () => {
      await auth.logout();
      navigate('/', { replace: true }); 
    };
    

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <NavLink to='/manager/profile' style={{textDecoration: 'none'}}><h3>Manager Portal</h3></NavLink>
      </div>
      <nav className="sidebar-links">
        <NavLink className="sidebar-link" to="/manager/profile" >My Profile</NavLink>
        <NavLink className="sidebar-link" to="/manager/dashboard" >Dashboard</NavLink>
        <NavLink className="sidebar-link" to="/manager/data-reports" >Data Reports</NavLink>
        <NavLink className="sidebar-link" to="/manager/expense-form" >Manage Departments</NavLink>

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