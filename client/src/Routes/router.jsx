import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "./Layout";
import Errorpage from "../Pages/Errorpage";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <Layout />, 
        errorElement: <Errorpage />,
        children: [
            {
                path: '/', 
                element: <Home />
            }
        ]
    }
])

export default router