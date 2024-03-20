import React, { useState } from 'react'
import Card from '../../../components/Card/Card'
import MSidebar from '../../../components/MSidebar/MSidebar';
import { useOutletContext } from 'react-router-dom';
import  { useEffect } from 'react';
import './MDashboard.css';

function MDashboard() {
    const { setShowNavbar } = useOutletContext();
    setShowNavbar(false);
    
    const handleWeatherSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/weather`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ WeatherCondition, WDate }),
          });
    
          if (response.ok) {
            // Handle success - perhaps redirect to login or home page
            console.log("Signup successful");
          } else {
            // Handle errors - invalid input, user already exists, etc.
            console.error("Signup failed");
          }
        } catch (error) {
          console.error('There was an error:', error);
        }
      };
    const [WDate, setWeatherDate] = useState('');
    const [WeatherCondition, setWeather] = useState('');


    return (
        <>
            <MSidebar />
            <h1 className='h1dash-manager'>Manager Dashboard</h1>
            <div className='mdashboard-class'>
            <div  className='tickets-total-live'>
                <Card value="1213" text="TOTAL TICKETS SOLD" color="lightblue" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$12,821" text="REVENUE: TICKETS" color="orange" size="225px" fontsize={14} vFontsize={28}/>
            </div>
            <div  className='standard-ticket-live'>
                <Card value="563" text="STANDARD" color="lightgrey"  size="100px" fontsize={13} vFontsize={23} borderRadius="50%"/>
            </div>
            <div  className='express-ticket-live'>
                <Card value="462" text="EXPRESS" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23} borderRadius="50%"/>
            </div>
            <div  className='child-ticket-live'>
                <Card value="252" text="CHILD" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23}borderRadius="50%" />
            </div>

            <div  className='tickets-total-live'>
                <Card value="102" text="TOTAL MEAL PLANS" color="lightblue" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$3,471" text="REVENUE: DINING" color="orange" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='standard-ticket-live'>
                <Card value="23" text="STANDARD" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23} borderRadius="50%"/>
            </div>
            <div  className='express-ticket-live'>
                <Card value="25" text="DELUXE" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23} borderRadius="50%"/>
            </div>
            <div  className='child-ticket-live'>
                <Card value="32" text="SPECIAL" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23}borderRadius="50%" />
            </div>

            <div  className='tickets-total-live'>
                <Card value="125" text="TOTAL TRANSACTIONS" color="lightblue" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$4,672" text="REVENUE: SHOP" color="orange" size="225px"fontsize={14} vFontsize={28}/>
            </div>

            <div  className='active-req-main'>
                <Card value="12" text="ACTIVE REQUESTS" color="lightblue" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='expense-main-card'>
                <Card value="$1,421" text="EXPENSE: MAINTENANCE" color="orange" size="225px"fontsize={14} vFontsize={28}/>
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
                            value={WDate}
                            onChange={(e) => setWeatherDate(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label>Weather:</label>
                        <select value={WeatherCondition} onChange={(e) => setWeather(e.target.value)}>
                            <option value="">Select Weather</option>
                            <option value="sunny">Sunny</option>
                            <option value="cloudy">Cloudy</option>
                            <option value="rainy">Rainy</option>
                            <option value="snowy">Snowy</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            </div>
        </>
    )
}

export default MDashboard