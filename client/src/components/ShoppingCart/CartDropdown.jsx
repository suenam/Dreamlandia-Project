import './CartDropdown.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShoppingCart } from './ShoppingCart';
import { ticketDetails, mealTickets } from '../../constants/ticketModels';
import EmptyCartIcon from '../../assets/empty_cart_blob.svg';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {

    const navigate = useNavigate();
    const shoppingCartContext = useShoppingCart();
    const tickets = shoppingCartContext.getTickets();
    const foodTickets = shoppingCartContext.getMealTickets()
    const merchItems = shoppingCartContext.getMerch();

    const isNotEmptyCart = () => {
        return (
            Object.values(tickets).some(ticketCount => ticketCount > 0)
            || Object.values(foodTickets).some(foodTicketCount => foodTicketCount > 0)
            // check if merch has something later
        )
    }

    const removeMealTickets = () => {
        shoppingCartContext.setMealTickets({
            standardMeal1: 0,
            standardMeal2: 0,
            deluxeMeal1: 0,
            deluxeMeal2: 0,
            specialMeal1: 0,
            specialMeal2: 0
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
                                                <>
                                                    - {ticketDetails.name} (x{tickets[ticket]}) <br />
                                                </> : null;
                                        })
                                    }
                                </div>
                            </div>
                            <div className="remove-item" onClick={()=>shoppingCartContext.resetTicketPage()}>
                                <RemoveCircleOutlineIcon />
                            </div>
                        </div>
                    }
                    {Object.values(foodTickets).some(foodTicketCount => foodTicketCount > 0) &&
                        <div className="cart-dropdown-item">
                            <div className="item-content">
                                <div className="item-name">
                                    Theme Park Meal Tickets
                                </div>
                                <div className="item-details">
                                    {
                                        Object.entries(mealTickets).map(([mealTicket, mealTicketDetails]) => {
                                            return foodTickets[mealTicket] !== 0 ?
                                                <>
                                                    - {mealTicketDetails.name} (x{foodTickets[mealTicket]}) <br />
                                                </> : null;
                                        })
                                    }
                                </div>
                            </div>
                            <div className="remove-item" onClick={removeMealTickets}>
                                <RemoveCircleOutlineIcon />
                            </div>
                        </div>
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