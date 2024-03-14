import { useOutletContext } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Employee.css'
import ECard from '../../components/ECard/ECard';

const Employee = () => {
  const { setShowNavbar } = useOutletContext();

  setShowNavbar(false);

  const employeeData = {
    name: 'John Doe',
    title: 'Software Engineer',
    department: 'Engineering',
    email: 'johndoe@gmail.com',
    phone: '123-456-7899'
  };

  return (
    <div>
      <h1>Employee Page</h1>
      <Sidebar />
        <div className='card'>
            <ECard employeeData ={employeeData} />

        </div>
        
    </div>
  );
}

export default Employee;