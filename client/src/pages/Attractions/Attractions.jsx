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

const Attractions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  
  const [attractions, setAttractions] = useState([
    {
      name: 'Roller Coaster',
      image: RollerCoaster,
      description: 'Buckle up for a dreamlike journey on our roller coaster, where you\'ll soar through clouds and dive into the depths of an enchanted wonderland, feeling the thrill of magic at every twist and turn.',
      shortDescription: 'Soar through clouds and dive into enchanted wonderlands.',
      thrillLevel: 'High',
      heightRequirement: '48 inches',
      status: true,
    },
    {
      name: 'Carousel',
      image: Carousel,
      description: 'Mount your dream steed on our carousel, a revolving realm of wonder where every gallop and gentle melody transports you to a timeless dance amidst a kaleidoscope of lights and colors.',
      shortDescription: 'A revolving realm of wonder with galloping steeds.',
      thrillLevel: 'Low',
      heightRequirement: 'None',
      status: true
    },
    {
      name: 'Ferris Wheel',
      image: FerrisWheel,
      description: 'Step into your own floating dream as you ascend the Ferris wheel, offering a serene escape high above, where the world below blends into a tapestry of lights and whimsy under the sky.',
      shortDescription: 'A serene escape high above with tapestries of lights.',
      thrillLevel: 'Low',
      heightRequirement: 'None',
      status: true
    },
    {
      name: 'Themed Rides',
      image: ThemedRide,
      description: 'Embark on a journey through magical realms on our dark themed rides, where each turn unveils a fragment of a dream, weaving stories that dance in the delicate balance between fantasy and mystery.',
      shortDescription: 'Magical realms with stories of fantasy and mystery.',
      thrillLevel: 'Moderate',
      heightRequirement: '40 inches',
      status: true
    },
    {
      name: 'Water Rides',
      image: WaterRide,
      description: 'Glide through mystical waters on our water rides, where splashes lead to laughter and each drop is a portal to a refreshing adventure in a lush, dream-infused landscape.',
      shortDescription: 'Refreshing adventures through mystical waters.',
      thrillLevel: 'Moderate',
      heightRequirement: '36 inches',
      status: true
    },
  ]);

  const [currentWeather, setCurrentWeather] = useState('sunny');

  useEffect(() => {
    const setupWeatherAttractionStatus = async () => {
      await fetchCurrentWeather();
      await fetchAttractionStatus();
    }
    setupWeatherAttractionStatus();
  }, []);


  const fetchCurrentWeather = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/current-weather`);
      const data = await response.json();
      
      if (response.ok) {
        const currentWeather = data.requests[0]?.weatherStatus?? "sunny";
        if (!data.requests[0]) {
          const currentDate = new Date();
          const month = `${currentDate.getMonth()+1}`.padStart(2, '0');
          const day = `${currentDate.getDate()}`.padStart(2, '0');
          const year = currentDate.getFullYear();
          const formattedDate = `${year}-${month}-${day}`
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
  
  const fetchAttractionStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/attraction-status`);
      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        const updatedData = attractions.map((attraction) => ({
          ...attraction,
          status: data.requests.find(attractionNew => attractionNew.attractionName === attraction.name).attractionStatus
        }));
        
        setAttractions(updatedData);
        console.log(updatedData);
      }
      else {
        console.error("FAILED TO FETCH!", data.message);
      }
    } catch (error) {
      console.error("There was an error: ", error);
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
      <div className="attractions-header">
        <Sparkles/>
        <h1>Thrilling Attractions</h1>
        <p>Embark on a journey beyond your wildest dreams!</p>
      </div>
      <div className="weather-banner">
          <div className={`weather-banner-text ${currentWeather == 'sunny' || currentWeather == 'cloudy' ? 'good-moving' : 'moving'}`} style={{color: '#012F74'}}>
            <span style={{fontWeight: '600', letterSpacing: '5px'}}>
              TODAY'S WEATHER: {currentWeather.toUpperCase()}
            </span>
            <div className="weather-icon" style={{marginInline: '8px'}}>
            {
              currentWeather == 'rainy'? <ThunderstormIcon/> : 
              currentWeather == 'snowy'? <AcUnitIcon/> :
              currentWeather == 'cloudy'? <CloudIcon/> :
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
            <img src={attraction.image} alt={attraction.name} />
            <h3>{attraction.name}{!attraction.status && <ErrorIcon style={{color: "red", fontSize: 'medium', verticalAlign: 'center', marginLeft: '1px'}}/>}</h3> 
            <p>{attraction.shortDescription}</p>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
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