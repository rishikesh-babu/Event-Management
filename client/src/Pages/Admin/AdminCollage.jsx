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
        <div className="m-2 p-4 bg-gray-100 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Colleges</h1>

            {/* Loading State */}
            {collages.length === 0 ? (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            ) : (
                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <div className="p-3 font-semibold text-gray-700 text-lg bg-gray-200 grid grid-cols-[40px_1fr_160px] border-b border-gray-300">
                        <span>#</span>
                        <span>Name</span>
                        <span className="text-center">Actions</span>
                    </div>

                    {collages.map((item, index) => (
                        <div key={item?.id} className={`p-3 grid grid-cols-[40px_1fr_160px] items-center text-gray-800 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all border-b last:border-b-0`}>
                            <div>{index + 1}</div>

                            <div className="font-medium">{item?.name}</div>

                            <div className="flex justify-center space-x-3">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-all"
                                >
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
