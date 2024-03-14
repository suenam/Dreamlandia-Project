import React from 'react'
import Card from '../../../components/Card/Card'
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useOutletContext } from 'react-router-dom';

import './Dashboard.css';

function Dashboard() {
    const { setShowNavbar } = useOutletContext();
    const example = <li>a
    </li>
    setShowNavbar(false);
  return (
    <>
        <Sidebar />
        <h1 className='h1dash'>Employee Dashboard</h1>
        <div  className='hours-worked'>
            <Card value="8" text="HOURS WORKED ON 01/01/2024" color="orange" />
        </div>
        <div  className='dash-attraction-card'>
            <Card value="Superman" text="OPERATING ON 01/01/2024" color="crimson" />
        </div>
        <div  className='dash-announ-card'>
            <Card value={example} text="ANNOUCMENTS" color="grey"  textAlign="left" fs="12" />
        </div>
       
    </>
  )
}

export default Dashboard
