import React from "react";
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from "../../pages/auth/auth";
import Logo from "../../assets/dreamlandia_logo.svg";
const Navbar = () => {

    const auth = useAuth();

    return (
       <>
       <div className="mainnavbar">
            <Link to='/'><img className="dreamlandiaLogo" src={Logo} alt="logo" /></Link>
            <div className="mainnavbar-right">
                <nav className="mainnavbar-links">
                    <NavLink className="link" to='/'>Home</NavLink>
                    <NavLink className="link" to='/tickets'>Tickets</NavLink>
                    <NavLink className="link" to='/attractions'>Attractions</NavLink>

                    <NavLink className="link" to='/shop'>Shop</NavLink>
                    {!auth.user ?
                            <NavLink className="link" to='/login'>Login</NavLink> :
                            <NavLink className="link" to='/' onClick={async (event) => {
                                event.preventDefault();
                                await auth.logout();
                            }}>Logout</NavLink>
                        }                    
                </nav>
            </div>
       </div>
       </>
    );
};
export default Navbar