import React from "react";
import './CartDropdown.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShoppingCart } from './ShoppingCart';
import { ticketDetails } from '../../constants/ticketModels';
import { merchDetails } from '../../constants/merchModel';
import EmptyCartIcon from '../../assets/empty_cart_blob.svg';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {

    const navigate = useNavigate();
    const shoppingCartContext = useShoppingCart();
    const tickets = shoppingCartContext.getTickets();
    const foodTickets = shoppingCartContext.getMealTickets();
    const merchItems = shoppingCartContext.getMerch();

    const isNotEmptyCart = () => {
        return (
            Object.values(tickets).some(ticketCount => ticketCount > 0)
            || Object.values(foodTickets).some(foodTicket => foodTicket.qty > 0)
            || Object.values(merchItems).some(merchItem => merchItem.quantity > 0)
        )
    }

    const removeMealTickets = () => {
        shoppingCartContext.setMealTickets({});
    }

    const removeMerchItem = (merchItem) => {
        shoppingCartContext.setMerch((prevMerchItems)=> {
            const { [merchItem]: _, ...rest } = prevMerchItems;
            return rest;
        });
    }

    return (
        <div className='cart-dropdown-container'>
            <div className="cart-dropdown-content">
                <h2>Your Cart <ShoppingCartIcon style={{ fontSize: 'large', verticalAlign: 'middle' }} /></h2>
                {!isNotEmptyCart() && <div className='empty-cart-text' style={{ textAlign: 'center', paddingBottom: '15px', color: '' }}> <img src={EmptyCartIcon} /><br />Cart is empty</div>}
                <div className="cart-dropdown-items">
                    {Object.values(tickets).some(ticketCount => ticketCount > 0) &&
                        <div className="cart-dropdown-item">
                            <div className="item-content">
                                <div className="item-name">
                                    Theme Park Tickets
                                </div>
                                <div className="item-details">
                                    {
                                        Object.entries(ticketDetails).map(([ticket, ticketDetails]) => {
                                            return tickets[ticket] !== 0 ?
                                                <React.Fragment key={ticket}>
                                                    - {ticketDetails.name} (x{tickets[ticket]}) <br />
                                                </React.Fragment> : null;
                                        })
                                    }
                                </div>
                            </div>
                            <div className="remove-item" onClick={()=>shoppingCartContext.resetTicketPage()}>
                                <RemoveCircleOutlineIcon />
                            </div>
                        </div>
                    }
                    {Object.values(foodTickets).some(foodTicket => foodTicket.qty > 0) &&
                        <div className="cart-dropdown-item">
                            <div className="item-content">
                                <div className="item-name">
                                    Theme Park Meal Tickets
                                </div>
                                <div className="item-details">
                                    {
                                        Object.values(foodTickets).map((foodTicket) => (
                                            <React.Fragment key={foodTicket.item.id}>
                                                - {foodTicket.item.name} (x{foodTicket.qty}) <br />
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="remove-item" onClick={removeMealTickets}>
                                <RemoveCircleOutlineIcon />
                            </div>
                        </div>
                    }
                    { Object.entries(merchItems).map(([merch, merchItemDetails]) => {
                            return merchItemDetails.quantity !== 0?
                        <div className="cart-dropdown-item" key={merch}>
                            <div className="item-content">
                                <div className="item-name">
                                    {merch}
                                </div>
                                <div className="item-details">
                                    {`Size: ${merchItemDetails.size}`}<br/>
                                    {`Quantity: x${merchItemDetails.quantity}`}
                                </div>
                            </div>
                            <div className="remove-item" onClick={()=>removeMerchItem(merch)}>
                                <RemoveCircleOutlineIcon />
                            </div>
                        </div> : null;
                    }) 
                }
                </div>
                {isNotEmptyCart() &&
                    <div className="button-holder">
                        <button className='cart-checkout-button' onClick={() => navigate('/checkout', { replace: true })}>
                            Checkout
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default CartDropdown;