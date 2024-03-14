import React from 'react'
import Card from '../../../components/Card/ECard'
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useOutletContext } from 'react-router-dom';


function EProfile() {
    const { setShowNavbar } = useOutletContext();

    setShowNavbar(false);
    const employeeData = {
        name: 'John Doe',
        title: 'Software Engineer',
        department: 'Engineering',
    };
    return (
        <>
        <Sidebar />
        <div className='card-container'>
                
        </div>
        
        </>
    )
}

export default EProfile
