import { BookmarkCheck, CalendarDays, Home, Info } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const navContent = [
        {
            link: '/',
            icon: <Home />
        }, 
        {
            link: '/event', 
            icon: <CalendarDays />
        }, 
        {
            link: '/myevent', 
            icon: <BookmarkCheck />
        }
    ]
    
    return (
        <div className='py-4'>
            <div className='px-4 py-2 bg-gray-100 border-2 rounded-full flex justify-between items-center'>
                <div className='size-10 border rounded-full'>
                    <img src="/logo.jpg" alt="PlanIt" />
                </div>

                {navContent.map((item, index) => (
                    <Link to={item.link} >
                        {item.icon}
                    </Link>
                ))}

                <button className='px-3 py-1 font-semibold border-2 border-info hover:bg-info hover:border-accent rounded-full transition-all duration-300'>
                    Login 
                </button>
            </div>
        </div>
    )
}
