import './Tickets.css'
import { useState } from 'react';
import Attraction1 from '../../assets/attraction_1.jpg';
import Food1 from '../../assets/whataburger.jpg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Tickets = () => {

    const [standardTicket, setStandardTicket] = useState(0);
    const [expressTicket, setExpressTicket] = useState(0);
    const [childTicket, setChildTicket] = useState(0);

    const [standardFoodTicket, setStandardFoodTicket] = useState(0);
    const [expressFoodTicket, setExpressFoodTicket] = useState(0);
    const [deluxeFoodTicket, setDeluxeFoodTicket] = useState(0);
    
    return (
        <div className="tickets-container">
            <div className='tickets-header'>
                <h1>Theme Park Tickets</h1>
                <p>Embark on a journey beyond your wildest dreams!</p>
            </div>
            <div className='tickets-content'>
                <div className='select-tickets'>
                    <h2>Select your ticket</h2>
                    <div className='ticket-options'>
                        <div className='ticket-option'>
                            <h3>Standard</h3>
                            <h4>$65</h4>
                            <div>Provides full-day access to thrilling rides, entertaining shows, and unique attractions for guests of all ages</div>
                            <div className='remove-add-tickets'>
                                <RemoveCircleOutlineIcon fontSize='large' pointerEvents={standardTicket === 0? 'none': ''} color={standardTicket === 0? 'action' : ''} 
                                    onClick={()=>setStandardTicket(standardTicket-1)}
                                />
                                <div className='ticket-count'>{standardTicket}</div>
                                <AddCircleOutlineIcon fontSize='large' 
                                    onClick={()=>setStandardTicket(standardTicket+1)}
                                />
                            </div>
                        </div>
                        <div className='ticket-option'>
                            <h3>Express</h3>
                            <h4>$90</h4>
                            <div>Offers priority access to select rides and attractions, letting you skip the lines and experience more in less time</div>
                            <div className='remove-add-tickets'>
                                <RemoveCircleOutlineIcon fontSize='large' pointerEvents={expressTicket === 0? 'none': ''} color={expressTicket === 0? 'action' : ''}
                                    onClick={()=>setExpressTicket(expressTicket-1)}
                                />
                                <div className='ticket-count'>{expressTicket}</div>
                                <AddCircleOutlineIcon fontSize='large' 
                                    onClick={()=>setExpressTicket(expressTicket+1)}
                                />
                            </div>
                        </div>
                        <div className='ticket-option'>
                            <h3>Child</h3>
                            <h4>$45</h4>
                            <div>Offering kids aged 3-12 discounted access to a magical day of rides, shows, and attractions</div>
                            <div className='remove-add-tickets'>
                                <RemoveCircleOutlineIcon fontSize='large' pointerEvents={childTicket === 0? 'none': ''} color={childTicket === 0? 'action' : ''}
                                    onClick={()=>setChildTicket(childTicket-1)}
                                />
                                <div className='ticket-count'>{childTicket}</div>
                                <AddCircleOutlineIcon fontSize='large' 
                                    onClick={()=>setChildTicket(childTicket+1)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='attractions-content'>
                    <div className='select-attractions'>
                        <h2>Select the attractions you're planning to ride</h2>
                        <div className='attractions-options'>
                            <div className='attraction-option'>
                                <img src={Attraction1} alt="attraction1" />
                                <div className='attraction-desc'>
                                    <h3>Attraction 1</h3>
                                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam delectus eius doloremque maiores veritatis!</div>
                                </div>
                            </div>
                            <div className='attraction-option'>
                                <img src={Attraction1} alt="attraction1" />
                                <div className='attraction-desc'>
                                    <h3>Attraction 1</h3>
                                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam delectus eius doloremque maiores veritatis!</div>

                                </div>
                            </div>
                            <div className='attraction-option'>
                                <img src={Attraction1} alt="attraction1" />
                                <div className='attraction-desc'>
                                    <h3>Attraction 1</h3>
                                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam delectus eius doloremque maiores veritatis!</div>
                                </div>
                            </div>
                            <div className='attraction-option'>
                                <img src={Attraction1} alt="attraction1" />
                                <div className='attraction-desc'>
                                    <h3>Attraction 1</h3>
                                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. At aperiam delectus eius doloremque maiores veritatis!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='meal-content'>
                    <div className='select-meals'>
                        <h2>Select your meal vouchers</h2>  
                        <div className='meal-options'>
                            <div className='meal-option'>
                                <img src={Food1} alt="Food1" />
                                <h3> Whataburger </h3>
                                <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, doloremque.</div>
                                <div className='remove-add-tickets'>
                                <RemoveCircleOutlineIcon fontSize='large' pointerEvents={standardFoodTicket === 0? 'none': ''} color={standardFoodTicket === 0? 'action' : ''}
                                    onClick={()=>setStandardFoodTicket(standardFoodTicket-1)}
                                />
                                <div className='ticket-count'>{standardFoodTicket}</div>
                                <AddCircleOutlineIcon fontSize='large' 
                                    onClick={()=>setStandardFoodTicket(standardFoodTicket+1)}
                                />
                            </div>
                            </div>
                            <div className='meal-option'>
                                <img src={Food1} alt="Food1" />
                                <h3> Whataburger </h3>
                                <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, doloremque.</div>
                                <div className='remove-add-tickets'>
                                <RemoveCircleOutlineIcon fontSize='large' pointerEvents={expressFoodTicket === 0? 'none': ''} color={expressFoodTicket === 0? 'action' : ''}
                                    onClick={()=>setExpressFoodTicket(expressFoodTicket-1)}
                                />
                                <div className='ticket-count'>{expressFoodTicket}</div>
                                <AddCircleOutlineIcon fontSize='large' 
                                    onClick={()=>setExpressFoodTicket(expressFoodTicket+1)}
                                />
                            </div>
                            </div>
                            <div className='meal-option'>
                                <img src={Food1} alt="Food1" />
                                <h3> Whataburger </h3>
                                <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, doloremque.</div>
                                <div className='remove-add-tickets'>
                                <RemoveCircleOutlineIcon fontSize='large' pointerEvents={deluxeFoodTicket === 0? 'none': ''} color={deluxeFoodTicket === 0? 'action' : ''}
                                    onClick={()=>setDeluxeFoodTicket(deluxeFoodTicket-1)}
                                />
                                <div className='ticket-count'>{deluxeFoodTicket}</div>
                                <AddCircleOutlineIcon fontSize='large' 
                                    onClick={()=>setDeluxeFoodTicket(deluxeFoodTicket+1)}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className='checkout-button'>
                <ShoppingCartIcon/> 
                <h3>Checkout</h3>
            </button>
        </div>
    );
}

export default Tickets