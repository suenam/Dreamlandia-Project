
import './Shop.css';
import { useState, useEffect } from 'react';
import ShirtImage1 from '../../assets/shirt1.jpg';
import ShirtImage2 from '../../assets/shirt2.jpg';
import PantsImage1 from '../../assets/pants1.jpg';
import PantsImage2 from '../../assets/pants2.jpg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sparkles from '../../components/SparkleCursor/Sparkles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useShoppingCart } from '../../components/ShoppingCart/ShoppingCart';

const Shop = () => {
  const shoppingCartContext = useShoppingCart();
  const [selectedItems, setSelectedItems] = useState(shoppingCartContext.getMerch());
  const [merchandise, setMerchandise] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log(merchandise);
  }, [merchandise]);

  useEffect(() => {
    console.log(merchandise);
  }, [merchandise]);

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-merch`);
        const data = await response.json();

        if (response.ok) {
          setMerchandise(data.merchandise);

          // setSelectedItems(
          //   data.merchandise.reduce((acc, item) => {
          //     acc[item.name] = {
          //       size: '',
          //       quantity: 0,
          //       price: item.sellingCost, 
          //       image: item.image,
          //     };
          //     return acc;
          //   }, {})
          // );
        } else {
          console.error('FAILED TO FETCH MERCHANDISE!', data.message);
        }
      } catch (error) {
        console.error('There was an error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchandise();
  }, []);

  const handleSizeChange = (item, size) => {
    if (!selectedItems[item]?.quantity) {
      return;
    }
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [item]: {
        ...prevItems[item],
        size,
      },
    }));
  };

  const updateQuantity = (item, value) => {
    const nextValue = (selectedItems[item]?.quantity ?? 0) + value;

    if (nextValue < 0) {
      return;
    }
  
    setSelectedItems(prevItems => {
      if (nextValue === 0) {
        const { [item]: _, ...rest } = prevItems;
        return rest;
      }

      return {
        ...prevItems,
        [item]: {
          ...prevItems[item],
          item: merchandise.find(merchandise => merchandise.name === item),
          quantity: nextValue,
        }
      }
    });

    // setSelectedItems((prevItems) => {
    //   const newQuantity = (prevItems[item]?.quantity?? 0) + value;
    //   return {
    //     ...prevItems,
    //     [item]: {
    //       size: newQuantity === 0 ? '' : prevItems[item].size,
    //       quantity: newQuantity,
    //     },
    //   };
    // });
  };

  const addToCart = (item) => {
    if (!selectedItems[item].quantity || !selectedItems[item].size) {
      console.log('you did not select merch!');
      return false;
    }
    shoppingCartContext.setMerch((prevMerch) => ({
      ...prevMerch,
        [item]: {
          item: selectedItems[item].item,
          quantity: selectedItems[item].quantity,
          size: selectedItems[item].size,
        }
    }));
    console.log('shirt added!');
    console.log(shoppingCartContext.getMerch());
    return true;
  };

  return (
    <div className="shop-container">
      {loading && (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )}
      <div className="shop-header">
        <Sparkles />
        <h1>Theme Park Shop</h1>
        <p>Bring home a piece of the magic!</p>
      </div>
      <div className="shop-content">
        {merchandise.map((item, index) => (
          <div key={index} className="item-container">
            <img
              src={item.image
              }
              alt={item.name}
            />
            <h3>{item.name}</h3>
            <p>${item.sellingCost}</p>
            <div className="size-options">
              <button
                onClick={() => handleSizeChange(item.name, 'S')}
                style={{
                  backgroundColor:
                    selectedItems[item.name]?.size === 'S' ? '#67C237' : '',
                }}
              >
                S
              </button>
              <button
                onClick={() => handleSizeChange(item.name, 'M')}
                style={{
                  backgroundColor:
                    selectedItems[item.name]?.size === 'M' ? '#67C237' : '',
                }}
              >
                M
              </button>
              <button
                onClick={() => handleSizeChange(item.name, 'L')}
                style={{
                  backgroundColor:
                    selectedItems[item.name]?.size === 'L' ? '#67C237' : '',
                }}
              >
                L
              </button>
              <button
                onClick={() => handleSizeChange(item.name, 'XL')}
                style={{
                  backgroundColor:
                    selectedItems[item.name]?.size === 'XL' ? '#67C237' : '',
                }}
              >
                XL
              </button>
            </div>
            <div className="quantity-control">
              <RemoveCircleOutlineIcon
                fontSize="large"
                pointerEvents={
                  (selectedItems[item.name]?.quantity ?? 0) === 0 ? 'none' : ''
                }
                color={
                  (selectedItems[item.name]?.quantity ?? 0) === 0 ? 'action' : ''
                }
                onClick={() => updateQuantity(item.name, -1)}
              />
              <div className="quantity-count">
                {(selectedItems[item.name]?.quantity ?? 0)}
              </div>
              <AddCircleOutlineIcon
                fontSize="large"
                onClick={() => updateQuantity(item.name, 1)}
              />
            </div>
            <button
              className="add-to-cart-btn"
              disabled={
                !(selectedItems[item.name]?.quantity ?? 0) ||
                !selectedItems[item.name]?.size
              }
              onClick={() => addToCart(item.name)}
            >
              <ShoppingCartIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
