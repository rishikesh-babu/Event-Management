import { BookmarkCheck, CalendarDays, Home, Info } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='py-4'>
            <div className='px-4 py-2 border-2 rounded-full flex justify-between items-center'>
                <div>
                    PlanIt
                    <img src="" alt="" />
                </div>

                <Link to={'/'} >
                    <Home className='hover:fill-black' />
                </Link>

                <Link to={'/event'}>
                    <CalendarDays />
                </Link>

                <Link to={'/myevent'}>
                    <BookmarkCheck />
                </Link>

                <button className='px-3 py-1 font-semibold border-2 border-info hover:bg-info hover:border-accent rounded-full transition-all duration-300'>
                    Login 
                </button>
            </div>
        </div>
    )
}
