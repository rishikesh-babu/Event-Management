import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosInstance';
import { Link } from 'react-router-dom';

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
        window.scroll(0, 0);
        fetchRegisteredEvents();
    }, []);

    function fetchRegisteredEvents() {
        setIsLoading(true);
        axiosInstance.get('/registration')
            .then((res) => {
                // Ensure data is set, handling null/undefined case
                setRegisteredEvents(res?.data?.data || []);
            })
            .catch((err) => {
                console.error('Error fetching registered events:', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
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

                {/* Events List */}
                {!isLoading && registeredEvents.length > 0 && (
                    <div className='w-full space-y-6'>
                        {registeredEvents?.map((item, index) => (
                            <div
                                key={item.id}
                                className={`event-card bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-xl transition duration-300 border-l-8 ${getStatusBorderClass(item.status)}`}
                            >
                                
                                {/* Event Details (Left Side) */}
                                <div className="flex gap-10 details mb-4 sm:mb-0 sm:w-3/5">
                                    <div>
                                        {/* Event Name (from item.event.title) */}
                                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                            {item.event?.title || `Event #${item.event?.id || 'N/A'}`} 
                                        </h2>
                                        
                                        {/* Date of Event (from item.event.date) */}
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Event Date:</span> {formatDate(item.event?.date)}
                                        </p>
                                    </div>
                                    
                                    <div className='mt-4'>
                                        {/* Location/Type (from item.event.type) */}
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Type:</span> {item.event?.type || 'N/A'}
                                        </p>
                                        
                                        {/* Registration ID (from item.id)
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Registration ID:</span> {item.id}
                                        </p> */}
                                        
                                        {/* Registration Date (from item.registrationTime) */}
                                        <p className="text-gray-600">
                                            <span className="font-semibold">Registered Date:</span> {formatDate(item.registrationTime)}
                                        </p>
                                    </div>
                                </div>

                                {/* Status and Action Buttons (Right Side) */}
                                <div className="actions sm:w-2/5 flex flex-col sm:flex-row items-start sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0">
                                    
                                    {/* Status Badge */}
                                    <span
                                        className={`px-3 py-1 text-sm font-semibold rounded-full min-w-[100px] text-center capitalize ${getStatusBadgeClass(item.status)}`}
                                    >
                                        {item.status}
                                    </span>

                                    {/* Action Button: Download or View Details */}
                                    <button
                                        // Use Link if you prefer client-side routing for View Details
                                        onClick={item.status?.toLowerCase() === 'attended' || item.status?.toLowerCase() === 'completed' 
                                            ? () => handleCertificateDownload(item.id) 
                                            : () => window.location.href = `/event/${item.event.id}` // Navigate for view details
                                        }
                                        className={`py-2 px-4 rounded-lg font-medium text-center transition duration-200 shadow-md 
                                            ${item.status?.toLowerCase() === 'attended' || item.status?.toLowerCase() === 'completed'
                                                ? 'bg-yellow-500 text-blue-900 hover:bg-yellow-400' // Certificate Button
                                                : item.status?.toLowerCase() === 'registered' || item.status?.toLowerCase() === 'upcoming'
                                                ? 'bg-blue-500 text-white hover:bg-blue-600' // View Details Button
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                                        `}
                                        // Disable button if not a relevant status
                                        disabled={!(item.status?.toLowerCase() === 'registered' || item.status?.toLowerCase() === 'upcoming' || item.status?.toLowerCase() === 'attended' || item.status?.toLowerCase() === 'completed')}
                                    >
                                        {item.status?.toLowerCase() === 'attended' || item.status?.toLowerCase() === 'completed'
                                            ? 'Download Certificate'
                                            : 'View Details'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
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