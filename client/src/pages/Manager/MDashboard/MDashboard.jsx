import React, { useState } from 'react'
import Card from '../../../components/Card/Card'
import MSidebar from '../../../components/MSidebar/MSidebar';
import { useOutletContext } from 'react-router-dom';
import  { useEffect } from 'react';
import './MDashboard.css';

function MDashboard() {
    const { setShowNavbar } = useOutletContext();
    setShowNavbar(false);
    const maintenanceRequests = [
        { id: 1, attraction: 'attraction1', status: 'Open', comment: 'Initial request' },
        { id: 2, attraction: 'attraction2', status: 'In Progress', comment: 'Working on it' },
        { id: 3, attraction: 'attraction3', status: 'Completed', comment: 'All done' },
    ];

    const [weatherDate, setWeatherDate] = useState('');
    const [weather, setWeather] = useState('');

    const handleWeatherSubmit = (e) => {
        e.preventDefault();
        // Handle weather form submission
        console.log('Weather:', weatherDate, weather);
    };

    return (
        <>
            <MSidebar />
            <h1 className='h1dash-manager'>Manager Dashboard</h1>
            <div  className='tickets-total-live'>
                <Card value="1213" text="TOTAL TICKETS SOLD" color="lightblue" size="200px"/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$12,821" text="REVENUE: TICKETS" color="orange" size="200px"/>
            </div>
            <div  className='standard-ticket-live'>
                <Card value="563" text="STANDARD" color="lightgrey"  size="100px" fontsize={15} vFontsize={25} borderRadius="60%"/>
            </div>
            <div  className='express-ticket-live'>
                <Card value="462" text="EXPRESS" color="lightgrey"  size="100px" fontsize={15} vFontsize={25} borderRadius="60%"/>
            </div>
            <div  className='child-ticket-live'>
                <Card value="252" text="CHILD" color="lightgrey"  size="100px" fontsize={15} vFontsize={25}borderRadius="60%" />
            </div>

            <div  className='tickets-total-live'>
                <Card value="102" text="TOTAL MEAL PLANS" color="lightblue" size="200px"/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$3,471" text="REVENUE: DINING" color="orange" size="200px"/>
            </div>
            <div  className='standard-ticket-live'>
                <Card value="23" text="STANDARD" color="lightgrey"  size="100px" fontsize={15} vFontsize={25} borderRadius="60%"/>
            </div>
            <div  className='express-ticket-live'>
                <Card value="25" text="DELUXE" color="lightgrey"  size="100px" fontsize={15} vFontsize={25} borderRadius="60%"/>
            </div>
            <div  className='child-ticket-live'>
                <Card value="32" text="SPECIAL" color="lightgrey"  size="100px" fontsize={15} vFontsize={25}borderRadius="60%" />
            </div>

            <div  className='tickets-total-live'>
                <Card value="125" text="TOTAL TRANSACTIONS" color="lightblue" size="200px"/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$4,672" text="REVENUE: SHOP" color="orange" size="200px"/>
            </div>

            <div  className='tickets-total-live'>
                <Card value="12" text="ACTIVE REQUESTS" color="lightblue" size="200px"/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$1,421" text="EXPENSE: MAINTENANCE" color="orange" size="200px"/>
            </div>

            <div className='input-weather'>
                <form onSubmit={handleWeatherSubmit}>
                    <div className="form-header">
                        <h3>Weather Input</h3>
                        <i title="Form to input weather information for a specific date.">&#9432;</i>
                    </div>
                    <div className="form-row">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={weatherDate}
                            onChange={(e) => setWeatherDate(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label>Weather:</label>
                        <select value={weather} onChange={(e) => setWeather(e.target.value)}>
                            <option value="">Select Weather</option>
                            <option value="sunny">Sunny</option>
                            <option value="cloudy">Cloudy</option>
                            <option value="rainy">Rainy</option>
                            <option value="snowy">Snowy</option>
                        </select>
                    </div>
                    <button className='generate-but-dr' type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default MDashboard