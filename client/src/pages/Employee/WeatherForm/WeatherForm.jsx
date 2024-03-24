import { useOutletContext } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './WeatherForm.css'

const WeatherForm = () => {
  const { setShowNavbar, setShowFooter } = useOutletContext();
  setShowNavbar(false);
    setShowFooter(false);
  const handleWeatherSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/weatherform`, {
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
        const result = await response.json();
        alert(`Weather input failed: ${result.message}`);
        console.error("Weather input failed:", result.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };
const [WDate, setWeatherDate] = useState('');
const [WeatherCondition, setWeather] = useState('');


  return (
    <>
        <Sidebar />
        <h1 className='weather-form-header'>Weather Form</h1>
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

    </>
  );
}

export default WeatherForm;