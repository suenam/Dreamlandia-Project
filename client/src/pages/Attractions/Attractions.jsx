import './Attractions.css';
import Carousel from '../../assets/carousel.jpg';
import FerrisWheel from '../../assets/ferris_wheel.jpg';
import RollerCoaster from '../../assets/roller_coaster.jpg';
import ThemedRide from '../../assets/themed_rides.jpg';
import WaterRide from '../../assets/water_ride.jpg';
import HeightIcon from '@mui/icons-material/Height';
import { useState, useEffect } from 'react';
import Sparkles from '../../components/SparkleCursor/Sparkles';
import CircleIcon from '@mui/icons-material/Circle';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ErrorIcon from '@mui/icons-material/Error';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Attractions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [currentWeather, setCurrentWeather] = useState('sunny');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const setupWeatherAttractionStatus = async () => {
      await fetchCurrentWeather();
      await fetchAttractions();
    };
    setupWeatherAttractionStatus();
  }, []);

  const fetchCurrentWeather = async () => {
    try {
      const currentDate = new Date();
      const month = `${currentDate.getMonth() + 1}`.padStart(2, '0');
      const day = `${currentDate.getDate()}`.padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
    
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/current-weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ WDate: formattedDate })
      });
      const data = await response.json();

      if (response.ok) {
        const currentWeather = data.requests[0]?.weatherStatus ?? "sunny";
        if (!data.requests[0]) {
          await fetch(`${import.meta.env.VITE_SERVER_URL}/weatherform`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ WeatherCondition: "sunny", WDate: formattedDate }),
          });
        }
        setCurrentWeather(currentWeather);
      }
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  const fetchAttractions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/attractions`);
      const data = await response.json();

      if (response.ok) {
        setAttractions(data.attractions);
      } else {
        console.error("FAILED TO FETCH!", data.message);
      }
    } catch (error) {
      console.error("There was an error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttractionClick = (attraction) => {
    setSelectedAttraction(attraction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAttraction(null);
  };

  return (
    <div className="attractions-container">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="attractions-header">
        <Sparkles/>
        <h1>Thrilling Attractions</h1>
        <p>Embark on a journey beyond your wildest dreams!</p>
      </div>
      <div className="weather-banner">
        <div className={`weather-banner-text ${currentWeather === 'sunny' || currentWeather === 'cloudy' ? 'good-moving' : 'moving'}`} style={{color: '#012F74'}}>
          <span style={{fontWeight: '600', letterSpacing: '5px'}}>
            TODAY'S WEATHER: {currentWeather.toUpperCase()}
          </span>
          <div className="weather-icon" style={{marginInline: '8px'}}>
            {
              currentWeather === 'rainy' ? <ThunderstormIcon/> :
              currentWeather === 'snowy' ? <AcUnitIcon/> :
              currentWeather === 'cloudy' ? <CloudIcon/> :
              <WbSunnyIcon/>
            }
          </div>
          {
            currentWeather !== 'sunny' && currentWeather !== 'cloudy' &&
            <span style={{fontSize:'20px'}}>
              Certain rides may be closed due to inclement weather
            </span>
          }
        </div>
      </div>
      <div className="attractions-content">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className="attraction-option"
            onClick={() => handleAttractionClick(attraction)}
          >
            <img src={attraction.image || (attraction.name === 'Carousel' ? Carousel : attraction.name === 'Ferris Wheel' ? FerrisWheel : attraction.name === 'Roller Coaster' ? RollerCoaster : attraction.name === 'Themed Rides' ? ThemedRide : WaterRide)} alt={attraction.name} />
            <h3>{attraction.name}{!attraction.status && <ErrorIcon style={{color: "red", fontSize: 'medium', verticalAlign: 'center', marginLeft: '1px'}}/>}</h3>
            <p>{attraction.shortDescription}</p>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal" >
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <h3 style={{display: 'flex', alignItems: 'center'}}>{selectedAttraction.name}<CircleIcon style={{color: !selectedAttraction.status? "red" : "green", fontSize: 'small', verticalAlign: 'center', marginLeft: '3px'}}/>
              <span style={{fontWeight: '600', fontSize: '13px',marginLeft:'2px'}}>
                {!selectedAttraction.status? "CLOSED" : "OPEN"}
              </span>
            </h3>
            <p>{selectedAttraction.description}</p>
            <div className="modal-details">
              <p>
                <strong>Thrill Level:</strong> {selectedAttraction.thrillLevel}
              </p>
              <p>
                <strong>Height:</strong> <HeightIcon /> {selectedAttraction.heightRequirement}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attractions;