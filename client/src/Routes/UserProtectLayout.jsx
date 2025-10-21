import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import axiosInstance from '../Config/axiosInstance'
import { clearUserData, saveUserData } from '../store/slice/userSlice'
import { toast } from 'react-toastify'

export default function UserProtectLayout() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        checkUser()
    }, [])

    useEffect(() => {
        if (userData === null) return // wait until userData is actually set
        if (!userData) {
            toast.error('Unauthorized User ❌')
            navigate('/login')
        }
    }, [userData, navigate])

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
                toast.error(err?.response?.data?.message)
                navigate('/login')
            })
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}
