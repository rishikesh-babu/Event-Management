import { Menu } from 'lucide-react'
import React from 'react'

export default function AdminHeader({ toggleSideBar }) {
    return (
        <div className='z-40 p-4 flex justify-between items-center border'>
            <div onClick={toggleSideBar} className='p-2 cursor-pointer border rounded shadow hover:scale-105'>
                <Menu strokeWidth={3} size={25} />
            </div>

            <div className=' font-bold text-2xl'>
                Admin Dashboard
            </div>

            <div />
        </div>
    )
}
