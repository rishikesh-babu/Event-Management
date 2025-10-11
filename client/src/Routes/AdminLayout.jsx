import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../Components/Admin/AdminHeader'
import AdminFooter from '../Components/Admin/AdminFooter'
import AdminSideBar from '../Components/Admin/AdminSideBar'

export default function AdminLayout() {
    const [openSideBar, setOpenSideBar] = useState(false)

    function toggleSideBar() {
        setOpenSideBar(!openSideBar)
    }

    return (
        <div className={`flex`}>
            {/* Sidebar */}
            <AdminSideBar openSideBar={openSideBar} toggleSideBar={toggleSideBar} />

            {/* Main Content */}
            <main className={`z-20 min-h-[100dvh] flex-1 transition-all duration-500 `} >
                <AdminHeader toggleSideBar={toggleSideBar} />
                <div>
                    <Outlet />
                </div>
                <AdminFooter />
            </main>
        </div>
    )
}
