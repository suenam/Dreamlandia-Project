import './Checkout.css';
import { Link } from "react-router-dom";
import { STATES } from '../../constants/stateOptions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/logoWhiteBkg.png';

const Checkout = () => {
    return (
        <>
        <div className="checkout-container">
            <div className='checkout-info'>
                <div className='checkout-logo'>
                    <img src={Logo} /> 
                </div> 
                <div className='checkout-nav'>
                    <span>Tickets </span>
                    <span>{'>'}</span>
                    <span> <b>Shipping</b> </span>
                    <span>{'>'}</span>
                    <span> Complete</span>
                </div>
                <div className='checkout-contact-container'>
                    <h2>Contact information</h2>
                    <div className='checkout-contact-fields'>
                        <TextField
                            required
                            id="outlined-required-email"
                            label="Email"
                            placeholder='Email'
                            sx={{ width: '100%' }}
                        />
                        <TextField
                            required
                            id="outlined-required-phone"
                            label="Phone"
                            placeholder='Phone'
                            sx={{ width: '100%' }}
                        />
                    </div>
                </div>
                <div className='shipping-addr-container'>
                    <h2>Shipping address</h2>
                    <div className='shipping-addr-fields'>
                        <div className='shipping-name-fields'>
                            <TextField
                                required
                                id="outlined-required-name"
                                label="First name"
                                placeholder='First name'
                                sx={{ width: '100%' }}
                            />
                            <TextField
                                required
                                id="outlined-required-name"
                                label="Last name"
                                placeholder='Last name'
                                sx={{ width: '100%' }}
                            />
                        </div>
                        <TextField
                            required
                            id="outlined-required-addr"
                            label="Address"
                            placeholder='Address'
                        />
                        <div className='shipping-location-fields'>
                            <TextField
                                required
                                id="outlined-required-zip"
                                label="Zipcode"
                                placeholder='Zipcode'
                                sx={{ width: '80%' }}
                            />
                            <TextField
                                required
                                id="outlined-required-city"
                                label="City"
                                placeholder='City'
                                sx={{ width: '100%' }}
                            />
                            <TextField
                                id="outlined-select-state"
                                select
                                label="Select state"
                                sx={{ width: '60%' }}
                                defaultValue=""
                                >
                                {STATES.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className='return-checkout-links'>
                    <Link className="link" to='/tickets'>{'<'} Return to tickets</Link>
                    <button className='checkout-button'>
                        <h3>Complete order</h3>
                    </button>
                </div>
            </div>
            <div className='item-summary'>
                <h1>Order Summary</h1>
            </div>
        </div>
        </>
    );
}

export default Checkout