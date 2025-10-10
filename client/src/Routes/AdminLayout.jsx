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
        <div className="flex">
            {/* Sidebar */}
            <AdminSideBar openSideBar={openSideBar} toggleSideBar={toggleSideBar} />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-500 ${openSideBar ? 'ml-52' : 'ml-0'}`} >
                <AdminHeader toggleSideBar={toggleSideBar} />
                <div>
                    <Outlet />
                </div>
                <AdminFooter />
            </main>
        </div>
    )
}
