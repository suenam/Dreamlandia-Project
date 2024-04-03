import './Attractions.css';
import Carousel from '../../assets/carousel.jpg';
import FerrisWheel from '../../assets/ferris_wheel.jpg';
import RollerCoaster from '../../assets/roller_coaster.jpg';
import ThemedRide from '../../assets/themed_rides.jpg';
import WaterRide from '../../assets/water_ride.jpg';
import HeightIcon from '@mui/icons-material/Height';
import { useState, useEffect } from 'react';
import Sparkles from '../../components/SparkleCursor/Sparkles';

const Attractions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  useEffect(() => {
    fetchAttractionStatus();
  }, []);

  const fetchAttractionStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}//attraction-status`);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      }
      else {
        console.error("FAILED TO FETCH!", data.message);
      }
    } catch (error) {
      console.error("There was an error: ", error);
    }
  }; 

  const attractions = [
    {
      name: 'Roller Coaster',
      image: RollerCoaster,
      description: 'Buckle up for a dreamlike journey on our roller coaster, where you\'ll soar through clouds and dive into the depths of an enchanted wonderland, feeling the thrill of magic at every twist and turn.',
      shortDescription: 'Soar through clouds and dive into enchanted wonderlands.',
      thrillLevel: 'High',
      heightRequirement: '48 inches',
    },
    {
      name: 'Carousel',
      image: Carousel,
      description: 'Mount your dream steed on our carousel, a revolving realm of wonder where every gallop and gentle melody transports you to a timeless dance amidst a kaleidoscope of lights and colors.',
      shortDescription: 'A revolving realm of wonder with galloping steeds.',
      thrillLevel: 'Low',
      heightRequirement: 'None',
    },
    {
      name: 'Ferris Wheel',
      image: FerrisWheel,
      description: 'Step into your own floating dream as you ascend the Ferris wheel, offering a serene escape high above, where the world below blends into a tapestry of lights and whimsy under the sky.',
      shortDescription: 'A serene escape high above with tapestries of lights.',
      thrillLevel: 'Low',
      heightRequirement: 'None',
    },
    {
      name: 'Themed Rides',
      image: ThemedRide,
      description: 'Embark on a journey through magical realms on our dark themed rides, where each turn unveils a fragment of a dream, weaving stories that dance in the delicate balance between fantasy and mystery.',
      shortDescription: 'Magical realms with stories of fantasy and mystery.',
      thrillLevel: 'Moderate',
      heightRequirement: '40 inches',
    },
    {
      name: 'Water Rides',
      image: WaterRide,
      description: 'Glide through mystical waters on our water rides, where splashes lead to laughter and each drop is a portal to a refreshing adventure in a lush, dream-infused landscape.',
      shortDescription: 'Refreshing adventures through mystical waters.',
      thrillLevel: 'Moderate',
      heightRequirement: '36 inches',
    },
  ];

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
      <div className="attractions-content">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className="attraction-option"
            onClick={() => handleAttractionClick(attraction)}
          >
            <img src={attraction.image} alt={attraction.name} />
            <h3>{attraction.name}</h3>
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
            <h3>{selectedAttraction.name}</h3>
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