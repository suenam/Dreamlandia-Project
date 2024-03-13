import './Home.css'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>Dreamlandia, the dreamiest <br /> place on Earth!</h1>
        <p>
        <Link className="link" to="/tickets">Buy Tickets</Link>
        </p>
      </div>
    </div>
  );
}

export default Home
