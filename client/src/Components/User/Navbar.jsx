import { BookmarkCheck, CalendarDays, Home, Info, LogIn } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const navContentStyle = 'text-gray-600 hover:scale-105 transition-all duration-300'
    const navContent = [
        {
            link: '/',
            icon: <Home className={navContentStyle} />
        },
        {
            link: '/event',
            icon: <CalendarDays className={navContentStyle} />
        },
        {
            link: '/myevent',
            icon: <BookmarkCheck className={navContentStyle} />
        }
    ]

    return (
        <div className='z-40 fixed top-0 right-0 left-0 py-4'>
            <div className='px-4 py-2 sm:py-4 max-w-6xl mx-auto  backdrop-blur-[20px] border-2 rounded-full flex justify-between items-center'>
                <div className='size-10 border rounded-full'>
                    <img src="/logo.jpg" alt="PlanIt" />
                </div>

                {navContent.map((item, index) => (
                    <Link to={item.link} >
                        {item.icon}
                    </Link>
                ))}

                <Link to={'/login'} className='px-3 py-1 font-semibold border-2 border-info hover:bg-info hover:border-accent rounded-full transition-all duration-300'>
                    Login
                </Link>
            </div>
        </div>
    )
}
