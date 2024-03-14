import './App.css'
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar';
import Tickets from './pages/Tickets/Tickets';

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
        element: <Tickets />
      },
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
