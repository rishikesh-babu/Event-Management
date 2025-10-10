import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../Components/Admin/AdminHeader'
import AdminFooter from '../Components/Admin/AdminFooter'
import AdminSideBar from '../Components/Admin/AdminSideBar'

export default function AdminLayout() {
    const [openSideBar, setOpenSideBar] = useState(true)

    function toggleSideBar() {
        setOpenSideBar(!openSideBar)
    }

    return (
        <div className=' flex'>
            <AdminSideBar openSideBar={openSideBar} />

            <div className='flex-1'>
                <AdminHeader toggleSideBar={toggleSideBar} />
                <Outlet />
                <AdminFooter />
            </div>
        </div>
    )
}