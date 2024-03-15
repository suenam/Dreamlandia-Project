import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';


   
function HR() {
    const { setShowNavbar } = useOutletContext();
    setShowNavbar(false);
  return (
    <>
      <Sidebar />
    </>
  )
}

export default HR
