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
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Colleges</h1>

            {/* Loading State */}
            {collages.length === 0 ? (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            ) : (
                <div>
                    <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-md overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold">#</th>
                                <th className="py-3 px-4 text-left font-semibold">College Name</th>
                                <th className="py-3 px-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collages.map((item, index) => (
                                <tr
                                    key={item?.id}
                                    className="border-t hover:bg-gray-50 transition-all"
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4 font-medium text-gray-800">
                                        {item?.name}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-all mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    )
}
