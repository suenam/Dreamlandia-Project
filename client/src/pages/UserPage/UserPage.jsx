import React, { useState } from 'react';
import UCard from '../../components/UCard/UCard';
import UserSidebar from '../../components/UserSidebar/UserSidebar';
import { useOutletContext } from 'react-router-dom';

const User = () => {
    // const UserData = {
    //   name: 'John Doe 1 ',
    //   title: 'Customer',
    //   email: 'johndoe@gmail.com',
    //   phone: '123-456-7899'
    // };

    return (
        <div>
          {/* <h1 className='employee-header-welcome'>Welcome</h1> */}
          <UserSidebar />
            <div className='ecard-emp-edit'>
            <UCard/>
            </div>


        </div>
      );
}
export default User;
