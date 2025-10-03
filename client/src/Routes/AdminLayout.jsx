import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../Components/Admin/AdminHeader'
import AdminFooter from '../Components/Admin/AdminFooter'

export default function AdminLayout() {
    return (
        <div>
            <AdminHeader />
            <Outlet />
            <AdminFooter />
        </div>
    )
}