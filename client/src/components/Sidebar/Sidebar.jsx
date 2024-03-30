import React from 'react';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from "../../pages/auth/auth";
import './Sidebar.css';
import Home from '../../pages/Home/Home';
import Maintenance from '../../pages/Employee/Maintenance/Maintenance';
import Dashboard from '../../pages/Employee/Dashboard/Dashboard';
import HR from '../../pages/Employee/HR/HR';

const Sidebar = () => {

  const navigate = useNavigate();
  const auth = useAuth();
    const handleSignOut = async () => {
        await auth.logout();
        navigate('/', { replace: true }); 
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
        <NavLink to='/employee/profile' style={{textDecoration: 'none'}}><h3>Employee Portal</h3></NavLink>
      </div>
      <nav className="sidebar-links">
        <NavLink className="sidebar-link" to="/employee/profile" >My Profile</NavLink>
        <NavLink className="sidebar-link" to="/employee/dashboard" >Dashboard</NavLink>
        <NavLink className="sidebar-link" to="/employee/maintenance" >Maintenance Requests</NavLink>
        <NavLink className="sidebar-link" to="/employee/HR" >HR</NavLink>
        <NavLink className="sidebar-link" to="/employee/weather-form" >WeatherForm</NavLink>

        <NavLink className="sidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;