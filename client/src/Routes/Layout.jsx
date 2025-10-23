import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/User/Navbar'
import Footer from '../Components/User/Footer';
import axiosInstance from '../Config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, saveUserData } from '../store/slice/userSlice';

export default function Layout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)

    useEffect(() => {
        checkUser()
        if (userData && userData?.role === 'admin') {
            console.log('userData :>> ', userData);
            navigate('/admin/event')
        }
    }, []) // Run once on mount

    function checkUser() {
        axiosInstance({
            method: 'GET',
            url: '/user/check'
        })
            .then((res) => {
                dispatch(saveUserData(res?.data?.data))
            })
            .catch((err) => {
                dispatch(clearUserData())
                // navigate('/login')
            })
    }

    return (
        <div className='min-h-[100dvh] flex flex-col justify-between'>
            <Navbar />
            <main className='mt-[6rem] min-h-[50vh]'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
