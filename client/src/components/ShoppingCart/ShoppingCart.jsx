import { createContext, useContext, useState } from "react";
import dayjs from 'dayjs';

const ShoppingCartContext = createContext({});

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
}

export const ShoppingCartProvider = ({ children }) => {

    const [tickets, setTickets] = useState({
        standardTicket: 0, 
        expressTicket: 0, 
        childTicket: 0
    })
    
    const [mealTickets, setMealTickets] = useState({
        standardMeal1: 0,
        standardMeal2: 0,
        deluxeMeal1: 0,
        deluxeMeal2: 0,
        specialMeal1: 0,
        specialMeal2: 0
    })

    const [attractions, setAttractions] = useState([]);

    const [date, setDate] = useState(dayjs());

    const getTickets = () => {
        return tickets;
    }

    const getMealTickets = () => {
        return mealTickets;
    }

    const getAttractions = () => {
        return attractions;
    }

    const getDate = () => {
        return date;
    }

    const resetTicketPage = () => {
        setTickets({
            standardTicket: 0, 
            expressTicket: 0, 
            childTicket: 0
        });

        setMealTickets({
            standardMeal1: 0,
            standardMeal2: 0,
            deluxeMeal1: 0,
            deluxeMeal2: 0,
            specialMeal1: 0,
            specialMeal2: 0
        });
        
        setAttractions([]);
        setDate(dayjs());
    }


    return (
        <ShoppingCartContext.Provider value={{
            setTickets, getTickets,
            setMealTickets, getMealTickets,
            setAttractions, getAttractions,
            setDate, getDate,
            resetTicketPage
            }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
