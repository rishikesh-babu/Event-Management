import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosInstance';
import { Link } from 'react-router-dom';

export default function MyEvent() {
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scroll(0, 0)
        fetchRegisteredEvents()
    }, [])

    console.log('registeredEvents :>> ', registeredEvents);

    function fetchRegisteredEvents() {
        setIsLoading(true)
        axiosInstance({
            method: 'GET',
            url: '/registration'
        })
            .then((res) => {
                setRegisteredEvents(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    return (
        <div className='p-1 flex flex-col '>
            <div className='mb-8 font-bold text-center text-3xl sm:text-4xl'>
                Registered Events
            </div>

            <div className='min-h-[50vh] flex justify-center items-center  '>
                {isLoading && (
                    <div className=" flex justify-center items-center gap-5">
                        <span className="font-semibold text-xl text-info">Loading </span>
                        <span className='loading loading-spinner text-info' />
                    </div>
                )}

                {registeredEvents.length === 0 && !isLoading && (
                    <div className="p-10 text-center border-l-4 border-yellow-400 rounded-lg shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] flex flex-col justify-center items-center">
                        <p className="font-medium text-xl text-gray-700 ">
                            You haven't registered for any events yet.
                        </p>
                        <Link
                            to={'/event'}
                            className="mt-5 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                            Browse Events
                        </Link>
                    </div>
                )}

{registeredEvents?.map((item, index) => (
    <div>
events
    </div>
))}

            </div>
        </div>
    )

    //     return (
    //         <div className="my-events-container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">

    //             {/* Page Header */}
    //             <div className="text-center mb-10">
    //                 <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-500 inline-block pb-1">
    //                     My Registered Events
    //                 </h1>
    //                 <p className="mt-4 text-lg text-gray-600">
    //                     A list of all events you have successfully registered for.
    //                 </p>
    //             </div>

    //             {/* No Events Message */}
    //             {registeredEvents.length === 0 && (
    //                 <div className="text-center p-10 bg-white rounded-lg shadow-lg border-l-4 border-yellow-500">
    //                     <p className="text-xl text-gray-700 font-medium">
    //                         You haven't registered for any events yet.
    //                     </p>
    //                     <button
    //                         onClick={() => window.location.href = '/events'}
    //                         className="mt-5 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
    //                     >
    //                         Browse Events
    //                     </button>
    //                 </div>
    //             )}

    //             {/* Events List */}
    //             <div className="space-y-6">
    //                 {registeredEvents.map((event) => (
    //                     <div
    //                         key={event.id}
    //                         // Using the single, clean border function
    //                         className={`event-card bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-xl transition duration-300 border-l-8 ${getStatusBorderClass(event.status)}`}
    //                     >

    //                         {/* Event Details */}
    //                         <div className="details mb-4 md:mb-0 md:w-3/5">
    //                             <h2 className="text-2xl font-bold text-gray-800 mb-1">{event.title}</h2>
    //                             <p className="text-gray-600">
    //                                 <span className="font-semibold">Date:</span> {event.date} at {event.time}
    //                             </p>
    //                             <p className="text-gray-600">
    //                                 <span className="font-semibold">Location:</span> {event.location}
    //                             </p>
    //                         </div>

    //                         {/* Status and Action Buttons */}
    //                         <div className="actions md:w-2/5 flex flex-col sm:flex-row items-start md:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">

    //                             {/* Status Badge */}
    //                             <span className={`px-3 py-1 text-sm font-semibold rounded-full min-w-[100px] text-center
    //                 ${event.status === 'Registered' || event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
    //                                     event.status === 'Attended' ? 'bg-green-100 text-green-800' :
    //                                         event.status === 'Completed' ? 'bg-green-100 text-green-800' :
    //                                             event.status === 'Missed' ? 'bg-red-100 text-red-800' :
    //                                                 'bg-gray-100 text-gray-600'}
    //                         `}>
    //                                 {event.status}
    //                             </span>

    //                             {/* Action Button */}
    //                             {event.isCertificateAvailable ? (
    //                                 <button
    //                                     onClick={() => handleCertificateDownload(event.id)}
    //                                     className="bg-yellow-500 text-blue-900 font-medium py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-200 shadow-md"
    //                                 >
    //                                     Download Certificate
    //                                 </button>
    //                             ) : (
    //                                 <button
    //                                     disabled={event.status !== 'Registered' && event.status !== 'Upcoming'}
    //                                     className={`py-2 px-4 rounded-lg font-medium 
    //                     ${event.status === 'Registered' || event.status === 'Upcoming'
    //                                             ? 'bg-blue-500 text-white hover:bg-blue-600'
    //                                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
    //                     transition duration-200 shadow-md
    //                   `}
    //                                 >
    //                                     View Details
    //                                 </button>
    //                             )}
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     );
}