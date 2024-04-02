import { useOutletContext } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import './WeatherForm.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const WeatherForm = () => {


  const [WDate, setWeatherDate] = useState('');
  const [WeatherCondition, setWeather] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openFailureModal, setOpenFailureModal] = useState(false);


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
        setOpenSuccessModal(true); // Open success modal
        console.log('Weather input successful');
      } else {
        setOpenFailureModal(true); // Open failure modal
        const result = await response.json();
        console.error('Weather input failed:', result.message);
      }
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const handleCloseFailureModal = () => {
    setOpenFailureModal(false);
  };

  return (
    <>
      <Sidebar />
      <h1 className="weather-form-header">Weather Form</h1>
      <div className="input-weather">
        <form onSubmit={handleWeatherSubmit}>
          <div className="form-header">
            <h3>Weather Input</h3>
            <i title="Form to input weather information for a specific date.">&#9432;</i>
          </div>
          <div className="form-row">
            <label>
              Date:<span className="required">*</span>
            </label>
            <input
              type="date"
              value={WDate}
              onChange={(e) => setWeatherDate(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>
              Weather:<span className="required">*</span>
            </label>
            <select
              value={WeatherCondition}
              onChange={(e) => setWeather(e.target.value)}
              required
            >
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

      {/* Success Modal */}
      <Modal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="submit-success-modal-title"
        aria-describedby="submit-success-modal-description"
        className="modal-container submit-success-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="submit-success-modal-title" className="modal-title">
            Weather Input Successful
          </h2>
          <p id="submit-success-modal-description" className="modal-description">
            The weather input has been submitted successfully.
          </p>
          <button onClick={handleCloseSuccessModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>

      {/* Failure Modal */}
      <Modal
        open={openFailureModal}
        onClose={handleCloseFailureModal}
        aria-labelledby="submit-failure-modal-title"
        aria-describedby="submit-failure-modal-description"
        className="modal-container submit-failure-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
          className="modal-content"
        >
          <h2 id="submit-failure-modal-title" className="modal-title">
            Failed to Submit Weather Input
          </h2>
          <p id="submit-failure-modal-description" className="modal-description">
            There was an error while submitting the weather input.
          </p>
          <button onClick={handleCloseFailureModal} className="modal-button">
            Close
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default WeatherForm;