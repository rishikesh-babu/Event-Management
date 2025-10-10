import { Menu } from 'lucide-react'
import React from 'react'

export default function AdminHeader() {
    return (
        <div className='p-4 flex justify-between items-center border'>
            <div>
                <Menu strokeWidth={3} size={25} />
            </div>
            
            <div className=' font-bold text-2xl'>
                Admin Dashboard
            </div>

            <div />
        </div>
    )
}
