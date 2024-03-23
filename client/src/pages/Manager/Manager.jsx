import { useOutletContext } from 'react-router-dom';
import React, { useState } from 'react';
import MSidebar from '../../components/MSidebar/MSidebar';
import './Manager.css'
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
      <h1 className='manager-header-welcome'>Welcome {employeeData.name}!</h1>
      <MSidebar />
        <div className='ecard-manager-edit'>
        <ECard employeeData ={employeeData} />
        </div>

        
    </div>
  );
}

export default Employee;