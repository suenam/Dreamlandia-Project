import './CartDropdown.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className="cart-dropdown-content">
                <h2>Your Cart</h2>
                <div className="cart-dropdown-items">
                    <div className="cart-dropdown-item">
                        <div className="item-content">
                            <div className="item-name">
                                Item Name
                            </div>
                            <div className="item-details">
                                Item details..
                            </div>
                        </div>  
                        <div className="remove-item">
                            <RemoveCircleOutlineIcon/>
                        </div>
                    </div>
                    <div className="cart-dropdown-item">
                        <div className="item-content">
                            <div className="item-name">
                                Item 2 Name 
                            </div>
                            <div className="item-details">
                                Item 2 details..
                            </div>
                        </div>  
                        <div className="remove-item">
                            <RemoveCircleOutlineIcon/>
                        </div>
                    </div>
                </div>
                <div className="button-holder">
                    <button className='cart-checkout-button'>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartDropdown;