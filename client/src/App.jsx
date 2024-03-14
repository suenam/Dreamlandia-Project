import './App.css'
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import React, { useState } from 'react';import Home from './pages/Home/Home'
import Employee from './pages/Employee/Employee'
import Navbar from './components/Navbar/Navbar';
import EProfile from './pages/Employee/EProfile/EProfile';
import Dashboard from './pages/Employee/Dashboard/Dashboard';

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet context={{ showNavbar, setShowNavbar }} />
    </>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", 
        element: <Home />
      },
      {
        path: "/Employee",
        element: <Employee />
      },
      {
        path: "/EProfile",
        element: <EProfile />
      },
      {
      path: "/Dashboard",
      element: <Dashboard />
      },
      // {
      //   path: "/tickets",
      //   element: <Tickets />
      // },
      // {
      //   path: "/attractions",
      //   element: <Attractions />
      // },
      // {
      //   path: "/shop",
      //   element: <Shop />
      // }
    ]
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App
