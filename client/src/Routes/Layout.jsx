import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/User/Navbar'
import Footer from '../Components/User/Footer';

export default function Layout() {

    const location = useLocation();

    return (
        <>
            <div className='mb-[5rem] '>
                <Navbar />
            </div>
            <div className='min-h-[80dvh]'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
