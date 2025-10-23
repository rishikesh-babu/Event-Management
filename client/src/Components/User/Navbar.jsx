import { BookmarkCheck, CalendarDays, Home, Info, LogIn } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../Config/axiosInstance'
import { toast } from 'react-toastify'
import { clearUserData } from '../../store/slice/userSlice'

export default function Navbar() {
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)
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
            link: '/user/myevent',
            icon: <BookmarkCheck className={navContentStyle} />
        }
    ]

    useEffect(() => {
        scrollToTop()
    }, [])

    function scrollToTop() {
        window.scroll(0, 0)
    }

    function logout() {
        toast.promise(
            axiosInstance({
                url: '/user/logout',
                method: 'POST'
            })
                .then((res) => {
                    toast.success(res?.data?.message)
                    dispatch(clearUserData())
                    navigate('/login')
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                }),
            {
                pending: 'Logout'
            }
        )
    }

    return (
        <div className='fixed top-0 left-0 right-0 z-50 py-3 sm:py-4'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center backdrop-blur-[5px] bg-gray-400/50 cborder border-gray-200 rounded-full shadow-xl transition-all duration-300'>
                <div
                    onClick={scrollToTop}
                    className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 bg-gray-100 shadow-sm'
                >
                    <img src="/logo.png" alt="PlanIt-Logo" className='w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full' />
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

                {userData === null ? (
                    <Link
                        to={'/login'}
                        className='px-3 sm:px-4 py-1 sm:py-2 font-semibold rounded-full bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 shadow-sm text-sm sm:text-base'
                    >
                        Login
                    </Link>
                ) : (
                    <div className='relative'>
                        <button className=" btn btn-ghost btn-circle avatar">
                            <img
                                onClick={() => setOpenMenu(!openMenu)}
                                className='w-10 rounded-full'
                                alt="Tailwind CSS Navbar component"
                                src="\Profile.jpg" />
                        </button>

                        {openMenu && (
                            <div onClick={() => setOpenMenu(!openMenu)} className="absolute right-0 top-[3.3rem] p-2 min-w-[8rem] bg-gray-100/80 rounded-2xl shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] flex flex-col">
                                <Link to={'/user/profile'} className="block px-4 py-2 text-center rounded-xl transition">
                                    Profile 
                                </Link>
                                {/* <button className="px-4 py-2 rounded-xl transition">
                                    Theme
                                </button> */}
                                <button onClick={logout} className="px-4 py-2 font-semibold text-red-500 rounded-xl">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

    )
}
