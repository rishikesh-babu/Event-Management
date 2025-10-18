import { BookmarkCheck, CalendarDays, Home, Info, LogIn } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const navContentStyle = 'text-gray-600 sm:hover:text-white hover:scale-105 transition-all duration-300'
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

    useEffect(() => {
        scrollToTop()
    }, [])

    function scrollToTop() {
        window.scroll(0, 0)
    }

    return (
        <div className='z-40 fixed top-0 right-0 left-0 py-4'>
            <div className='px-4 py-2 sm:py-4 max-w-5xl mx-auto backdrop-blur-[20px] border-2 rounded-full flex justify-between items-center'>
                <div onClick={scrollToTop} className='size-10 border rounded-full cursor-pointer'>
                    <img src="\logo.png" alt="PlanIt-Logo" />
                </div>

                {navContent.map((item, index) => (
                    <Link key={index} to={item.link} className='p-2 sm:hover:bg-gray-400 rounded-full transition-all duration-300 select-none' >
                        {item.icon}
                    </Link>
                ))}

                <Link to={'/login'} className='px-3 py-1 font-semibold text-gray-500 sm:hover:text-white border-2 border-gray-300 hover:bg-info hover:border-accent rounded-full transition-all duration-300'>
                    Login
                </Link>
            </div>
        </div>
    )
}
