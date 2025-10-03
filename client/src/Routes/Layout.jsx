import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/User/Navbar'
import Footer from '../Components/User/Footer';

export default function Layout() {

    const location = useLocation();

    return (
        <>
            {/* {!['/login', '/signup'].includes(location.pathname) && <Navbar />} */}
            <div className='mb-[5rem] '>
                <Navbar />
            </div>
            <Outlet />
            <Footer />
        </>
    )
}
