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
  const [loading, setLoading] = useState(false);

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

    Promise.all([fetchUser(), fetchEmployee()])
      .then(() => {
        setLoading(false);
        // console.log('user and employee fetched in auth.jsx promise:', user, employee);
      })
      .catch((error) => {
        console.error('Error fetching data in auth.jsx promise:', error);
        setLoading(false);
      });

  }, []);

  useEffect(() => {
    console.log('User state changed:', user);
    console.log('Employee state:', employee);
  }, [user]);

  useEffect(() => {
    console.log('User state changed:', user);
    console.log('Employee state:', employee);
  }, [employee]);

  const login = async (credentials) => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, credentials, { withCredentials: true });
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`, { withCredentials: true });
      console.log('(frontend)response:', response.data);
      setUser(response.data);
      setEmployee(null);
      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      // default error message
      let errorMessage = 'An unexpected error occurred. Please try again later.';

      //check if error is due to authentication failure
      if (error.response && error.response.status === 401) {
        errorMessage = 'Email or password is incorrect. Please try again.';
      }

      throw new Error(errorMessage);
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
      return true; // return true if login is successful
    } catch (error) {
      // default error message
      let errorMessage = 'An unexpected error occurred. Please try again later.';

      //check if error is due to authentication failure
      if (error.response && error.response.status === 401) {
        errorMessage = 'Email or password is incorrect. Please try again.';
      }

      throw new Error(errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ user, employee, login, logout, employeeLogin, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};