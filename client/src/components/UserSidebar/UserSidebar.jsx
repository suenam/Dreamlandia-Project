import React from 'react';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { useAuth } from "../../pages/auth/auth";
import './UserSidebar.css';


const Sidebar = () => {

  const navigate = useNavigate();
  const auth = useAuth();
  const { setShowNavbar, setShowFooter } = useOutletContext();
    const handleSignOut = async () => {
        await auth.logout();
        navigate('/', { replace: true }); 
        setShowNavbar(true);
        setShowFooter(true);
    };

  return (
    <div className="usidebar">
      <div className="usidebar-header">
        <NavLink to='/UserPage' style={{textDecoration: 'none'}}><h3>User Portal</h3></NavLink>
      </div>
      <nav className="usidebar-links">
        <NavLink className="usidebar-link" to="/" >Home</NavLink>
        <NavLink className="usidebar-link" to="/UserPage/RecentOrders" >Recent Orders</NavLink>
        
        <NavLink className="usidebar-link" to="/" onClick={handleSignOut}>Sign Out</NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;