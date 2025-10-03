import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/User/Home";
import Layout from "./Layout";
import Errorpage from "../Pages/Shared/Errorpage";
import Login from "../Pages/User/Login";
import Signup from "../Pages/User/Signup";
import AdminLayout from "./AdminLayout";
import AdminProtectLayout from "./AdminProtectLayout";

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
                path: 'login', 
                element: <Login />
            }, 
            {
                path: 'signup', 
                element: <Signup />
            }, 
            {
                path: 'event',
            }, 
            {
                path: 'event/:eventId', 
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
                element: <AdminProtectLayout />,  // after login
                children: [
                    {
                        path: '',
                    }, 
                    {
                        path: 'event',
                    }, 
                    {
                        path: 'event/:eventId',
                    }, 
                    {
                        path: 'create-event',
                    }, 
                ]
            }
        ]
    }
])

export default router