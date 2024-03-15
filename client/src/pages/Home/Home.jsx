import './Home.css'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>Dreamlandia, the dreamiest <br /> place on Earth!</h1>
        <Link className="link" to="/tickets">Buy Tickets</Link>
        <Link className="link" to="/employee">Employee page</Link>
        <Link className="link" to="/manager">manager page</Link>

      </div>
    </div>
  );
}

export default Home
