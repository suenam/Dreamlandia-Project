import React, { useState, useRef } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { PDFExport } from "@progress/kendo-react-pdf";

import './Dashboard.css';


function MDashboard() {
    
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            setCurrentDateTime(formattedDateTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const dashboardRef = useRef(null);

    const exportToPDF = () => {
        if (dashboardRef.current) {
            dashboardRef.current.save();
        }
    };

    return (
        <>
            <Sidebar />
            <PDFExport
                paperSize="auto"
                fileName="dashboard.pdf"
                margin={{ top: "1cm", bottom: "1cm" }}
                ref={dashboardRef}
            >
            <div className="mdash-header">
                <h1 className='h1dash-manager'>Employee Dashboard</h1>
                <span className="current-date-time">Date: {currentDateTime}</span>
                
            </div>

            
                <div className='mdashboard-class'>
            <div className='vertical-box'>
                    <h2>Tickets</h2>
                    <div className='box-content'>
                        <div className='value-container'>
                            <span className='big-value'>$12,821</span>
                            <span className='small-text'>REVENUE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>1213</span>
                            <span className='small-text'>TRANSACTIONS</span>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>563</span>
                                <span className='small-text'>STANDARD</span>
                            </div>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>462</span>
                                <span className='small-text'>EXPRESS</span>
                            </div>
                        </div>
                        <div className='small-value-container'>

                            <div className='small-value-item'>
                                <span className='small-value'>252</span>
                                <span className='small-text'>CHILD</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='vertical-box'>
                    <h2>Restaurant</h2>
                    <div className='box-content'>
                        <div className='value-container'>
                            <span className='big-value'>$3,471</span>
                            <span className='small-text'>REVENUE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>$1,239</span>
                            <span className='small-text'>EXPENSE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>102</span>
                            <span className='small-text'>TRANSACTIONS</span>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>23</span>
                                <span className='small-text'>STANDARD</span>
                            </div>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>25</span>
                                <span className='small-text'>DELUXE</span>
                            </div>
                        </div>
                        <div className='small-value-container'>
                            <div className='small-value-item'>
                                <span className='small-value'>32</span>
                                <span className='small-text'>SPECIAL</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='vertical-box'>
                    <h2>Maintenance Requests</h2>
                    <div className='box-content'>
                        <div className='value-container'>
                            <span className='big-value'>$3,471</span>
                            <span className='small-text'>EXPENSE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>12</span>
                            <span className='small-text'>ACTIVE REQUESTS</span>
                        </div>
                    </div>
                </div>

                <div className='vertical-box'>
                    <h2>Shop</h2>
                    <div className='box-content'>
                        <div className='value-container'>
                            <span className='big-value'>$9,136</span>
                            <span className='small-text'>REVENUE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>$4,672</span>
                            <span className='small-text'>EXPENSE</span>
                        </div>
                        <div className='value-container'>
                            <span className='big-value'>292</span>
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