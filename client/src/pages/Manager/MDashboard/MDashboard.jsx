import React, { useState, useEffect, useRef } from 'react';
import MSidebar from '../../../components/MSidebar/MSidebar';
import { useOutletContext } from 'react-router-dom';
import { PDFExport } from "@progress/kendo-react-pdf";
import './MDashboard.css';

function MDashboard() {
    const { setShowNavbar, setShowFooter } = useOutletContext();
    setShowNavbar(false);
    setShowFooter(false);

    const [currentDateTime, setCurrentDateTime] = useState('');
    const [dashboardData, setDashboardData] = useState({
        ticketRevenue: 0,
        ticketTransactions: 0,
        standardTickets: 0,
        childTickets: 0,
        expressTickets: 0,
        restaurantRevenue: 0,
        restaurantTransactions: 0,
        standardRestaurantTransactions: 0,
        deluxeRestaurantTransactions: 0,
        specialRestaurantTransactions: 0,
        merchandiseRevenue: 0,
        merchandiseTransactions: 0,
        merchandiseExpenses: 0,
        maintenanceExpenses: 0,
        restaurantExpense: 0,
        activeMaintenanceRequests: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            setCurrentDateTime(formattedDateTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const currentDate = new Date();
            const startDate = currentDate.toISOString().split('T')[0];
            const endDate = startDate;

            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/dashboardData`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        startDate,
                        endDate,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setDashboardData({
                        ticketRevenue: data.TotalTicketRevenue,
                        ticketTransactions: data.TotalTicketTransactions,
                        standardTickets: data.TotalStandardTickets,
                        childTickets: data.TotalChildTickets,
                        expressTickets: data.TotalExpressTickets,
                        restaurantRevenue: data.TotalRestaurantRevenue,
                        restaurantTransactions: data.TotalRestaurantTransactions,
                        standardRestaurantTransactions: data.TotalStandardRestaurantTransactions,
                        deluxeRestaurantTransactions: data.TotalDeluxeRestaurantTransactions,
                        specialRestaurantTransactions: data.TotalSpecialRestaurantTransactions,
                        merchandiseRevenue: data.TotalMerchandiseRevenue,
                        merchandiseTransactions: data.TotalMerchandiseTransactions,
                        merchandiseExpenses: data.TotalMerchandiseExpenses,
                        maintenanceExpenses: data.TotalMaintenanceExpenses,
                        restaurantExpense: data.restaurantExpense,
                        activeMaintenanceRequests: data.TotalActiveMaintenanceRequests,
                    });
                    console.log({data})
                } else {
                    const errorData = await response.json();
                    console.error('Error retrieving dashboard data:', errorData.message);
                }
            } catch (error) {
                console.error('Error retrieving dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    const dashboardRef = useRef(null);
    const [fetchedData, setFetchedData] = useState(null);


    const exportToPDF = () => {
        if (dashboardRef.current) {
            dashboardRef.current.save();
        }
    };

    return (
        <>
            <MSidebar />
            <PDFExport
                paperSize="auto"
                fileName="dashboard.pdf"
                margin={{ top: "1cm", bottom: "1cm" }}
                ref={dashboardRef}
            >
                <div className="mdash-header">
                    <h1 className='h1dash-manager'>Manager Dashboard</h1>
                    <span className="current-date-time">Date: {currentDateTime}</span>
                </div>

                <div className='mdashboard-class'>
                    <div className='vertical-box'>
                        <h2>Tickets</h2>
                        <div className='box-content'>
                            <div className='value-container'>
                                <span className='big-value'>${dashboardData.ticketRevenue}</span>
                                <span className='small-text'>REVENUE</span>
                            </div>
                            <div className='value-container'>
                                <span className='big-value'>{dashboardData.ticketTransactions}</span>
                                <span className='small-text'>TRANSACTIONS</span>
                            </div>
                            <div className='small-value-container'>
                                <div className='small-value-item'>
                                    <span className='small-value'>{dashboardData.standardTickets}</span>
                                    <span className='small-text'>STANDARD</span>
                                </div>
                            </div>
                            <div className='small-value-container'>
                                <div className='small-value-item'>
                                    <span className='small-value'>{dashboardData.expressTickets}</span>
                                    <span className='small-text'>EXPRESS</span>
                                </div>
                            </div>
                            <div className='small-value-container'>
                                <div className='small-value-item'>
                                    <span className='small-value'>{dashboardData.childTickets}</span>
                                    <span className='small-text'>CHILD</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='vertical-box'>
                        <h2>Restaurant</h2>
                        <div className='box-content'>
                            <div className='value-container'>
                                <span className='big-value'>${dashboardData.restaurantRevenue}</span>
                                <span className='small-text'>REVENUE</span>
                            </div>
                            <div className='value-container'>
                                <span className='big-value'>${dashboardData.restaurantExpense}</span>
                                <span className='small-text'>EXPENSE</span>
                            </div>
                            <div className='value-container'>
                                <span className='big-value'>{dashboardData.restaurantTransactions}</span>
                                <span className='small-text'>TRANSACTIONS</span>
                            </div>
                            <div className='small-value-container'>
                                <div className='small-value-item'>
                                    <span className='small-value'>{dashboardData.standardRestaurantTransactions}</span>
                                    <span className='small-text'>STANDARD</span>
                                </div>
                            </div>
                            <div className='small-value-container'>
                                <div className='small-value-item'>
                                    <span className='small-value'>{dashboardData.deluxeRestaurantTransactions}</span>
                                    <span className='small-text'>DELUXE</span>
                                </div>
                            </div>
                            <div className='small-value-container'>
                                <div className='small-value-item'>
                                    <span className='small-value'>{dashboardData.specialRestaurantTransactions}</span>
                                    <span className='small-text'>SPECIAL</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='vertical-box'>
                        <h2>Maintenance</h2>
                        <div className='box-content'>
                            <div className='value-container'>
                                <span className='big-value'>${dashboardData.maintenanceExpenses}</span>
                                <span className='small-text'>EXPENSE</span>
                            </div>
                            <div className='value-container'>
                                <span className='big-value'>{dashboardData.activeMaintenanceRequests}</span>
                                <span className='small-text'>ACTIVE REQUESTS</span>
                            </div>
                        </div>
                    </div>

                    <div className='vertical-box'>
                        <h2>Shop</h2>
                        <div className='box-content'>
                            <div className='value-container'>
                                <span className='big-value'>${dashboardData.merchandiseRevenue}</span>
                                <span className='small-text'>REVENUE</span>
                            </div>
                            <div className='value-container'>
                                <span className='big-value'>${dashboardData.merchandiseExpenses}</span>
                                <span className='small-text'>EXPENSE</span>
                            </div>
                            <div className='value-container'>
                                <span className='big-value'>{dashboardData.merchandiseTransactions}</span>
                                <span className='small-text'>TRANSACTIONS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </PDFExport>
            <button onClick={exportToPDF} className='exportPdf-mdash-butt'>Export to PDF</button>
        </>
    )
}

export default MDashboard