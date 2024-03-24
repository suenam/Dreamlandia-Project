import React, { useState, useRef } from 'react';
import MSidebar from '../../../components/MSidebar/MSidebar';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { PDFExport } from "@progress/kendo-react-pdf";

import './MDashboard.css';


function MDashboard() {
    const { setShowNavbar, setShowFooter } = useOutletContext();
  setShowNavbar(false);
    setShowFooter(false);
    
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
            // Handle success 
            alert('Weather input successful!');
            console.log("Weather input successful");
          } else {
            // Handle errors 
            alert('Weather input failed.');
            console.error("Weather input failed");
          }
        } catch (error) {
          console.error('There was an error:', error);
        }
      };
    const [WDate, setWeatherDate] = useState('');
    const [WeatherCondition, setWeather] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            setCurrentDateTime(formattedDateTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const dashboardRef = useRef(null);

    const exportToPDF = () => {
        if (dashboardRef.current) {
            dashboardRef.current.save();
        }
    };

    return (
        <>
            <MSidebar />
            <PDFExport
                paperSize="auto"
                fileName="dashboard.pdf"
                margin={{ top: "1cm", bottom: "1cm" }}
                ref={dashboardRef}
            >
            <div className="mdash-header">
                <h1 className='h1dash-manager'>Manager Dashboard</h1>
                <span className="current-date-time">Date: {currentDateTime}</span>
                
            </div>

            
                <div className='mdashboard-class'>
            <div className='vertical-box'>
                    <h2>Tickets</h2>
                    <div className='box-content'>
                        <div className='value-container'>
                            <span className='big-value'>$12,821</span>
                            <span className='small-text'>REVENUE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>1213</span>
                            <span className='small-text'>TRANSACTIONS</span>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>563</span>
                                <span className='small-text'>STANDARD</span>
                            </div>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>462</span>
                                <span className='small-text'>EXPRESS</span>
                            </div>
                        </div>
                        <div className='small-value-container'>

                            <div className='small-value-item'>
                                <span className='small-value'>252</span>
                                <span className='small-text'>CHILD</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='vertical-box'>
                    <h2>Restaurant</h2>
                    <div className='box-content'>
                        <div className='value-container'>
                            <span className='big-value'>$3,471</span>
                            <span className='small-text'>REVENUE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>$1,239</span>
                            <span className='small-text'>EXPENSE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>102</span>
                            <span className='small-text'>TRANSACTIONS</span>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>23</span>
                                <span className='small-text'>STANDARD</span>
                            </div>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>25</span>
                                <span className='small-text'>DELUXE</span>
                            </div>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>32</span>
                                <span className='small-text'>SPECIAL</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='vertical-box'>
                    <h2>Maintenance Requests</h2>
                    <div className='box-content'>
                        <div className='value-container'>
                            <span className='big-value'>$3,471</span>
                            <span className='small-text'>EXPENSE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>12</span>
                            <span className='small-text'>ACTIVE REQUESTS</span>
                        </div>
                    </div>
                </div>

                <div className='vertical-box'>
                    <h2>Shop</h2>
                    <div className='box-content'>
                        <div className='value-container'>
                            <span className='big-value'>$9,136</span>
                            <span className='small-text'>REVENUE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>$4,672</span>
                            <span className='small-text'>EXPENSE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>292</span>
                            <span className='small-text'>TRANSACTIONS</span>
                        </div>
                    </div>
                </div>

            {/* <div className='input-weather'>
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
            </div> */}
            </div>
            </PDFExport>
            <button onClick={exportToPDF} className='exportPdf-mdash-butt'>Export to PDF</button>

        </>
    )
}

export default MDashboard