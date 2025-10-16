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
        <div className="m-2 py-4 px-1 sm:px-4 max-w-2xl mx-auto bg-gray-100 rounded-xl shadow-sm">
            <h1 className="mb-6 font-bold text-3xl text-center">Colleges</h1>

            <div className="mb-6 flex flex-row items-center justify-between gap-3">
                <input
                    type="text"
                    // value={collegeName}
                    // onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="Enter college name"
                    className="px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <button
                    // onClick={handleAddCollege}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                >
                    Add
                </button>
            </div>

            {/* Loading State */}
            {collages.length === 0 ? (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            ) : (
                <div>
                    <div className="p-3 font-semibold text-gray-700 text-lg bg-gray-300/60 rounded-t-lg grid grid-cols-[40px_1fr_160px] border-b border-gray-300">
                        <span>#</span>
                        <span>Name</span>
                        <span className="text-center">Actions</span>
                    </div>

                    {collages.map((item, index) => (
                        <div key={item?.id} className={`p-3 grid grid-cols-[40px_1fr_160px] items-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all border-b last:border-b-0`}>
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
