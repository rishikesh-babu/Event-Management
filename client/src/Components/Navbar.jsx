import { useState, useEffect } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const [active, setActive] = useState(location.pathname)

    useEffect(() => {
        setActive(location.pathname)
    }, [location.pathname])

    const getClass = (path) => {
        return path === active
            ? 'text-blue-700 font-bold ring ring-blue-700 rounded-2xl p-2'
            : 'text-red-400 hover:text-blue-600'
    }
    return (
        <header className='fixed top-0 left-0 grid sm:grid-cols-[20%_80%] md:grid-cols-2 lg:grid-cols-2 gap-5 w-full h-20 shadow-md bg-white' >
            <div className='h-full flex items-center'>
            </div>
            <div className=' h-full text-center flex justify-around items-center'>
                <Link className={getClass('/')} children="Home" to="/" />
                <Link className={getClass('/about')} children="1" to="" />
                <Link className={getClass('/users')} children="2" to="" />
            </div>
        </header>
    )
}
