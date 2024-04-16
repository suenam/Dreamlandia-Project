import './Checkout.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { STATES } from '../../constants/stateOptions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Logo from '../../assets/logoWhiteBkg.png';
import { useShoppingCart } from '../../components/ShoppingCart/ShoppingCart';
import { ticketDetails } from '../../constants/ticketModels';
import { merchDetails } from '../../constants/merchModel';
import { useAuth } from '../auth/auth';
import axios from 'axios';

const Checkout = () => {

    const shoppingCartContext = useShoppingCart();
    const tickets = shoppingCartContext.getTickets();
    const foodTickets = shoppingCartContext.getMealTickets();
    const attractions = shoppingCartContext.getAttractions();
    const visitDate = shoppingCartContext.getDate().format("YYYY-MM-DD");

    const merchItems = shoppingCartContext.getMerch();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const auth = useAuth();
    const userID = auth.user.UserID;

    const [orderForm, setOrderForm] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: '',
        zipcode: '',
        city: '',
        state: '',
    })

    const updateOrderForm = (orderFormKey, value) => {
        setOrderForm(prevOrderForm => ({
            ...prevOrderForm,
            [orderFormKey]: value
        }));
    };

    const navigate = useNavigate();

    const getTotal = () => {
        let total = 0;
        Object.values(foodTickets).forEach((foodTicket) => {
            total += foodTicket.item.amount * foodTicket.qty;
        })

        Object.entries(ticketDetails).forEach(([ticket, ticketDetail]) => {
            total += ticketDetail.price * tickets[ticket];
        })

        Object.values(merchItems).forEach((merchDetail) => {
            total += merchDetail.item.sellingCost *  merchDetail.quantity;
        })

        return total;
    }

    let total = getTotal();
    const [errorState, setErrorState] = useState(false);

    // function that sends information our backend database when you click handle checkout
    const handleCheckout = async () => {
        console.log(userID)
        console.log(tickets)

        for (const orderKey in orderForm) {
            if (!orderForm[orderKey]) {
                setErrorState(true);
                console.log('ERRORRRRRR');
                return;
            }
        }

        try {
            /*
                TODO: UPDATE BACKEND TO HANDLE NEW foodTickets STRUCTURE:
                foodTickets will look like this:
                {
                    standardMeal1: {
                        item: {...},
                        qty: 4
                    },
                    expressMeal3: {
                        item: {...},
                        qty: 1
                    }
                }
            */

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/checkout`, {
                tickets,
                visitDate,
                foodTickets,
                attractions,
                userID,
                merchItems
            }, { withCredentials: true });

            if (response.status === 200) {
                // If the request is successful, perform the respective actions
                setLoading(true);
                setOpen(true);
                setTimeout(() => setLoading(false), 3000);

                // Reset frontend data
                shoppingCartContext.resetTicketPage();
            } else {
                // If the request fails, handle the error
                console.error('Checkout failed:', response.status);
                // Error message can be displayed to the user as needed
            }
        } catch (error) {
            // Handle request errors
            console.error('Error:', error);
            // Error message can be displayed to the user as needed
        }

    }

    return (
        <>
            <div className="checkout-container">
                <div className='checkout-info'>
                    <div className='checkout-logo'>
                        <img src={Logo} />
                    </div>
                    <div className='checkout-nav'>
                        <Link className='link' to='/tickets'>Tickets {' '}</Link>
                        <span>{'>'}</span>
                        <span> <b>Shipping</b> </span>
                        <span>{'>'}</span>
                        <span onClick={handleCheckout} style={{ cursor: 'pointer' }}> Complete</span>
                    </div>
                    <div className='checkout-contact-container'>
                        <h2>Contact information</h2>
                        <div className='checkout-contact-fields'>
                            <TextField
                                error={!orderForm.email}
                                required
                                id="outlined-required-email"
                                label="Email"
                                placeholder='Email'
                                sx={{ width: '100%' }}
                                onChange={(e) => updateOrderForm('email', e.target.value)}
                            />
                            <TextField
                                error={!orderForm.phone}
                                required
                                id="outlined-required-phone"
                                label="Phone"
                                placeholder='Phone'
                                sx={{ width: '100%' }}
                                onChange={(e) => updateOrderForm('phone', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='shipping-addr-container'>
                        <h2>Shipping address</h2>
                        <div className='shipping-addr-fields'>
                            <div className='shipping-name-fields'>
                                <TextField
                                    error={!orderForm.firstName}
                                    required
                                    id="outlined-required-name"
                                    label="First name"
                                    placeholder='First name'
                                    sx={{ width: '100%' }}
                                    onChange={(e) => updateOrderForm('firstName', e.target.value)}
                                />
                                <TextField
                                    error={!orderForm.lastName}
                                    required
                                    id="outlined-required-name"
                                    label="Last name"
                                    placeholder='Last name'
                                    sx={{ width: '100%' }}
                                    onChange={(e) => updateOrderForm('lastName', e.target.value)}
                                />
                            </div>
                            <TextField
                                error={!orderForm.address}
                                required
                                id="outlined-required-addr"
                                label="Address"
                                placeholder='Address'
                                onChange={(e) => updateOrderForm('address', e.target.value)}
                            />
                            <div className='shipping-location-fields'>
                                <TextField
                                    error={!orderForm.zipcode}
                                    required
                                    id="outlined-required-zip"
                                    label="Zipcode"
                                    placeholder='Zipcode'
                                    sx={{ width: '80%' }}
                                    onChange={(e) => updateOrderForm('zipcode', e.target.value)}
                                />
                                <TextField
                                    error={!orderForm.city}
                                    required
                                    id="outlined-required-city"
                                    label="City"
                                    placeholder='City'
                                    sx={{ width: '100%' }}
                                    onChange={(e) => updateOrderForm('city', e.target.value)}
                                />
                                <TextField
                                    id="outlined-select-state"
                                    error={!orderForm.state}
                                    select
                                    label="Select state"
                                    sx={{ width: '60%' }}
                                    defaultValue=""
                                    onChange={(e) => updateOrderForm('state', e.target.value)}
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
                        <div className='checkout-button-error'>
                            <button className='checkout-button' onClick={handleCheckout}>
                                <h3>Complete order</h3>
                            </button>
                            {errorState && <div className='error-message' style={{ color: "red" }}>*Please complete missing fields</div>}
                        </div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            {loading ? <CircularProgress color="inherit" />
                                : <div className="order-confirmation">
                                    <div className="order-confirmation-text">
                                        <svg width="50" height="50" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.998 0.00499725C15.515 0.00499725 19.995 4.485 19.995 10.002C19.995 15.52 15.515 20 9.998 20C4.48 20 0 15.52 0 10.002C0 4.485 4.48 0.00499725 9.998 0.00499725ZM4.949 10.391L8.8 13.821C8.942 13.949 9.121 14.011 9.299 14.011C9.501 14.011 9.704 13.93 9.851 13.769L15.804 7.26C15.935 7.117 16 6.937 16 6.758C16 6.348 15.669 6.011 15.252 6.011C15.048 6.011 14.847 6.093 14.698 6.254L9.245 12.216L5.947 9.278C5.803 9.151 5.626 9.088 5.448 9.088C5.033 9.088 4.7 9.423 4.7 9.834C4.7 10.039 4.784 10.243 4.949 10.391Z" fill="#00AC07" />
                                        </svg>
                                        <div className="thank-you">
                                            Thank you!
                                        </div>
                                        <div className="order-confirmed">
                                            Your order has been confirmed!
                                        </div>
                                        <button className='return-home' onClick={() => navigate('/', { replace: true })}>
                                            Return to home
                                        </button>
                                    </div>
                                </div>
                            }
                        </Backdrop>
                    </div>
                </div>
                <div className='item-summary'>
                    <h1>Order Summary</h1>
                    <div className="item-summary-list">
                        {Object.entries(ticketDetails).map(([ticket, ticketDetails]) => {
                            return tickets[ticket] !== 0 ?
                                <div className="order-item" key={ticket}>
                                    <div className='checkout-item-pic'>
                                        <img src={ticketDetails.image} />
                                    </div>
                                    <div className='item'>
                                        {ticketDetails.name}
                                        <div className="item-quantity">
                                            Quantity: {tickets[ticket]}
                                        </div>
                                    </div>
                                    <div className='price'>${ticketDetails.price * tickets[ticket]}</div>
                                </div>
                                : null;
                        })}
                        {Object.values(foodTickets).map((foodTicket) => (
                            <div className="order-item" key={foodTicket.item.id}>
                                <div className='checkout-item-pic'>
                                    <img src={foodTicket.item.image} />
                                </div>
                                <div className='item'>
                                    {foodTicket.item.name}
                                    <div className="item-quantity">
                                        {foodTicket.item.type}<br />
                                        Quantity: {foodTicket.qty}
                                    </div>
                                </div>
                                <div className='price'>${foodTicket.item.amount * foodTicket.qty}</div>
                            </div>
                        ))}
                        {Object.entries(merchItems).map(([merch, merchDetail]) => {
                            return merchDetail.quantity !== 0 ?
                                <div className="order-item" key={merch}>
                                    <div className='checkout-item-pic'>
                                        <img src={merchDetail.item.image} />
                                    </div>
                                    <div className='item'>
                                        {merch}
                                        <div className="item-quantity">
                                            Quantity: {merchDetail.quantity}<br />
                                            Size: {merchDetail.size}
                                        </div>
                                    </div>
                                    <div className='price'>${merchDetail.item.sellingCost * merchDetail.quantity}</div>
                                </div>
                                : null;
                        })}
                    </div>
                    <div className="total-details">
                        <div className='line-item'>
                            <span className='label'>Subtotal:</span>
                            <span className='value'>${total.toFixed(2)}</span>
                        </div>
                        <div className='line-item'>
                            <span className='label'>Tax:</span>
                            <span className='value'>${(total * 0.0825).toFixed(2)}</span>
                        </div>
                        <div className='line-item total'>
                            <span className='label'><b>Total:</b></span>
                            <span className='value'><b>${(total * 1.0825).toFixed(2)}</b></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout
