import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../store/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NotificationBar from '../contexts/NotificationContext'
export default function Navbar() {
    const dispatch = useDispatch()
    const [active, setActive] = useState(location.pathname)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        setActive(location.pathname)
    }, [location.pathname])
    const [notification, setNotification] = useState({ message: "", type: "" })

    const showNotification = (msg, type) => {
        setNotification({ message: '' })
        setTimeout(() => setNotification({ message: msg, type }), 10)
    }

    const getClass = (path) => {
        return path === active
            ? 'text-blue-700 font-bold ring ring-blue-700 rounded-2xl p-2'
            : 'text-red-400 hover:text-blue-600'
    }

    const handleLogout = () => {
        dispatch(logout())
        showNotification("Logged Out successfully!", "success")
    }
    return (
        <header className='fixed top-0 left-0 grid sm:grid-cols-[20%_80%] md:grid-cols-2 lg:grid-cols-2 gap-5 w-full h-20 shadow-md bg-white' >
            <NotificationBar message={notification.message} type={notification.type} />

            <div className='h-full flex items-center'>
            </div>
            <div className=' h-full text-center flex justify-around items-center'>
                <Link className={getClass('/')} children="Home" to="/" />
                <Link className={getClass('/about')} children="About" to="/about" />
                {user.isAdmin && (
                    <Link className={getClass('/admin')} children="Admin" to="/Admin" />
                )}
                {user.isLoggedIn
                    ? <button onClick={handleLogout} className=" text-red-500 px-4 py-2  hover:bg-red-600 hover:text-white ring ring-red-500 rounded-2xl">Logout</button>
                    : <Link to="/login" className=" text-blue-500 px-4 py-2  hover:bg-blue-600 hover:text-white ring ring-blue-500 rounded-2xl">Login</Link>
                }
            </div>
        </header>
    )
}
