import './Tickets.css'

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
                        </div>
                        <div className='ticket-option'>
                            <h3>Standard</h3>
                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, modi!</div>
                        </div>
                        <div className='ticket-option'>
                            <h3>Standard</h3>
                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, modi!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tickets