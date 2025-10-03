import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/User/Home";
import Layout from "./Layout";
import Errorpage from "../Pages/Shared/Errorpage";
import Login from "../Pages/User/Login";
import Signup from "../Pages/User/Signup";
import AdminLayout from "./AdminLayout";

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
        element: <AdminLayout />, 
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