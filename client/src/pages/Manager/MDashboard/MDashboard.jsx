import React from 'react'
import Card from '../../../components/Card/Card'
import MSidebar from '../../../components/MSidebar/MSidebar';
import { useOutletContext } from 'react-router-dom';
import  { useEffect } from 'react';
import MaintenanceReportCard from '../../../components/MaintenanceReportCard/MaintenanceReportCard';

import './MDashboard.css';

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
        <MSidebar />
        <h1 className='h1dash-manager'>Manager Dashboard</h1>
        <div  className='hours-worked-manager'>
            <Card value="8" text="HOURS WORKED ON 01/01/2024" color="lightblue" />
        </div>
        <div  className='dash-attraction-card-manager'>
            <Card value="Superman" text="OPERATING ON 01/01/2024" color="orange" />
        </div>
        <div  className='active-mr-card-manager'>
            <Card value="2" text="ACTIVEa MAINTENANCE REQUESTS ON 01/01/2024" color="lightgrey"  textAlign="center" />
        </div>
        <div className='mr-report-card-manager'>
            <MaintenanceReportCard maintenanceRequests={maintenanceRequests} />
        </div>
        
       
    </>
  )
}

export default MDashboard
