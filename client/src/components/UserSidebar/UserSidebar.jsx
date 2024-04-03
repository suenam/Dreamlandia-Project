import React from 'react';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from "../../pages/auth/auth";
import './UserSidebar.css';


const Sidebar = () => {

  const navigate = useNavigate();
  const auth = useAuth();
    const handleSignOut = async () => {
        await auth.logout();
        navigate('/', { replace: true }); 
    };

  return (
    <div className="usidebar">
      <div className="usidebar-header">
        <NavLink to='/user/profile' style={{textDecoration: 'none'}}><h3>User Portal</h3></NavLink>
      </div>
      <nav className="usidebar-links">
        <NavLink className="usidebar-link" to="/" >Home</NavLink>
        <NavLink className="usidebar-link" to="/user/profile" >My Profile</NavLink>
        <NavLink className="usidebar-link" to="/user/recent-orders" >Recent Orders</NavLink>
        
        <NavLink className="usidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;