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
import WeatherForm from './pages/Employee/WeatherForm/WeatherForm';
import ExpenseForm from  './pages/Manager/ExpenseForm/ExpenseForm';
import ViewContact from  './pages/Manager/ViewContact/ViewContact';

import Tickets from './pages/Tickets/Tickets';
import Signup from './pages/auth/User/Signup/Signup';
import Login from './pages/auth/User/Login/Login';
import EmployeeLogin from './pages/auth/Employee/EmployeeLogin/EmployeeLogin';
import { AuthProvider } from './pages/auth/auth';
import { RequireUserAuth } from './pages/auth/requireAuth';
//my addition
import Profile from './pages/Profile/Profile';
import PastOrders from './pages/PastOrders/PastOrders';
// import PersonalInformation from './pages/PersonalInformation/PersonalInformation'; // Import the PersonalInformation component


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
        path: "/ExpenseForm",
        element: <ExpenseForm />
      },
      {
        path: "/tickets",
        // element: <Tickets />
        element: <RequireUserAuth><Tickets /></RequireUserAuth>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/auth/signup",
        element: <Signup />
      },
      // {
      //   path: "/Profile",
      //   element: <Profile />
      // },
      // {
      //   path: "/PastOrders",
      //   element: <PastOrders />
      // }
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
    path: "/PastOrders",
    element: <PastOrders />
  },
  {
    path: "/Profile",
    element: <Profile />
  },
  // {
  //   path: "/personal-information",
  //   element: <PersonalInformation /> // Render the PersonalInformation component
  // },
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
