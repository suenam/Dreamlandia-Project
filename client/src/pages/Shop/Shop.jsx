import './Shop.css';
import { useState } from 'react';
import ShirtImage1 from '../../assets/shirt1.jpg';
import ShirtImage2 from '../../assets/shirt2.jpg';
import PantsImage1 from '../../assets/pants1.jpg';
import PantsImage2 from '../../assets/pants2.jpg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Shop = () => {

    const [selectedSize, setSelectedSize] = useState({
        shirt1: '',
        shirt2: '',
        pants1: '',
        pants2: '',
    });

    const [quantities, setQuantities] = useState({
        shirt1: 0,
        shirt2: 0,
        pants1: 0,
        pants2: 0,
        cap: 0,
    });

    const handleSizeChange = (item, size) => {
        if (quantities[item] === 0) {
            setSelectedSize((prevSizes) => ({
                ...prevSizes,
                [item]: '',
            }));
        } else {
            setSelectedSize((prevSizes) => ({
                ...prevSizes,
                [item]: size,
            }));
        }
    };

    const updateQuantity = (item, value) => {
        setQuantities((prevQuantities) => {
            const newQuantity = prevQuantities[item] + value;
            if (newQuantity === 0) {
                handleSizeChange(item, '');
            }
            return {
                ...prevQuantities,
                [item]: newQuantity,
            };
        });
    };

    

    return (
        <div className="shop-container">
            <div className="shop-header">
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
                                backgroundColor: selectedSize.shirt1 === 'S' ? '#67C237' : '',
                            }}
                        >
                            S
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt1', 'M')}
                            style={{
                                backgroundColor: selectedSize.shirt1 === 'M' ? '#67C237' : '',
                            }}
                        >
                            M
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt1', 'L')}
                            style={{
                                backgroundColor: selectedSize.shirt1 === 'L' ? '#67C237' : '',
                            }}
                        >
                            L
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt1', 'XL')}
                            style={{
                                backgroundColor: selectedSize.shirt1 === 'XL' ? '#67C237' : '',
                            }}
                        >
                            XL
                        </button>
                    </div>
                    <div className="quantity-control">
                        <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={quantities.shirt1 === 0 ? 'none' : ''}
                            color={quantities.shirt1 === 0 ? 'action' : ''}
                            onClick={() => updateQuantity('shirt1', -1)}
                        />
                        <div className="quantity-count">{quantities.shirt1}</div>
                        <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() => updateQuantity('shirt1', 1)}
                        />
                    </div>
                    <button
                        className="add-to-cart-btn"
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
                                backgroundColor: selectedSize.shirt2 === 'S' ? '#67C237' : '',
                            }}
                        >
                            S
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt2', 'M')}
                            style={{
                                backgroundColor: selectedSize.shirt2 === 'M' ? '#67C237' : '',
                            }}
                        >
                            M
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt2', 'L')}
                            style={{
                                backgroundColor: selectedSize.shirt2 === 'L' ? '#67C237' : '',
                            }}
                        >
                            L
                        </button>
                        <button
                            onClick={() => handleSizeChange('shirt2', 'XL')}
                            style={{
                                backgroundColor: selectedSize.shirt2 === 'XL' ? '#67C237' : '',
                            }}
                        >
                            XL
                        </button>
                    </div>
                    <div className="quantity-control">
                        <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={quantities.shirt2 === 0 ? 'none' : ''}
                            color={quantities.shirt2 === 0 ? 'action' : ''}
                            onClick={() => updateQuantity('shirt2', -1)}
                        />
                        <div className="quantity-count">{quantities.shirt2}</div>
                        <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() => updateQuantity('shirt2', 1)}
                        />
                    </div>
                    <button
                        className="add-to-cart-btn"
                       
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
                                backgroundColor: selectedSize.pants1 === 'S' ? '#67C237' : '',
                            }}
                        >
                            S
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants1', 'M')}
                            style={{
                                backgroundColor: selectedSize.pants1 === 'M' ? '#67C237' : '',
                            }}
                        >
                            M
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants1', 'L')}
                            style={{
                                backgroundColor: selectedSize.pants1 === 'L' ? '#67C237' : '',
                            }}
                        >
                            L
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants1', 'XL')}
                            style={{
                                backgroundColor: selectedSize.pants1 === 'XL' ? '#67C237' : '',
                            }}
                        >
                            XL
                        </button>
                    </div>
                    <div className="quantity-control">
                        <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={quantities.pants1 === 0 ? 'none' : ''}
                            color={quantities.pants1 === 0 ? 'action' : ''}
                            onClick={() => updateQuantity('pants1', -1)}
                        />
                        <div className="quantity-count">{quantities.pants1}</div>
                        <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() => updateQuantity('pants1', 1)}
                        />
                    </div>
                    <button
                        className="add-to-cart-btn"
                        
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
                                backgroundColor: selectedSize.pants2 === 'S' ? '#67C237' : '',
                            }}
                        >
                            S
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants2', 'M')}
                            style={{
                                backgroundColor: selectedSize.pants2 === 'M' ? '#67C237' : '',
                            }}
                        >
                            M
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants2', 'L')}
                            style={{
                                backgroundColor: selectedSize.pants2 === 'L' ? '#67C237' : '',
                            }}
                        >
                            L
                        </button>
                        <button
                            onClick={() => handleSizeChange('pants2', 'XL')}
                            style={{
                                backgroundColor: selectedSize.pants2 === 'XL' ? '#67C237' : '',
                            }}
                        >
                            XL
                        </button>
                    </div>
                    <div className="quantity-control">
                        <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={quantities.pants2 === 0 ? 'none' : ''}
                            color={quantities.pants2 === 0 ? 'action' : ''}
                            onClick={() => updateQuantity('pants2', -1)}
                        />
                        <div className="quantity-count">{quantities.pants2}</div>
                        <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() => updateQuantity('pants2', 1)}
                        />
                    </div>
                    <button
                        className="add-to-cart-btn"
                        
                    >
                        <ShoppingCartIcon />
                    </button>
                </div>
            </div>

            <button className="checkout-button">
                <ShoppingCartIcon />
                <h3>Checkout</h3>
            </button>
        </div>
    );
};

export default Shop;