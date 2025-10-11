import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/axiosInstance'

export default function AdminCollage() {
    const [collages, setCollages] = useState([])

    useEffect(() => {
        fetchCollage()
    }, [])

    function fetchCollage() {
        axiosInstance({
            method: 'GET',
            url: '/collage'
        })
            .then((res) => {
                console.log('res :>> ', res);
                setCollages(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);

            })
    }
    return (
        <div className="m-2 bg-gray-100 rounded-xl">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Colleges</h1>

            {/* Loading State */}
            {collages.length === 0 ? (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            ) : (
                <div>
                    <div className='p-3 grid grid-cols-[50px_1fr_100px]'>
                        <span>#</span>
                        <div>Name</div>
                        <div>Action</div>
                    </div>
                    
                    {collages?.map((item, index) => (
                        <div className='p-3 grid grid-cols-[50px_1fr_100px] ' key={item?.id}>
                            <div>{index + 1}</div>
                            <div>{item?.name}</div>
                            <div>
                                <button>
                                    Edit
                                </button>
                                <button>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}
