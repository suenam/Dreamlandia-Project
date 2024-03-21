import React from 'react'
import Card from '../../../components/Card/Card'
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useOutletContext } from 'react-router-dom';
import  { useEffect } from 'react';
import MaintenanceReportCard from '../../../components/MaintenanceReportCard/MaintenanceReportCard';

import './Dashboard.css';

function Dashboard() {
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
        <h1 className='h1dash'>Employee Dashboard</h1>
        <div  className='hours-worked'>
            <Card value="8" text="HOURS WORKED ON 01/01/2024" color="lightblue" />
        </div>
        <div  className='dash-attraction-card'>
            <Card value="Superman" text="OPERATING ON 01/01/2024" color="orange" />
        </div>
        <div  className='active-mr-card'>
            <Card value="2" text="ACTIVE MAINTENANCE REQUESTS ON 01/01/2024" color="lightgrey"  textAlign="center" />
        </div>
        <div className='mr-report-card'>
            <MaintenanceReportCard maintenanceRequests={maintenanceRequests} />
        </div>
        
       
    </>
  )
}

export default Dashboard
