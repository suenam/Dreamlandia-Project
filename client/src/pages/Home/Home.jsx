import './Home.css'
import { useNavigate } from "react-router-dom";
import Sparkles from '../../components/SparkleCursor/Sparkles';


const Home = () => {

  const navigate =  useNavigate();

  return (
    <div className="home-container">
      <Sparkles/>
      <div className="home-text">
        <h1>Dreamlandia</h1>
        <span><i>the dreamiest place on Earth!</i></span>
        <button className='buy-tickets-button' onClick={()=>navigate('/tickets')}>
          Buy Tickets
        </button>
      </div>
    </div>
  );
}

export default Home
