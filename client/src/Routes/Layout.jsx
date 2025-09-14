import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export default function Layout() {

    const location = useLocation();

    return (
        <>
            {!['/login', '/signup'].includes(location.pathname) && <Navbar />}
            <Outlet />
            {/* <div>Footer</div> */}
        </>
    )
}
