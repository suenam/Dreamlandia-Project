import './Tickets.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Attraction1 from '../../assets/attraction_1.jpg';

const Tickets = () => {
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
                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, modi!</div>
                            <div className='remove-add-tickets'>
                                <RemoveCircleOutlineIcon />
                                <p> 4 </p>
                                <AddCircleOutlineIcon />
                            </div>
                        </div>
                        <div className='ticket-option'>
                            <h3>Express</h3>
                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, modi!</div>
                        </div>
                        <div className='ticket-option'>
                            <h3>Child</h3>
                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, modi!</div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tickets