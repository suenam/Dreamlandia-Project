import { useOutletContext } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Employee.css'
import ECard from '../../components/ECard/ECard';

const Employee = () => {
  const { setShowNavbar, setShowFooter } = useOutletContext();
  setShowNavbar(false);
    setShowFooter(false);
  const employeeData = {
    name: 'John Doe',
    title: 'Software Engineer',
    department: 'Engineering',
    email: 'johndoe@gmail.com',
    phone: '123-456-7899'
  };

  return (
    <div>
      <h1 className='employee-header-welcome'>Welcome!</h1>
      <Sidebar />
        <div className='ecard-emp-edit'>
        <ECard employeeData ={employeeData} />
        </div>

        
    </div>
  );
}

export default Employee;