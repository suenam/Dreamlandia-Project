import './App.css'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Home from './pages/Home/Home'

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/home", 
        element: <Home/>
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App
