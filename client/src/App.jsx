import ContactUs from './pages/ContactUs/ContactUs';
import './App.css';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import React, { useState } from 'react';import Home from './pages/Home/Home'
import Employee from './pages/Employee/Employee'
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Employee/Dashboard/Dashboard';
import Maintenance from './pages/Employee/Maintenance/Maintenance';
import HR from './pages/Employee/HR/HR';
import Manager from './pages/Manager/Manager';
import MDashboard from './pages/Manager/MDashboard/MDashboard';
import MMaintenance from  './pages/Manager/MMaintenance/MMaintenance';
import MHR from './pages/Manager/MHR/MHR';
import DataReport from './pages/Manager/DataReport/DataReport';
import ManageEmp from './pages/Manager/ManageEmp/ManageEmp';
import Tickets from './pages/Tickets/Tickets';
import Signup from './pages/auth/User/Signup/Signup';
import Login from './pages/auth/User/Login/Login';
import EmployeeLogin from './pages/auth/Employee/EmployeeLogin/EmployeeLogin';
import Shop from './pages/Shop/Shop';
import { AuthProvider } from './pages/auth/auth';
import { RequireUserAuth } from './pages/auth/requireAuth';

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <>
    <div className='page-container'>
      {showNavbar && <Navbar />}
      <div className='outlet-content'>
        <Outlet context={{ showNavbar, setShowNavbar }} />
      </div>
    </div>
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
      path: "/Dashboard",
      element: <Dashboard />
      },
      {
        path: "/MDashboard",
        element: <MDashboard />
      },
      {
        path: "/Maintenance",
        element: <Maintenance />
      },
      {
        path: "/MMaintenance",
        element: <MMaintenance />
      },
      {
        path: "/MHR",
        element: <MHR />
      },
      {
        path: "/HR",
        element: <HR />
      },
      {
        path: "/Manager",
        element: <Manager />
      },
      {
        path: "/DataReport",
        element: <DataReport />
      },
      {
        path: "/ManageEmp",
        element: <ManageEmp />
      },
      {
        path: "/tickets",
        element: <Tickets />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/auth/signup",
        element: <Signup />
      },
      {
        path: "/contactUs", // Define route for Contact Us page
        element: <ContactUs />
      },
      // {
      //   path: "/attractions",
      //   element: <Attractions />
      // },
      {
        path: "/Shop",
        element: <Shop />
      }
    ]
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>
  },
  {
    path: "/employee/login",
    element: <EmployeeLogin />
  }
]);

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
