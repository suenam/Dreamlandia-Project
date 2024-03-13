import './App.css'
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
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
      // },
      // {
      //   path: "/signup",
      //   element: <Signup />
      // },
      // {
      //   path: "/login", 
      //   element: <Login/>
      // },
      // {
      //   path: "/signup",
      //   element: <Signup />
      // },
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
