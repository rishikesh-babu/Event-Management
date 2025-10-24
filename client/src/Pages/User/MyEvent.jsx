import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosInstance';
import { data, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// --- UTILITY FUNCTIONS FOR STYLING (Unchanged) ---
const getStatusBorderClass = (status) => {
    const lowerStatus = status ? status.toLowerCase() : '';
    switch (lowerStatus) {
        case 'upcoming':
        case 'registered':
            return 'border-l-blue-500'; // Active/Future
        case 'attended':
        case 'completed':
            return 'border-l-green-500'; // Success
        case 'missed':
            return 'border-l-red-500'; // Missed/Warning
        default:
            return 'border-l-gray-300';
    }
};

const getStatusBadgeClass = (status) => {
    const lowerStatus = status ? status.toLowerCase() : '';
    switch (lowerStatus) {
        case 'registered':
        case 'upcoming':
            return 'bg-blue-100 text-blue-800';
        case 'attended':
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'missed':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

export default function MyEvent() {
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [collages, setCollages] = useState([])
    const navigate = useNavigate()

    // Adjusted formatDate to return a simple string for JSX ease of use
    function formatDate(dateStr) {
        if (!dateStr) return "N/A";

        try {
            // If the input is only a date string (e.g., "2026-10-28"), we can use it directly
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return "Invalid date";

            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
        } catch (e) {
            return "N/A";
        }
    }

    useEffect(() => {
        window.scroll(0, 0)
        fetchRegisteredEvents()
        fetchCollage();
    }, [])

    console.log('registeredEvents :>> ', registeredEvents);

    function fetchRegisteredEvents() {
        setIsLoading(true);
        axiosInstance.get('/registration')
            .then((res) => {
                setRegisteredEvents(res.data.data.map(item => ({
                    ...item.event,
                    status: item.status,
                    registrationTime: item.registrationTime
                })));

            })
            .catch((err) => {
                console.error('Error fetching registered events:', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    function fetchCollage() {
        axiosInstance({
            method: 'GET',
            url: '/collage'
        })
            .then((res) => {
                setCollages(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }
    const getStatusBorderClass = (status) => {
        switch (status) {
            case "registered":
                return 'border-l-green-500';
            case 'cancelled':
                // Green for successful completion
                return 'border-l-yellow-500';
            default:
                // Neutral
                return 'border-l-gray-300';
        }
    };

    function handleChangeStatus(id, status) {
        const newStatus = status === 'registered' ? 'cancelled' : 'registered';
        axiosInstance({
            method: 'PUT',
            url: `registration/${id}`,
            data: { status: newStatus }
        })
            .then((res) => {
                setRegisteredEvents(events =>
                    events.map(item =>
                        item.id === id ? { ...item, status: newStatus } : item
                    )
                )
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    // Placeholder for certificate download (triggered by yellow button)
    const handleCertificateDownload = (id) => {
        alert(`Simulating certificate download for registration ID: ${id}`);
    };

    return (
        <div className="my-events-container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">

            {/* Page Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-500 inline-block pb-1">
                    My Registered Events
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    A list of all events you have successfully registered for.
                </p>
            </div>

            <div className='min-h-[50vh] flex flex-col items-center gap-6'>
                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <span className="font-semibold text-xl text-blue-600">Loading your registered events...</span>
                        <div className="ml-3 w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                )}

                {/* No Events Message */}
                {!isLoading && registeredEvents.length === 0 && (
                    <div className="text-center p-10 bg-white rounded-lg shadow-lg border-l-4 border-yellow-500">
                        <p className="text-xl text-gray-700 font-medium">
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

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-4 gap-y-6 py-6'>
                    {!isLoading && registeredEvents?.map((event, index) => (
                        // <div
                        //     key={item.id}
                        //     className="p-5 bg-gradient-to-r from-sky-100 to-indigo-100 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-200"
                        // >
                        //     <div className="flex justify-between items-center">
                        //         <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        //             Event #{item.eventId}
                        //         </p>
                        //         <span
                        //             className={`px-3 py-1 text-sm font-semibold rounded-full ${item.status === "registered"
                        //                 ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                        //                 : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
                        //                 }`}
                        //         >
                        //             {item.status}
                        //         </span>
                        //     </div>

                        //     <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        //         Registered on{" "}
                        //         <span className="font-medium">
                        //             {new Date(item.registrationTime).toLocaleString()}
                        //         </span>
                        //     </p>

                        //     {/* Change Status Button */}
                        //     <div className="mt-4 flex justify-end">
                        //         <button
                        //             //   onClick={() => handleChangeStatus(item.id)}
                        //             className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        //         >
                        //             {item.status === "registered" ? "Cancel" : "Re-register"}
                        //         </button>
                        //     </div>
                        // </div>

                        <div
                            key={index}
                            className={`event-card bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between hover:shadow-xl transition duration-300 border-l-8 ${getStatusBorderClass(event.status)}`}
                        >
                            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
                                <h3 className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-transform">
                                    {event.title}
                                </h3>

                                <div className="flex gap-2">
                                    <span className='px-2 py-1 rounded-full text-xs font-semibold border bg-blue-500/20 text-blue-500 border-blue-600/50'>
                                        {event.type}
                                    </span>
                                    <span className={`px-2 py-1 capitalize rounded-full text-xs font-semibold border 
                    ${event.status === 'registered' ? 'bg-green-100 text-green-700 border-green-500' :
                                            event.status?.toLowerCase() === 'cancelled' ? 'bg-yellow-100 text-yellow-700 border-yellow-500' :
                                                'bg-gray-100 text-gray-600 border-gray-300'}`}>
                                        {event.status}
                                    </span>
                                </div>
                            </div>

                            {/* Event Details */}

                            <div>

                                <div className="details mb-4 md:mb-2">

                                    <p className="text-gray-600">
                                        <span className="font-semibold gap-2">Date:</span> {formatDate(event?.date)} at {event.time}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold pe-2">Location:</span>{collages.find(c => c.id === event.collageId)?.name}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Registered Date:</span> {formatDate(event.registrationTime)}
                                    </p>
                                </div>

                                {/* Status and Action Buttons */}
                                <div className="actions  flex  sm:flex-row md:items-center justify-between gap-2">

                                    {/* Action Button */}
                                    <button
                                        onClick={() => handleChangeStatus(event.id, event.status)}
                                        className="flex-1 px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                    >
                                        {event.status === "registered" ? "Cancel" : "Re-register"}
                                    </button>
                                    <button
                                        onClick={() => navigate(`/event/${event.id}`)}
                                        className={`flex-1 py-2 px-4 rounded-lg font-medium 
                                                    registered bg-blue-500 text-white hover:bg-blue-600 transition duration-200 shadow-md`}
                                    >
                                        View Details
                                    </button>
                                </div>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
    //     return (
    // Events List
    // {!isLoading && registeredEvents.length > 0 && (
    //     <div className='w-full space-y-6'>
    //         {registeredEvents?.map((item, index) => (
    //             <div
    //                 key={item.id}
    //                 className={`event-card bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-xl transition duration-300 border-l-8 ${getStatusBorderClass(item.status)}`}
    //             >

    //                 {/* Event Details (Left Side) */}
    //                 <div className="flex gap-10 details mb-4 sm:mb-0 sm:w-3/5">
    //                     <div>
    //                         {/* Event Name (from item.event.title) */}
    //                         <h2 className="text-2xl font-bold text-gray-800 mb-1">
    //                             {item.event?.title || `Event #${item.event?.id || 'N/A'}`} 
    //                         </h2>

    //                         {/* Date of Event (from item.event.date) */}
    //                         <p className="text-gray-600">
    //                             <span className="font-semibold">Event Date:</span> {formatDate(item.event?.date)}
    //                         </p>
    //                     </div>

    //                     <div className='mt-4'>
    //                         {/* Location/Type (from item.event.type) */}
    //                         <p className="text-gray-600">
    //                             <span className="font-semibold">Type:</span> {item.event?.type || 'N/A'}
    //                         </p>

    //                         {/* Registration ID (from item.id)
    //                         <p className="text-gray-600">
    //                             <span className="font-semibold">Registration ID:</span> {item.id}
    //                         </p> */}

    //                         {/* Registration Date (from item.registrationTime) */}
    //                         <p className="text-gray-600">
    //                             <span className="font-semibold">Registered Date:</span> {formatDate(item.registrationTime)}
    //                         </p>
    //                     </div>
    //                 </div>

    //                 {/* Status and Action Buttons (Right Side) */}
    //                 <div className="actions sm:w-2/5 flex flex-col sm:flex-row items-start sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0">

    //                     {/* Status Badge */}
    //                     <span
    //                         className={`px-3 py-1 text-sm font-semibold rounded-full min-w-[100px] text-center capitalize ${getStatusBadgeClass(item.status)}`}
    //                     >
    //                         {item.status}
    //                     </span>

    //                     {/* Action Button: Download or View Details */}
    //                     <button
    //                         // Use Link if you prefer client-side routing for View Details
    //                         onClick={item.status?.toLowerCase() === 'attended' || item.status?.toLowerCase() === 'completed' 
    //                             ? () => handleCertificateDownload(item.id) 
    //                             : () => window.location.href = `/event/${item.event.id}` // Navigate for view details
    //                         }
    //                         className={`py-2 px-4 rounded-lg font-medium text-center transition duration-200 shadow-md 
    //                             ${item.status?.toLowerCase() === 'attended' || item.status?.toLowerCase() === 'completed'
    //                                 ? 'bg-yellow-500 text-blue-900 hover:bg-yellow-400' // Certificate Button
    //                                 : item.status?.toLowerCase() === 'registered' || item.status?.toLowerCase() === 'upcoming'
    //                                 ? 'bg-blue-500 text-white hover:bg-blue-600' // View Details Button
    //                                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
    //                         `}
    //                         // Disable button if not a relevant status
    //                         disabled={!(item.status?.toLowerCase() === 'registered' || item.status?.toLowerCase() === 'upcoming' || item.status?.toLowerCase() === 'attended' || item.status?.toLowerCase() === 'completed')}
    //                     >
    //                         {item.status?.toLowerCase() === 'attended' || item.status?.toLowerCase() === 'completed'
    //                             ? 'Download Certificate'
    //                             : 'View Details'}
    //                     </button>
    //                 </div>
    //             </div>
    //         ))}
    //     </div>
    // )}
    //         <div className="my-events-container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
cd
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