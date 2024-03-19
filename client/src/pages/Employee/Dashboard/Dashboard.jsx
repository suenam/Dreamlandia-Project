import React, { useState } from 'react'
import Card from '../../../components/Card/Card'
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useOutletContext } from 'react-router-dom';
import './Dashboard.css';

function MDashboard() {
    const { setShowNavbar } = useOutletContext();
    setShowNavbar(false);
    const maintenanceRequests = [
        { id: 1, attraction: 'attraction1', status: 'Open', comment: 'Initial request' },
        { id: 2, attraction: 'attraction2', status: 'In Progress', comment: 'Working on it' },
        { id: 3, attraction: 'attraction3', status: 'Completed', comment: 'All done' },
    ];

   

    return (
        <>
            <Sidebar />
            <h1 className='h1dash-manager'>Manager Dashboard</h1>
            <div className='mdashboard-class'>
            <div  className='tickets-total-live'>
                <Card value="1213" text="TOTAL TICKETS SOLD" color="lightblue" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$12,821" text="REVENUE: TICKETS" color="orange" size="225px" fontsize={14} vFontsize={28}/>
            </div>
            <div  className='standard-ticket-live'>
                <Card value="563" text="STANDARD" color="lightgrey"  size="100px" fontsize={13} vFontsize={23} borderRadius="50%"/>
            </div>
            <div  className='express-ticket-live'>
                <Card value="462" text="EXPRESS" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23} borderRadius="50%"/>
            </div>
            <div  className='child-ticket-live'>
                <Card value="252" text="CHILD" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23}borderRadius="50%" />
            </div>

            <div  className='tickets-total-live'>
                <Card value="102" text="TOTAL MEAL PLANS" color="lightblue" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$3,471" text="REVENUE: DINING" color="orange" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='standard-ticket-live'>
                <Card value="23" text="STANDARD" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23} borderRadius="50%"/>
            </div>
            <div  className='express-ticket-live'>
                <Card value="25" text="DELUXE" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23} borderRadius="50%"/>
            </div>
            <div  className='child-ticket-live'>
                <Card value="32" text="SPECIAL" color="lightgrey"  size="100px"  fontsize={13} vFontsize={23}borderRadius="50%" />
            </div>

            <div  className='tickets-total-live'>
                <Card value="125" text="TOTAL TRANSACTIONS" color="lightblue" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='rev-tickets-live'>
                <Card value="$4,672" text="REVENUE: SHOP" color="orange" size="225px"fontsize={14} vFontsize={28}/>
            </div>

            <div  className='active-req-main'>
                <Card value="12" text="ACTIVE REQUESTS" color="lightblue" size="225px"fontsize={14} vFontsize={28}/>
            </div>
            <div  className='expense-main-card'>
                <Card value="$1,421" text="EXPENSE: MAINTENANCE" color="orange" size="225px"fontsize={14} vFontsize={28}/>
            </div>

            
            </div>
        </>
    )
}

export default MDashboard