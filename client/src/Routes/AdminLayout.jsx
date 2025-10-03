import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <div>
            <div>Navbar</div>
            <Outlet />
            <div>Footer</div>
        </div>
    )
}
