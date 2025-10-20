import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/axiosInstance'

export default function Profile() {
    const [userDetails, setUserDetails] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchUserDetails()
    }, [])

    console.log('userDetails :>> ', userDetails);

    function fetchUserDetails() {
        setLoading(true)
        axiosInstance({
            method: 'GET',
            url: '/user'
        })
            .then((res) => {
                setUserDetails(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div>
            <div>
                Profile 
            </div>

            {loading && (
                <div>
                    Loading 
                </div>
            )}

            {userDetails && (
                <div>
                </div>
            )}
        </div>
    )
}