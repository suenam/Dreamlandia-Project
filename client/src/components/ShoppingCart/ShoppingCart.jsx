import { createContext, useContext, useEffect, useState } from "react";
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
    
    const [mealTickets, setMealTickets] = useState({})

    const [attractions, setAttractions] = useState([]);

    const [date, setDate] = useState(dayjs());

    const [merch, setMerch] = useState({});

    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(()=> {
            let localCartCount = 0;
            if (Object.values(tickets).some((ticketCount)=>ticketCount > 0)) {
                localCartCount+=1;
            }
            if (Object.values(mealTickets).some((mealTicketCount)=>mealTicketCount > 0)) {
                localCartCount+=1;
            }
            Object.values(merch).forEach((merchItem)=>{
                if (merchItem.quantity > 0) {
                    localCartCount+=1;
                }
            })
            return localCartCount;
        }) 
    }, [tickets, mealTickets, merch]);

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

    const getMerch = () => {
        return merch;
    }

    const getCartCount = () => {
        return cartCount;
    }

    const resetTicketPage = () => {
        setTickets({
            standardTicket: 0, 
            expressTicket: 0, 
            childTicket: 0
        });

        setMealTickets({});
        
        setAttractions([]);
        setDate(dayjs());
    }

    const emptyShoppingCart = () => {
        resetTicketPage();
        setMerch({});
        setCartCount(0);
    }


    return (
        <ShoppingCartContext.Provider value={{
            setTickets, getTickets,
            setMealTickets, getMealTickets,
            setAttractions, getAttractions,
            setDate, getDate,
            setMerch, getMerch,
            getCartCount,
            resetTicketPage, 
            emptyShoppingCart,
            }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}