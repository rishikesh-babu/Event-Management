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
        <div className='fixed top-0 left-0 right-0 z-50 py-3 sm:py-4'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center backdrop-blur-md bg-white/50 border border-gray-200 rounded-full shadow-md transition-all duration-300'>
                <div
                    onClick={scrollToTop}
                    className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 bg-gray-100 shadow-sm'
                >
                    <img src="\logo.png" alt="PlanIt-Logo" className='w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full' />
                </div>

                {/* Navigation Icons */}
                <div className='flex gap-2 sm:gap-4'>
                    {navContent.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 shadow-sm'
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>

                {/* Login Button */}
                <Link
                    to={'/login'}
                    className='px-3 sm:px-4 py-1 sm:py-2 font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 shadow-sm text-sm sm:text-base'
                >
                    Login
                </Link>

            </div>
        </div>

    )
}
