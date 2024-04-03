import {React, useState} from "react";
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from "../../pages/auth/auth";
import Logo from "../../assets/dreamlandia_logo.svg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDropdown from "../ShoppingCart/CartDropdown";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {

    const auth = useAuth();


    const [hover, setHover] = useState(false);

    return (
       <>
       <div className="mainnavbar">
            <Link to='/'><img className="dreamlandiaLogo" src={Logo} alt="logo" /></Link>
            <div className="mainnavbar-right">
                <nav className="mainnavbar-links">
                    <NavLink className="link" to='/tickets'>Tickets</NavLink>
                    <NavLink className="link" to='/attractions'>Attractions</NavLink>
                    <NavLink className="link" to='/shop'>Shop</NavLink>
                    {/* {!auth.user ?
                        <NavLink className="link account" to='/login' style={{borderLeft: "1px solid white"}}><AccountCircleIcon/></NavLink> :
                        <NavLink className="link account" to='/' style={{borderLeft: "1px solid white"}} onClick={async (event) => {
                            event.preventDefault();
                            await auth.logout();
                        }}><AccountCircleIcon/></NavLink>
                    } */}
                    {!auth.user ?
                        <NavLink className="link account" to='/login' style={{borderLeft: "1px solid white", paddingLeft: "15px"}}><AccountCircleIcon/></NavLink> :
                        <NavLink className="link account" to='/user/profile' style={{borderLeft: "1px solid white", paddingLeft: "15px"}}><AccountCircleIcon/></NavLink>
                    }
                    <div className="cart-dropdown"  
                        onMouseEnter={()=>setHover(true)} 
                        onMouseLeave={()=>setHover(false)}
                    >
                        <NavLink className="link checkout" to='/checkout' style={{color: hover ? '#FFDE59' : 'white'}}>
                            <ShoppingCartIcon/>
                            </NavLink>
                        {hover && <CartDropdown/>}
                    </div>
                    

                </nav>
            </div>
       </div>
       </>
    );
};
export default Navbar