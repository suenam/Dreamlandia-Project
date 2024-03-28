import RollerCoaster from '../assets/roller_coaster.jpg'
import Burger from '../assets/whataburger.jpg';
import Steak from '../assets/steak_restaurant.jpg';
import MyMelody from '../assets/themed_restaurant.jpg';
import SilverSpoon from '../assets/silverspoonfood.png';
import WhiteCastle from '../assets/whitecastle.jpg';
import BellaFood from '../assets/bellasfood.jpg';

export const ticketDetails = {
    "standardTicket": {
        image: RollerCoaster,
        name: "Standard Ticket",
        price: 65,
    },
    "expressTicket": {
        image: RollerCoaster,
        name: "Express Ticket",
        price: 90,
    },
    "childTicket": {
        image: RollerCoaster,
        name: "Child Ticket",
        price: 45,
    }
}

export const mealTickets = {
    standardMeal1: {
        image: Burger,
        name: "WhataSandwich",
        price: 10,
        type: "Standard Meal Voucher",
    },
    standardMeal2: {
        image: WhiteCastle,
        name: "Burger Castle",
        price: 10,
        type: "Standard Meal Voucher",
    },
    deluxeMeal1: {
        image: Steak,
        name: "The Velvet Vineyard",
        price: 35,
        type: "Deluxe Meal Voucher",
    },
    deluxeMeal2: {
        image: SilverSpoon,
        name: "Silver Spoon Serenade",
        price: 35,
        type: "Deluxe Meal Voucher",
    },
    specialMeal1: {
        image: MyMelody,
        name: "HerHarmony Eatery",
        price: 45,
        type: "Special Meal Voucher",
    },
    specialMeal2: {
        image: BellaFood,
        name: "Bella's Fairy Tale Feast",
        price: 45,
        type: "Special Meal Voucher",
    },
};