import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../Config/axiosInstance'

export default function AdminEvent() {
    const [event, setEvent] = useState([])
    const [type, setType] = useState('all')

    useEffect(() => {
        fetchEvent()
    }, [])

    const filteredEvents = useMemo(() => {
        const now = new Date()
        if (type === 'upcoming') {
            return event.filter(e => new Date(e.registration_deadline) >= now)
        } else if (type === 'past') {
            return event.filter(e => new Date(e.registration_deadline) < now)
        } else {
            return event
        }
    }, [type, event])

    function fetchEvent() {
        axiosInstance({
            method: 'GET',
            url: '/event'
        })
            .then((res) => {
                let events = res?.data?.data?.sort((a, b) => {
                    let result = a.type.localeCompare(b.type)
                    return new Date(b.registration_deadline) - new Date(a.registration_deadline)
                })
                console.log('event :>> ', events);
                setEvent(events)
            })
            .catch((err) => {
                console.log('err :>> ', err);
                setEvent([])
            })
    }
    return (
        // <div>

        //     <div className="flex justify-start px-10 gap-3 my-6">
        //         <button
        //             onClick={() => setType("all")}
        //             className={`px-4 py-2 rounded-full font-semibold border  ${type === "all"
        //                 ? "bg-blue-600 text-white border-blue-700"
        //                 : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"}`} >
        //             All
        //         </button>

        //         <button
        //             onClick={() => setType("upcoming")}
        //             className={`px-4 py-2 rounded-full font-semibold border  ${type === "upcoming"
        //                 ? "bg-blue-600 text-white border-blue-700"
        //                 : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"}`}>
        //             Upcoming
        //         </button>

        //         <button
        //             onClick={() => setType("past")}
        //             className={`px-4 py-2 rounded-full font-semibold border ${type === "past"
        //                 ? "bg-blue-600 text-white border-blue-700"
        //                 : "bg-white text-blue-600 border-blue-400 hover:bg-blue-100"}`}>
        //             Past
        //         </button>
        //     </div>

        //     <div>
        //         {event.length === 0 ? (
        //             <div>
        //                 <span className='loading loading-spinner loading-xl text-primary' />
        //             </div>
        //         ) : (
        //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">

        //                 {filteredEvents.length === 0 ?
        //                     <div className="flex flex-col items-center justify-center py-10 text-gray-500 font-semibold uppercase">
        //                         No {type} Events Found
        //                     </div>


        //                     : filteredEvents.map((item) => (
        //                         <Link
        //                             key={item.id}
        //                             to={`${item.id}`}
        //                             className=" bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:scale-105 transition-transform duration-300 bg-gradient-to-tr from-blue-100 via-violet-100  to-blue-50">
        //                             <div className="flex flex-col h-full">

        //                                 <div className="flex justify-between items-start mb-4">
        //                                     <h3 className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-transform ">
        //                                         {item.title}
        //                                     </h3>
        //                                     <div className='flex gap-x-2'>

        //                                         <span className='px-2 py-1 rounded-full text-xs font-semibold border 
        //                                     bg-blue-500/20 text-blue-500 border-blue-600/50'>
        //                                             {item.type}
        //                                         </span>
        //                                         <span className={`px-2 py-1 rounded-full text-xs font-semibold border 
        //                                     ${new Date(item.registration_deadline) < new Date() ? "bg-red-500/20 text-red-500 border-red-600/50" : "bg-green-500/20 text-green-500 border-green-600/50"}`}>
        //                                             {new Date(item.registration_deadline) < new Date()
        //                                                 ? "Closed"
        //                                                 : "Open"}
        //                                         </span>
        //                                     </div>
        //                                 </div>

        //                                 <div className="space-y-4 flex-1">
        //                                     <div className='grid grid-cols-2 gap-2 '>
        //                                         <div className="bg-gray-600/30 rounded-lg p-3 border border-gray-700/50">
        //                                             <p className="text-gray-700 text-xs mb-1">Registration ends on</p>
        //                                             <p className="text-gray-700 font-semibold text-sm">
        //                                                 {item.registration_deadline}
        //                                             </p>
        //                                         </div>

        //                                         <div className="bg-gray-600/30 rounded-lg p-3 border border-gray-700/50">
        //                                             <p className="text-gray-700 text-xs mb-1">Event date</p>
        //                                             <p className="text-gray-700 font-semibold text-sm">
        //                                                 {item.date}
        //                                             </p>
        //                                         </div>
        //                                     </div>

        //                                     <div className="bg-gray-600/30 rounded-lg p-3 border border-gray-700/50">
        //                                         <p className="text-gray-700 text-xs mb-1">Entry Fee</p>
        //                                         <p className={`font-bold text-lg ${item.reg_fee && item.entry_fee > 0
        //                                             ? 'text-yellow-600'
        //                                             : 'text-green-600'
        //                                             }`}>
        //                                             {item.entry_fee && item.entry_fee > 0 ? `₹${item.reg_fee}` : "Free"}
        //                                         </p>
        //                                     </div>
        //                                 </div>
        //                                 <div className="flex justify-start mt-4 gap-2">
        //                                     <button

        //                                         className="px-3 py-1 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition">
        //                                         Edit
        //                                     </button>
        //                                     <button

        //                                         className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition">
        //                                         Delete
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         </Link>
        //                     ))}
        //             </div>
        //         )}
        //     </div>
        // </div>


        <div className='m-2 py-4 px-1 sm:px-4 max-w-2xl mx-auto bg-gray-100 rounded-xl shadow-sm'>
            <div className='mb-6 font-bold text-3xl text-center'>
                Events
            </div>

            <div>
                {event.length === 0 ? (
                    <div></div>
                ) : (
                    <div>
                        <div className="p-3 font-semibold text-gray-700 text-lg bg-gray-300/60 rounded-t-lg grid grid-cols-[40px_1fr_1fr_160px] border-b border-gray-300">
                            <span>#</span>
                            <span>Name</span>
                            <span>Type</span>
                            <span className="text-center">Actions</span>
                        </div>

                        {event?.map((item, index) => (
                            <div key={item?.id} className={`p-3 grid grid-cols-[40px_1fr_1fr_160px] items-center text-gray-800 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-all border-b last:border-b-0`}>
                                <div>
                                    {index + 1}
                                </div>

                                <div>
                                    {item?.title}
                                </div>

                                <div className='capitalize'>
                                    {item?.type}
                                </div>

                                <div className="flex justify-center space-x-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-all"
                                    >
                                        View
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
        </div>
    )
}
