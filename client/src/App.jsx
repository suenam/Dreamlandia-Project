import ContactUs from './pages/ContactUs/ContactUs';
import './App.css';
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import React, { useState } from 'react';import Home from './pages/Home/Home'
import Employee from './pages/Employee/Employee'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
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
import Shop from './pages/Shop/Shop';
import Attractions from './pages/Attractions/Attractions';
import Tickets from './pages/Tickets/Tickets';
import Signup from './pages/auth/User/Signup/Signup';
import Login from './pages/auth/User/Login/Login';
import EmployeeLogin from './pages/auth/Employee/EmployeeLogin/EmployeeLogin';
import Checkout from './pages/Checkout/Checkout'
import { AuthProvider } from './pages/auth/auth';
import UserPage from './pages/UserPage/UserPage';
import RecentOrders from './pages/UserPage/RecentOrders/RecentOrders'

import { RequireUserAuth, RequireStaffAuth } from './pages/auth/requireAuth';
import { ShoppingCartProvider } from './components/ShoppingCart/ShoppingCart';

const Layout = () => {

  return (
    <>
      <div className='page-container'>
        <Navbar/>
        <div className='outlet-content'>
          <Outlet/>
        </div>
        <Footer />
      </div>
    </>
  );
}

const NoNavLayout = () => {
  return (
    <div className='page-container'>
        <div className='outlet-content'>
          <Outlet/>
        </div>
      </div>
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
        path: "/Shop",
        element: <Shop />
      },
      {
        path: "/contactUs",
        element: <RequireUserAuth><ContactUs /></RequireUserAuth>
      },
      {
        path: "/attractions",
        element: <Attractions />
      }

    ]
  },
  {
    element: <NoNavLayout />,
    children: [
      {
        path: "/employee",
        children: [
          {
            path: "/employee/profile",
            element: <RequireStaffAuth><Employee /></RequireStaffAuth>
          },
          {
            path: "/employee/login",
            element: <EmployeeLogin />
          },
          {
            path: "/employee/dashboard",
            element: <RequireStaffAuth><Dashboard /></RequireStaffAuth>
          },
          {
            path: "/employee/maintenance",
            element: <RequireStaffAuth><Maintenance /></RequireStaffAuth>
          },
          {
            path: "/employee/weather-form",
            element: <RequireStaffAuth><WeatherForm /></RequireStaffAuth>
          },
          {
            path: "/employee/HR",
            element: <RequireStaffAuth><HR /></RequireStaffAuth>
          },
        ]
      },
      {
        path: "/manager",
        children: [
          {
            path: "/manager/profile",
            element: <RequireStaffAuth><Manager /></RequireStaffAuth>
          },
          {
            path: "/manager/maintenance",
            element: <RequireStaffAuth><MMaintenance /></RequireStaffAuth>
          },
          {
            path: "/manager/HR",
            element: <RequireStaffAuth><MHR /></RequireStaffAuth>
          },
          {
            path: "/manager/manage-employees",
            element: <RequireStaffAuth><ManageEmp /></RequireStaffAuth>
          },
          {
            path: "/manager/expense-form",
            element: <RequireStaffAuth><ExpenseForm /></RequireStaffAuth>
          },
          {
            path: "/manager/data-reports",
            element: <RequireStaffAuth><DataReport /></RequireStaffAuth>
          },
          {
            path: "/manager/view-contact-forms",
            element: <RequireStaffAuth><ViewContact /></RequireStaffAuth>
          },
          {
            path: "/manager/dashboard",
            element: <RequireStaffAuth><MDashboard /></RequireStaffAuth>
          },
        ]
      },
      {
        path: "/user",
        children: [
          {
            path: "/user/recent-orders",
            element: <RecentOrders />
          },
          {
            path: "/user/profile",
            element: <UserPage />
          },
        ]
      },
    ]
  },
  
  {
    path: "*",
    element: <h1>Page Not Found</h1>
  },
  {
    path: "/checkout",
    element: <RequireUserAuth><Checkout /></RequireUserAuth>
  },
]);



function App() {

  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <RouterProvider router={router} />
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App
