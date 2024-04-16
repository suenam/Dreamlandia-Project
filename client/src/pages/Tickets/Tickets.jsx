import "./Tickets.css";
import { useState, useEffect } from "react";
import Carousel from "../../assets/carousel.jpg";
import FerrisWheel from "../../assets/ferris_wheel.jpg";
import RollerCoaster from "../../assets/roller_coaster.jpg";
import ThemedRide from "../../assets/themed_rides.jpg";
import WaterRide from "../../assets/water_ride.jpg";
import Burger from "../../assets/whataburger.jpg";
import Steak from "../../assets/steak_restaurant.jpg";
import MyMelody from "../../assets/themed_restaurant.jpg";
import SilverSpoon from "../../assets/silverspoonfood.png";
import WhiteCastle from "../../assets/whitecastle.jpg";
import BellaFood from "../../assets/bellasfood.jpg";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useShoppingCart } from "../../components/ShoppingCart/ShoppingCart";
import { useNavigate } from "react-router-dom";
import Sparkles from "../../components/SparkleCursor/Sparkles";

const Tickets = () => {
  const shoppingCartContext = useShoppingCart();
  const navigate = useNavigate();
  const [attractionsLoading, setAttractionsLoading] = useState(true);

  const cartDate = shoppingCartContext.getDate();
  const [visitDate, setVisitDate] = useState(cartDate);
  const today = dayjs().startOf("day");

  const cartTickets = shoppingCartContext.getTickets();
  const [standardTicket, setStandardTicket] = useState(
    cartTickets.standardTicket
  );
  const [expressTicket, setExpressTicket] = useState(cartTickets.expressTicket);
  const [childTicket, setChildTicket] = useState(cartTickets.childTicket);

  const cartAttractions = shoppingCartContext.getAttractions();
  const [attractions, setAttractions] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]);

  const cartFoodTickets = shoppingCartContext.getMealTickets();
  const [foodTickets, setFoodTickets] = useState({
    ...cartFoodTickets,
  });
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/attractions`
        );
        const { attractions } = await response.json();
        setAttractions(attractions);
        setAttractionsLoading(false);
      } catch (error) {
        console.error("Error fetching attractions:", error);
        setAttractionsLoading(false);
      }
    };

    fetchAttractions();
  }, []);
  const [restaurant, setRestaurant] = useState([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/get-rest`
        );
        const { restaurants } = await response.json();
        setRestaurants(restaurants);
        setRestaurantsLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurantsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);
  const updateMealTicket = (mealType, restaurantId, value) => {
    const mealKey = `${mealType}Meal${restaurantId}`;
    console.log(foodTickets);
    setFoodTickets((prevFoodTickets) => ({
      ...prevFoodTickets,
      [mealKey]: Math.max(0, prevFoodTickets[mealKey] + value),
    }));
  };

  const setAttractionFn = (newAttraction) => {
    if (!selectedAttractions.includes(newAttraction)) {
      setSelectedAttractions([...selectedAttractions, newAttraction]);
    } else {
      setSelectedAttractions(
        selectedAttractions.filter((attraction) => attraction !== newAttraction)
      );
    }
  };
  const [restaurants, setRestaurants] = useState([]);

  const [errorState, setErrorState] = useState(false);

  const addToCart = () => {
    if (!standardTicket && !expressTicket && !childTicket) {
      setErrorState(true);
      console.log("no ticket selected");
      return false;
    }

    if (!selectedAttractions.length) {
      setErrorState(true);
      console.log("no attraction selected");
      return false;
    }

    shoppingCartContext.setTickets({
      standardTicket: standardTicket,
      expressTicket: expressTicket,
      childTicket: childTicket,
    });

    shoppingCartContext.setMealTickets({
      ...foodTickets,
    });

    shoppingCartContext.setAttractions(selectedAttractions);
    shoppingCartContext.setDate(visitDate);
    return true;
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    if (addToCart()) {
      navigate("/checkout", { replace: true });
    }
  };

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <Sparkles />
        <h1>Theme Park Tickets</h1>
        <p>Embark on a journey beyond your wildest dreams!</p>
      </div>
      <div className="tickets-content">
        <div className="select-tickets">
          <h2>Select your ticket</h2>
          <div className="ticket-options">
            <div className="ticket-option">
              <h3>Standard</h3>
              <h4>$65</h4>
              <div>
                Provides full-day access to thrilling rides, entertaining shows,
                and unique attractions for guests of all ages
              </div>
              <div className="remove-add-tickets">
                <RemoveCircleOutlineIcon
                  fontSize="large"
                  pointerEvents={standardTicket === 0 ? "none" : ""}
                  color={standardTicket === 0 ? "action" : ""}
                  onClick={() => setStandardTicket(standardTicket - 1)}
                />
                <div className="ticket-count">{standardTicket}</div>
                <AddCircleOutlineIcon
                  fontSize="large"
                  onClick={() => setStandardTicket(standardTicket + 1)}
                />
              </div>
            </div>
            <div className="ticket-option">
              <h3>Express</h3>
              <h4>$90</h4>
              <div>
                Offers priority access to select rides and attractions, letting
                you skip the lines and experience more in less time
              </div>
              <div className="remove-add-tickets">
                <RemoveCircleOutlineIcon
                  fontSize="large"
                  pointerEvents={expressTicket === 0 ? "none" : ""}
                  color={expressTicket === 0 ? "action" : ""}
                  onClick={() => setExpressTicket(expressTicket - 1)}
                />
                <div className="ticket-count">{expressTicket}</div>
                <AddCircleOutlineIcon
                  fontSize="large"
                  onClick={() => setExpressTicket(expressTicket + 1)}
                />
              </div>
            </div>
            <div className="ticket-option">
              <h3>Child</h3>
              <h4>$45</h4>
              <div>
                Offering kids aged 3-12 discounted access to a magical day of
                rides, shows, and attractions
              </div>
              <div className="remove-add-tickets">
                <RemoveCircleOutlineIcon
                  fontSize="large"
                  pointerEvents={childTicket === 0 ? "none" : ""}
                  color={childTicket === 0 ? "action" : ""}
                  onClick={() => setChildTicket(childTicket - 1)}
                />
                <div className="ticket-count">{childTicket}</div>
                <AddCircleOutlineIcon
                  fontSize="large"
                  onClick={() => setChildTicket(childTicket + 1)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="attractions-content">
          <div className="select-attractions">
            <h2>Select the attractions you're planning to ride</h2>
            <div className="attractions-options">
              {attractionsLoading ? (
                <div>Loading attractions...</div>
              ) : (
                attractions.map((attraction) => (
                  <div key={attraction.name} className="attraction-option">
                    <img src={attraction.image} />
                    <div className="attraction-desc">
                      <h3>{attraction.name}</h3>
                      <div>{attraction.description}</div>
                    </div>
                    <button
                      className="add-attraction"
                      style={{
                        backgroundColor: selectedAttractions.includes(
                          attraction.name
                        )
                          ? "#67C237"
                          : "",
                      }}
                      onClick={() => setAttractionFn(attraction.name)}
                    >
                      {selectedAttractions.includes(attraction.name)
                        ? "Added ✔"
                        : "Add attraction"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="meal-content">
          <div className="select-meals">
            <h2>Select your meal vouchers (one per person)</h2>
            <div className="meal-options">
              <div className="meal-options-col">
                <h4>Standard ($10/ea)</h4>
                <i>Quick eats and quick service</i>

                {restaurantsLoading ? (
                  <div>Loading restaurants...</div>
                ) : (
                  restaurants
                    .filter((restaurant) => restaurant.type === "Standard")
                    .map((restaurant) => (
                      <div key={restaurant.id} className="meal-option">
                        <img src={restaurant.image} />
                        <h3>{restaurant.name}</h3>
                        <span>{restaurant.description}</span>
                        <div className="remove-add-tickets">
                          <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={
                              foodTickets[`standard${restaurant.id}`] === 0
                                ? "none"
                                : ""
                            }
                            color={
                              foodTickets[`standard${restaurant.id}`] === 0
                                ? "action"
                                : ""
                            }
                            onClick={() =>
                              updateMealTicket("standard", restaurant.id, -1)
                            }
                          />
                          <div className="ticket-count">
                            {foodTickets[`standardMeal${restaurant.id}`]}
                          </div>
                          <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() =>
                              updateMealTicket("standard", restaurant.id, 1)
                            }
                          />
                        </div>
                      </div>
                    ))
                )}
              </div>

              <div className="meal-options-col">
                <h4>Deluxe ($35/ea)</h4>
                <i>Fine dining in luxury</i>
                {restaurantsLoading ? (
                  <div>Loading restaurants...</div>
                ) : (
                  restaurants
                    .filter((restaurant) => restaurant.type === "Deluxe")
                    .map((restaurant) => (
                      <div key={restaurant.id} className="meal-option">
                        <img src={restaurant.image} />
                        <h3>{restaurant.name}</h3>
                        <span>{restaurant.description}</span>
                        <div className="remove-add-tickets">
                          <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={
                              foodTickets[`deluxeMeal${restaurant.id}`] === 0
                                ? "none"
                                : ""
                            }
                            color={
                              foodTickets[`deluxeMeal${restaurant.id}`] === 0
                                ? "action"
                                : ""
                            }
                            onClick={() =>
                              updateMealTicket("deluxe", restaurant.id, -1)
                            }
                          />
                          <div className="ticket-count">
                            {foodTickets[`deluxeMeal${restaurant.id}`]}
                          </div>
                          <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() =>
                              updateMealTicket("deluxe", restaurant.id, 1)
                            }
                          />
                        </div>
                      </div>
                    ))
                )}
              </div>

              <div className="meal-options-col">
                <h4>Special ($45/ea)</h4>
                <i>Themed character restaurants</i>
                {restaurantsLoading ? (
                  <div>Loading restaurants...</div>
                ) : (
                  restaurants
                    .filter((restaurant) => restaurant.type === "Special")
                    .map((restaurant) => (
                      <div key={restaurant.id} className="meal-option">
                        <img src={restaurant.image} />
                        <h3>{restaurant.name}</h3>
                        <span>{restaurant.description}</span>
                        <div className="remove-add-tickets">
                          <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={
                              foodTickets[`specialMeal${restaurant.id}`] === 0
                                ? "none"
                                : ""
                            }
                            color={
                              foodTickets[`specialMeal${restaurant.id}`] === 0
                                ? "action"
                                : ""
                            }
                            onClick={() =>
                              updateMealTicket("special", restaurant.id, -1)
                            }
                          />
                          <div className="ticket-count">
                            {foodTickets[`specialMeal${restaurant.id}`]}
                          </div>
                          <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() =>
                              updateMealTicket("special", restaurant.id, 1)
                            }
                          />
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="calendar-container">
          <h2>Select your day of visit </h2>
          <div className="calendar-select">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={visitDate}
                onChange={(newVisitDate) => setVisitDate(newVisitDate)}
                minDate={today}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>

      <div className="ticket-checkout-button-error">
        <div className="ticket-cart-buttons">
          <button className="ticket-cart-button" onClick={addToCart}>
            <AddShoppingCartIcon />
            <h3>Add to Cart</h3>
          </button>
          <button className="ticket-cart-button" onClick={handleCheckout}>
            <ShoppingCartIcon />
            <h3> Checkout</h3>
          </button>
        </div>
        {errorState && (
          <div className="ticket-error-message" style={{ color: "red" }}>
            *Please add a ticket and/or attraction!
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
