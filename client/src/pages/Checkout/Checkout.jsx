import './Checkout.css';
import { Link } from "react-router-dom";
import { STATES } from '../../constants/stateOptions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../assets/logoWhiteBkg.png';
import Carousel from '../../assets/carousel.jpg'
import Burger from '../../assets/whataburger.jpg';
import Steak from '../../assets/steak_restaurant.jpg';
import MyMelody from '../../assets/themed_restaurant.jpg';
import SilverSpoon from '../../assets/silverspoonfood.png';
import WhiteCastle from '../../assets/whitecastle.jpg';
import BellaFood from '../../assets/bellasfood.jpg';
import { useShoppingCart } from '../../components/ShoppingCart/ShoppingCart';

const Checkout = () => {

    const shoppingCartContext = useShoppingCart();
    const tickets = shoppingCartContext.getTickets();
    const foodTickets = shoppingCartContext.getMealTickets();
    

    const ticketDetails = {
        "standardTicket": {
            image: Carousel,
            name: "Standard Ticket",
            price: 65,
        },
        "expressTicket": {
            image: Carousel,
            name: "Express Ticket",
            price: 90,
        },
        "childTicket": {
            image: Carousel,
            name: "Child Ticket",
            price: 45,
        }
    }

    const mealTickets = {
        standardMeal1: {
            image: Burger, 
            name: "WhataSandwich",
            price: 10,
            type: "Standard Meal Voucher",
        },
        standardMeal2: {
            image: WhiteCastle, 
            name: "Burger Castle",
            price: 10,
            type: "Standard Meal Voucher",
        },
        deluxeMeal1: {
            image: Steak, 
            name: "The Velvet Vineyard",
            price: 35,
            type: "Deluxe Meal Voucher",
        },
        deluxeMeal2: {
            image: SilverSpoon, 
            name: "Silver Spoon Serenade",
            price: 35,
            type: "Deluxe Meal Voucher",
        },
        specialMeal1: {
            image: MyMelody, 
            name: "HerHarmony Eatery",
            price: 45,
            type: "Special Meal Voucher",
        },
        specialMeal2: {
            image: BellaFood, 
            name: "Bella's Fairy Tale Feast",
            price: 45,
            type: "Special Meal Voucher",
        },
    };
    
    const getTotal = () => {
        let total = 0;
        Object.entries(mealTickets).forEach(([mealTicket, mealTicketDetail]) => {
            total+=mealTicketDetail.price*foodTickets[mealTicket];
        }) 

        Object.entries(ticketDetails).forEach(([ticket, ticketDetail]) => {
            total+=ticketDetail.price*tickets[ticket];
        }) 

        return total;
    }

    let total = getTotal();

    return (
        <>
        <div className="checkout-container">
            <div className='checkout-info'>
                <div className='checkout-logo'>
                    <img src={Logo} /> 
                </div> 
                <div className='checkout-nav'>
                    {/* <Link to='/tickets'>Tickets</Link> */}
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
                <div className="item-summary-list">
                    {Object.entries(ticketDetails).map(([ticket, ticketDetails])=>{
                        return tickets[ticket]!==0? 
                        <div className="order-item">
                            <div className='checkout-item-pic'>
                                <img src={ticketDetails.image} />
                            </div>
                            <div className='item'>
                                {ticketDetails.name}
                                <div className="item-quantity">
                                    Quantity: {tickets[ticket]}
                                </div>
                            </div>
                            <div className='price'>${ticketDetails.price*tickets[ticket]}</div>
                        </div>
                    : null;
                    })}
                    {Object.entries(mealTickets).map(([mealTicketKey, mealTicketDetails]) => {
                        return foodTickets[mealTicketKey] !== 0 ? 
                            <div className="order-item">
                                <div className='checkout-item-pic'>
                                    <img src={mealTicketDetails.image} />
                                </div>
                                <div className='item'>
                                    {mealTicketDetails.name}
                                    <div className="item-quantity">
                                        {mealTicketDetails.type}<br/>
                                        Quantity: {foodTickets[mealTicketKey]}
                                    </div>
                                </div>
                                <div className='price'>${mealTicketDetails.price * foodTickets[mealTicketKey]}</div>
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
                        <span className='value'>${(total*0.0825).toFixed(2)}</span>
                    </div>
                    <div className='line-item total'>
                        <span className='label'><b>Total:</b></span> 
                        <span className='value'><b>${(total*1.0825).toFixed(2)}</b></span>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Checkout