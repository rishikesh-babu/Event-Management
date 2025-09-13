import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "./Layout";
import Errorpage from "../Pages/Errorpage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <Layout />, 
        errorElement: <Errorpage />,
        children: [
            {
                path: '/', 
                element: <Home />
            }, 
            {
                path: '/login', 
                element: <Login />
            }, 
            {
                path: '/signup', 
                element: <Signup />
            }
        ]
    }, 
    {
        path: 'admin', 
        element: <div>Admin layout</div>, 
        errorElement: <Errorpage />, 
        children: [
            {
                path: 'login',
            }, 
            {
                path: '', 
                element: <h1>Admin protect layout</h1>,  // after login
                children: []
            }
        ]
    }
])

export default router