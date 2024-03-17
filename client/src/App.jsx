import './App.css'
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar';
import Tickets from './pages/Tickets/Tickets';
import Signup from './pages/auth/User/Signup/Signup';
import Login from './pages/auth/User/Login/Login';
import EmployeeLogin from './pages/auth/Employee/EmployeeLogin/EmployeeLogin';
import { AuthProvider } from './pages/auth/auth';
import { RequireUserAuth } from './pages/auth/requireAuth';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
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
        element: <Home/>
      },
      {
        path: "/tickets",
        element: <RequireUserAuth><Tickets /></RequireUserAuth>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/auth/signup",
        element: <Signup />
      }
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
