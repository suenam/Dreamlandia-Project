import React, { useState } from 'react';
import UCard from '../../../components/UCard/UCard';
import UserSidebar from '../../../components/UserSidebar/UserSidebar';
import { useOutletContext } from 'react-router-dom';

const User = () => {
    const { setShowNavbar, setShowFooter } = useOutletContext();
    setShowNavbar(false);
      setShowFooter(false);
    const UserData = {
      name: 'John Doe',
      title: 'Customer',
      email: 'johndoe@gmail.com',
      phone: '123-456-7899'
    };

    return (
        <div>
          <h1 className='employee-header-welcome'>Welcome {UserData.name}!</h1>
          <UserSidebar />
            <div className='ecard-emp-edit'>
            <UCard employeeData ={UserData} />
            </div>
    
            
        </div>
      );
}
export default User;
