import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../Components/Admin/AdminHeader'
import AdminFooter from '../Components/Admin/AdminFooter'
import AdminSideBar from '../Components/Admin/AdminSideBar'

export default function AdminLayout() {
    return (
        <div className=' flex'>
            <AdminSideBar />
            <div className='flex-1'>
                <AdminHeader />
                <Outlet />
                <AdminFooter />
            </div>
        </div>
    )
}