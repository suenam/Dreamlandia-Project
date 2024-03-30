import './Shop.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShirtImage1 from '../../assets/shirt1.jpg';
import ShirtImage2 from '../../assets/shirt2.jpg';
import PantsImage1 from '../../assets/pants1.jpg';
import PantsImage2 from '../../assets/pants2.jpg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sparkles from '../../components/SparkleCursor/Sparkles';
import { useShoppingCart } from '../../components/ShoppingCart/ShoppingCart';

const Shop = () => {

    const shoppingCartContext = useShoppingCart();
    
    const [selectedItems, setSelectedItems] = useState({
        shirt1: {
            size: '',
            quantity: 0,
        }, 
        shirt2: {
            size: '',
            quantity: 0,
        }, 
        pants1: {
            size: '',
            quantity: 0,
        }, 
        pants2: {
            size: '',
            quantity: 0,
        }, 
    })

    const handleSizeChange = (item, size) => {
        if (selectedItems[item].quantity == 0) {
            return;
        }
        setSelectedItems((prevItems) => ({
            ...prevItems,
            [item]: {
                ...prevItems[item],
                size,
            }
        }));
    };

    const updateQuantity = (item, value) => {
        setSelectedItems((prevItems) => {
            const newQuantity = prevItems[item].quantity + value;
            return {
                ...prevItems,
                [item]: {
                    size: newQuantity === 0 ? '' : prevItems[item].size,
                    quantity: newQuantity
                }
            };
        });
    };

    const addToCart = (item) => {
        if (!selectedItems[item].quantity || !selectedItems[item].size) {
            console.log("you did not select merch!");
            return false;
        }
        shoppingCartContext.setMerch({
            ...selectedItems
        })
        console.log("shirt added!");
        console.log(selectedItems);
        return true;
    }
    
    return (
        <div className="shop-container">
            <div className="shop-header">
                <Sparkles/>
                <h1>Theme Park Shop</h1>
                <p>Bring home a piece of the magic!</p>

            </div>
            <div className="shop-content">
                <div className="item-container">
                    <img src={ShirtImage1} alt="Shirt 1" />
                    <h3>Enchanted T-Shirt</h3>
                    <p>$24.99</p>
                    <div className="size-options">
                        <button
                            onClick={() => handleSizeChange('shirt1', 'S')}
                            style={{
                                backgroundColor: selectedItems.shirt1.size === 'S' ? '#67C237' : '',
                            }}
                        >
                            S
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt1', 'M')}
                            style={{
                                backgroundColor: selectedItems.shirt1.size === 'M' ? '#67C237' : '',
                            }}
                        >
                            M
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt1', 'L')}
                            style={{
                                backgroundColor: selectedItems.shirt1.size === 'L' ? '#67C237' : '',
                            }}
                        >
                            L
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt1', 'XL')}
                            style={{
                                backgroundColor: selectedItems.shirt1.size === 'XL' ? '#67C237' : '',
                            }}
                        >
                            XL
                        </button>
                    </div>
                    <div className="quantity-control">
                        <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={selectedItems.shirt1.quantity === 0 ? 'none' : ''}
                            color={selectedItems.shirt1.quantity === 0 ? 'action' : ''}
                            onClick={() => updateQuantity('shirt1', -1)}
                        />
                        <div className="quantity-count">{selectedItems.shirt1.quantity}</div>
                        <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() => updateQuantity('shirt1', 1)}
                        />
                    </div>
                    <button
                        className="add-to-cart-btn"
                        disabled={!selectedItems['shirt1'].quantity || !selectedItems["shirt1"].size}
                        onClick={()=>addToCart('shirt1')}
                    >
                        <ShoppingCartIcon />
                    </button>
                </div>

                <div className="item-container">
                    <img src={ShirtImage2} alt="Shirt 2" />
                    <h3>Enchanted T-Shirt 2.0</h3>
                    <p>$29.99</p>
                    <div className="size-options">
                        <button
                            onClick={() => handleSizeChange('shirt2', 'S')}
                            style={{
                                backgroundColor: selectedItems.shirt2.size === 'S' ? '#67C237' : '',
                            }}
                        >
                            S
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt2', 'M')}
                            style={{
                                backgroundColor: selectedItems.shirt2.size === 'M' ? '#67C237' : '',
                            }}
                        >
                            M
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt2', 'L')}
                            style={{
                                backgroundColor: selectedItems.shirt2.size === 'L' ? '#67C237' : '',
                            }}
                        >
                            L
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt2', 'XL')}
                            style={{
                                backgroundColor: selectedItems.shirt2.size === 'XL' ? '#67C237' : '',
                            }}
                        >
                            XL
                        </button>
                    </div>
                    <div className="quantity-control">
                        <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={selectedItems.shirt2.quantity === 0 ? 'none' : ''}
                            color={selectedItems.shirt2.quantity === 0 ? 'action' : ''}
                            onClick={() => updateQuantity('shirt2', -1)}
                        />
                        <div className="quantity-count">{selectedItems.shirt2.quantity}</div>
                        <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() => updateQuantity('shirt2', 1)}
                        />
                    </div>
                    <button
                        className="add-to-cart-btn"
                        disabled={!selectedItems['shirt2'].quantity || !selectedItems["shirt2"].size}
                        onClick={()=>addToCart('shirt2')}
                       
                    >
                        <ShoppingCartIcon />
                    </button>
                </div>
                <div className="item-container">
                    <img src={PantsImage1} alt="Pants 1" />
                    <h3>Enchanted Shorts</h3>
                    <p>$19.99</p>
                    <div className="size-options">
                        <button
                            onClick={() => handleSizeChange('pants1', 'S')}
                            style={{
                                backgroundColor: selectedItems.pants1.size === 'S' ? '#67C237' : '',
                            }}
                        >
                            S
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants1', 'M')}
                            style={{
                                backgroundColor: selectedItems.pants1.size === 'M' ? '#67C237' : '',
                            }}
                        >
                            M
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants1', 'L')}
                            style={{
                                backgroundColor: selectedItems.pants1.size === 'L' ? '#67C237' : '',
                            }}
                        >
                            L
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants1', 'XL')}
                            style={{
                                backgroundColor: selectedItems.pants1.size === 'XL' ? '#67C237' : '',
                            }}
                        >
                            XL
                        </button>
                    </div>
                    <div className="quantity-control">
                        <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={selectedItems.pants1.quantity === 0 ? 'none' : ''}
                            color={selectedItems.pants1.quantity === 0 ? 'action' : ''}
                            onClick={() => updateQuantity('pants1', -1)}
                        />
                        <div className="quantity-count">{selectedItems.pants1.quantity}</div>
                        <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() => updateQuantity('pants1', 1)}
                        />
                    </div>
                    <button
                        className="add-to-cart-btn"
                        disabled={!selectedItems['pants1'].quantity || !selectedItems["pants1"].size}
                        onClick={()=>addToCart('pants1')}
                        
                    >
                        <ShoppingCartIcon />
                    </button>
                </div>
                <div className="item-container">
                    <img src={PantsImage2} alt="Pants 2" />
                    <h3>Enchanted Shorts 2.0</h3>
                    <p>$24.99</p>
                    <div className="size-options">
                        <button
                            onClick={() => handleSizeChange('pants2', 'S')}
                            style={{
                                backgroundColor: selectedItems.pants2.size === 'S' ? '#67C237' : '',
                            }}
                        >
                            S
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants2', 'M')}
                            style={{
                                backgroundColor: selectedItems.pants2.size === 'M' ? '#67C237' : '',
                            }}
                        >
                            M
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants2', 'L')}
                            style={{
                                backgroundColor: selectedItems.pants2.size === 'L' ? '#67C237' : '',
                            }}
                        >
                            L
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants2', 'XL')}
                            style={{
                                backgroundColor: selectedItems.pants2.size === 'XL' ? '#67C237' : '',
                            }}
                        >
                            XL
                        </button>
                    </div>
                    <div className="quantity-control">
                        <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={selectedItems.pants2.quantity === 0 ? 'none' : ''}
                            color={selectedItems.pants2.quantity === 0 ? 'action' : ''}
                            onClick={() => updateQuantity('pants2', -1)}
                        />
                        <div className="quantity-count">{selectedItems.pants2.quantity}</div>
                        <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() => updateQuantity('pants2', 1)}
                        />
                    </div>
                    <button
                        className="add-to-cart-btn"
                        disabled={!selectedItems['pants2'].quantity || !selectedItems["pants2"].size}
                        onClick={()=>addToCart('pants2')}
                        
                    >
                        <ShoppingCartIcon />
                    </button>
                </div>
            </div>

            {/* <button className="checkout-button"
                onClick={handleCheckout}
            
            >
                <ShoppingCartIcon />
                <h3>Checkout</h3>
            </button> */}
        </div>
    );
};

export default Shop;