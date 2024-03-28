/*
login function is ueed to login the user(customer)
logout function is used to logout the user and employee(logout will logout both user and employee)
It ensures that we are not logged in as both user and employee at the same time
employeeLogin function is used to login the employee

Open inpected in chrome and go to application tab and check the cookies, you will see the cookies for the user or employee
*/


import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`, { withCredentials: true });
              if (response.status === 200) {
                setUser(response.data);
              } else {
                setUser(null);
              }
            } catch (error) {
              setUser(null);
            }
          };
        const fetchEmployee = async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/employee`, { withCredentials: true });
              if (response.status === 200) {
                setEmployee(response.data);
              } else {
                setEmployee(null);
              }
            } catch (error) {
                setEmployee(null);
            }
          };

        fetchUser();
        fetchEmployee();
    }, []);

    const login = async (credentials) => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, credentials, { withCredentials: true });
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`, { withCredentials: true });
            console.log('(frontend)response:', response.data);
            setUser(response.data);
            setEmployee(null);
        } catch (error) {
          console.error('Error logging in:', error);
          // default error message
          let errorMessage = 'An unexpected error occurred. Please try again later.';

          //check if error is due to authentication failure
          if (error.response && error.response.status === 401) {
              errorMessage = 'Email or password is incorrect. Please try again.';
          }

          alert(errorMessage);
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
            setEmployee(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const employeeLogin = async (credentials) => {
        try {
          await axios.post(`${import.meta.env.VITE_SERVER_URL}/employee/login`, credentials, { withCredentials: true });
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/employee`, { withCredentials: true });
          console.log('(frontend)response:', response.data);
          setEmployee(response.data);
          setUser(null);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };

    return (
        <AuthContext.Provider value={{ user, employee, login, logout, employeeLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};