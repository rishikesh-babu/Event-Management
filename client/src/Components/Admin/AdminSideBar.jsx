import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, CalendarDays, PlusCircle, Building2, Users } from 'lucide-react'

export default function AdminSideBar() {

    const location = useLocation()

    const content = [
        {
            name: 'Home',
            link: '/admin',
            icon: <Home size={20} />
        },
        {
            name: 'Events',
            link: '/admin/event',
            icon: <CalendarDays size={20} />
        },
        {
            name: 'Create Event',
            link: '/admin/create-event',
            icon: <PlusCircle size={20} />
        },
        {
            name: 'Collages',
            link: '/admin/collage',
            icon: <Building2 size={20} />
        },
        {
            name: 'Create Collage',
            link: '/admin/create-collage',
            icon: <PlusCircle size={20} />
        },
        {
            name: 'Users',
            link: '/admin/user',
            icon: <Users size={20} />
        }
    ]

    return (
        <div className='p-4 h-[100dvh] border-r bg-white flex flex-col gap-4'>
            <div className='font-bold text-2xl mb-4'>
                Dashboard
            </div>

            <div className='flex flex-col gap-2'>
                {content.map((item, index) => (
                    <Link
                        to={item.link}
                        key={index}
                        className={`p-2 flex items-center gap-3 rounded-lg hover:bg-gray-100 transition-colors ${location.pathname === item.link ? 'bg-gray-200 font-semibold' : ''}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
