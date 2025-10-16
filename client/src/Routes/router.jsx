import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/User/Home";
import Layout from "./Layout";
import Errorpage from "../Pages/Shared/Errorpage";
import Login from "../Pages/User/Login";
import Signup from "../Pages/User/Signup";
import AdminLayout from "./AdminLayout";
import AdminProtectLayout from "./AdminProtectLayout";
import AdminHome from "../Pages/Admin/AdminHome";
import AdminEvent from "../Pages/Admin/AdminEvent";
import AdminEventDetails from "../Pages/Admin/AdminEventDetails";
import AdminCreateEvent from "../Pages/Admin/AdminCreateEvent";
import Event from "../Pages/User/Event";
import EventDetails from "../Pages/User/EventDetails";
import About from "../Pages/User/About";
import AdminCollage from "../Pages/Admin/AdminCollage";
import AdminUser from "../Pages/Admin/AdminUser";
import Profile from "../Pages/User/Profile";

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
                path: 'about',
                element: <About />
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
                element: <Event />
            }, 
            {
                path: 'event/:id',
                element: <EventDetails />
            }, 
            {
                path: 'profile', 
                element: <Profile />
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
                        element: <AdminHome />
                    }, 
                    {
                        path: 'event',
                        element: <AdminEvent />
                    }, 
                    {
                        path: 'event/:id',
                        element: <AdminEventDetails />
                    }, 
                    {
                        path: 'create-event',
                        element: <AdminCreateEvent />
                    },
                    {
                        path:'collage', 
                        element: <AdminCollage />
                    }, 
                    {
                        path: 'user', 
                        element: <AdminUser />
                    }
                ]
            }
        ]
    }
])

export default router