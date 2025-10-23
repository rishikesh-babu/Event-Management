import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AdminProtectLayout() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userData || userData?.role !== 'admin') {
            console.log('userData :>> ', userData);
            navigate('/')        
        }
    }, [userData])
    return <Outlet />
}