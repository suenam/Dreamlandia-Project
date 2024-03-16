import './Tickets.css'
import { useState } from 'react';
import Carousel from '../../assets/carousel.jpg';
import FerrisWheel from '../../assets/ferris_wheel.jpg';
import RollerCoaster from '../../assets/roller_coaster.jpg';
import ThemedRide from '../../assets/themed_rides.jpg';
import WaterRide from '../../assets/water_ride.jpg';
import Food1 from '../../assets/whataburger.jpg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Tickets = () => {

    const [standardTicket, setStandardTicket] = useState(0);
    const [expressTicket, setExpressTicket] = useState(0);
    const [childTicket, setChildTicket] = useState(0);

    const [attractions, setAttractions] = useState([]);

    const [standardFoodTicket, setStandardFoodTicket] = useState(0);
    const [expressFoodTicket, setExpressFoodTicket] = useState(0);
    const [deluxeFoodTicket, setDeluxeFoodTicket] = useState(0);

    const setAttractionFn = (newAttraction) => {
        if (!attractions.includes(newAttraction)) {
            setAttractions([...attractions, newAttraction]);
        }
        else {
            setAttractions(attractions.filter((attraction)=>attraction !== newAttraction));
        }
    }
    
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
                                <img src={RollerCoaster} />
                                <div className='attraction-desc'>
                                    <h3>Roller Coaster</h3>
                                    <div>Buckle up for a dreamlike journey on our roller coaster, where you'll soar through clouds and dive into the depths of an enchanted wonderland, feeling the thrill of magic at every twist and turn.</div>
                                </div>
                                <button className='add-attraction'
                                    style = {{backgroundColor: attractions.includes("rollerCoaster") ? "#67C237" : ''}}
                                    onClick={()=>setAttractionFn("rollerCoaster")}
                                >
                                    {attractions.includes("rollerCoaster") ? "Added ✔" : 'Add attraction'}
                                </button>
                            </div>
                            <div className='attraction-option'>
                                <img src={Carousel} />
                                <div className='attraction-desc'>
                                    <h3>Carousel</h3>
                                    <div>Mount your dream steed on our carousel, a revolving realm of wonder where every gallop and gentle melody transports you to a timeless dance amidst a kaleidoscope of lights and colors.</div>
                                </div>
                                <button className='add-attraction'
                                    style = {{backgroundColor: attractions.includes("carousel") ? "#67C237" : ''}}
                                    onClick={()=>setAttractionFn("carousel")}
                                >
                                    {attractions.includes("carousel") ? "Added ✔" : 'Add attraction'}
                                </button>
                            </div>
                            <div className='attraction-option'>
                                <img src={FerrisWheel} />
                                <div className='attraction-desc'>
                                    <h3>Ferris Wheel</h3>
                                    <div> Step into your own floating dream as you ascend the Ferris wheel, offering a serene escape high above, where the world below blends into a tapestry of lights and whimsy under the sky.</div>
                                </div>
                                <button className='add-attraction'
                                    style = {{backgroundColor: attractions.includes("ferrisWheel") ? "#67C237" : ''}}
                                    onClick={()=>setAttractionFn("ferrisWheel")}
                                >
                                    {attractions.includes("ferrisWheel") ? "Added ✔" : 'Add attraction'}
                                </button>
                            </div>
                            <div className='attraction-option'>
                                <img src={ThemedRide} />
                                <div className='attraction-desc'>
                                    <h3>Themed Rides</h3>
                                    <div>Embark on a journey through magical realms on our dark themed rides, where each turn unveils a fragment of a dream, weaving stories that dance in the delicate balance between fantasy and mystery.</div>
                                </div>
                                <button className='add-attraction'
                                    style = {{backgroundColor: attractions.includes("themedRide") ? "#67C237" : ''}}
                                    onClick={()=>setAttractionFn("themedRide")}
                                >
                                    {attractions.includes("themedRide") ? "Added ✔" : 'Add attraction'}
                                </button>
                            </div>
                            <div className='attraction-option'>
                                <img src={WaterRide} />
                                <div className='attraction-desc'>
                                    <h3>Water Rides</h3>
                                    <div>Glide through mystical waters on our water rides, where splashes lead to laughter and each drop is a portal to a refreshing adventure in a lush, dream-infused landscape.</div>
                                </div>
                                <button className='add-attraction'
                                    style = {{backgroundColor: attractions.includes("waterRide") ? "#67C237" : ''}}
                                    onClick={()=>setAttractionFn("waterRide")}
                                >
                                    {attractions.includes("waterRide") ? "Added ✔" : 'Add attraction'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='meal-content'>
                    <div className='select-meals'>
                        <h2>Select your meal vouchers</h2>  
                        <div className='meal-options'>
                            <div className='meal-option'>
                                <img src={Food1} />
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
                                <img src={Food1} />
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
                                <img src={Food1} />
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