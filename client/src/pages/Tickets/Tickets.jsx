import "./Tickets.css";
import { useState, useEffect } from "react";
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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Tickets = () => {
  const shoppingCartContext = useShoppingCart();
  const navigate = useNavigate();

  const cartDate = shoppingCartContext.getDate();
  const [visitDate, setVisitDate] = useState(cartDate);
  const today = dayjs().startOf("day");
  const [loading, setLoading] = useState(true);

  const cartTickets = shoppingCartContext.getTickets();
  const [standardTicket, setStandardTicket] = useState(
    cartTickets.standardTicket
  );
  const [expressTicket, setExpressTicket] = useState(cartTickets.expressTicket);
  const [childTicket, setChildTicket] = useState(cartTickets.childTicket);

  const cartAttractions = shoppingCartContext.getAttractions();
  const [attractions, setAttractions] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState(cartAttractions);

  const [restaurants, setRestaurants] = useState([]);

  const cartFoodTickets = shoppingCartContext.getMealTickets();
  const [foodTickets, setFoodTickets] = useState({
    ...cartFoodTickets,
  });

  const [errorState, setErrorState] = useState(false);

  const fetchAttractions = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/attractions`
      );
      const { attractions } = await response.json();
      setAttractions(attractions);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/get-rest`
      );
      const { restaurants } = await response.json();
      setRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchAttractions();
    fetchRestaurants();
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  const updateMealTicket = (mealType, restaurantId, value) => {
    const mealKey = `${mealType}Meal${restaurantId}`;
    const nextValue = (foodTickets[mealKey]?.qty ?? 0) + value;

    if (nextValue < 0) {
      return;
    }

    setFoodTickets(prevFoodTickets => {
      if (nextValue === 0) {
        const { [mealKey]: _, ...rest } = prevFoodTickets;
        return rest;
      }

      return {
        ...prevFoodTickets,
        [mealKey]: {
          item: restaurants.find(restaurant => restaurant.id === restaurantId),
          qty: nextValue
        }
      }
    });
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

    console.log(foodTickets);
    
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
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              {attractions.map((attraction) => (
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
              ))}
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

                {restaurants.map((restaurant) => {
                  if (restaurant.type === "Standard") {
                    return (
                      <div key={restaurant.id} className="meal-option">
                        <img src={restaurant.image} />
                        <h3>{restaurant.name}</h3>
                        <span>{restaurant.description}</span>
                        <div className="remove-add-tickets">
                          <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={
                              (foodTickets[`standardMeal${restaurant.id}`]?.qty ?? 0) === 0
                                ? "none"
                                : ""
                            }
                            color={
                              (foodTickets[`standardMeal${restaurant.id}`]?.qty ?? 0) === 0
                                ? "action"
                                : ""
                            }
                            onClick={() =>
                              updateMealTicket("standard", restaurant.id, -1)
                            }
                          />
                          <div className="ticket-count">
                            {(foodTickets[`standardMeal${restaurant.id}`]?.qty ?? 0)}
                          </div>
                          <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() =>
                              updateMealTicket("standard", restaurant.id, 1)
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <div className="meal-options-col">
                <h4>Deluxe ($35/ea)</h4>
                <i>Fine dining in luxury</i>
                {restaurants.map((restaurant) => {
                  if (restaurant.type === "Deluxe") {
                    return (
                      <div key={restaurant.id} className="meal-option">
                        <img src={restaurant.image} />
                        <h3>{restaurant.name}</h3>
                        <span>{restaurant.description}</span>
                        <div className="remove-add-tickets">
                          <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={
                              (foodTickets[`deluxeMeal${restaurant.id}`]?.qty ?? 0) === 0
                                ? "none"
                                : ""
                            }
                            color={
                              (foodTickets[`deluxeMeal${restaurant.id}`]?.qty ?? 0) === 0
                                ? "action"
                                : ""
                            }
                            onClick={() =>
                              updateMealTicket("deluxe", restaurant.id, -1)
                            }
                          />
                          <div className="ticket-count">
                            {(foodTickets[`deluxeMeal${restaurant.id}`]?.qty ?? 0)}
                          </div>
                          <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() =>
                              updateMealTicket("deluxe", restaurant.id, 1)
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <div className="meal-options-col">
                <h4>Special ($45/ea)</h4>
                <i>Themed character restaurants</i>
                {restaurants.map((restaurant) => {
                  if (restaurant.type === "Special") {
                    return (
                      <div key={restaurant.id} className="meal-option">
                        <img src={restaurant.image} />
                        <h3>{restaurant.name}</h3>
                        <span>{restaurant.description}</span>
                        <div className="remove-add-tickets">
                          <RemoveCircleOutlineIcon
                            fontSize="large"
                            pointerEvents={
                              (foodTickets[`specialMeal${restaurant.id}`]?.qty ?? 0) === 0
                                ? "none"
                                : ""
                            }
                            color={
                              (foodTickets[`specialMeal${restaurant.id}`]?.qty ?? 0) === 0
                                ? "action"
                                : ""
                            }
                            onClick={() =>
                              updateMealTicket("special", restaurant.id, -1)
                            }
                          />
                          <div className="ticket-count">
                            {(foodTickets[`specialMeal${restaurant.id}`]?.qty ?? 0)}
                          </div>
                          <AddCircleOutlineIcon
                            fontSize="large"
                            onClick={() =>
                              updateMealTicket("special", restaurant.id, 1)
                            }
                          />
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
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
          {/* <button className="ticket-cart-button" onClick={handleCheckout}>
            <ShoppingCartIcon />
            <h3> Checkout</h3>
          </button> */}
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