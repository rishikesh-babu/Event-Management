import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../Config/axiosInstance'

export default function EventDetails() {
    const { id } = useParams()
    const [eventDetails, setEventDetails] = useState()

    useEffect(() => {
        fetchEventDetails()
    }, [])

    console.log('eventDetails :>> ', eventDetails);

    function fetchEventDetails() {
        axiosInstance({
            method: 'GET',
            url: `/event/${id}`
        })
            .then((res) => {
                setEventDetails(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    function formatTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Loading state */}
            {!eventDetails ? (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 space-y-6 p-6">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        {eventDetails.title}
                    </h1>

                    {/* Event Type */}
                    <div className="flex justify-center">
                        <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-600 rounded-full capitalize">
                            {eventDetails.type}
                        </span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex justify-center gap-6 text-gray-700 text-sm sm:text-base">
                        <div>
                            <span className="font-semibold">Date:</span>{" "}
                            {new Date(eventDetails.date).toLocaleDateString()}
                        </div>
                        <div>
                            <span className="font-semibold">Time:</span>{" "}
                            {formatTime(eventDetails.time)}
                        </div>
                    </div>

                    {/* Registration Deadline */}
                    <div className="text-center text-gray-600 text-sm">
                        <span className="font-semibold">Registration Deadline:</span>{" "}
                        {new Date(eventDetails.registration_deadline).toLocaleDateString()}
                    </div>

                    {/* Seats & Fee */}
                    <div className="flex justify-center gap-6 text-gray-700 text-sm sm:text-base">
                        <div>
                            <span className="font-semibold">Seats:</span> {eventDetails.seat}
                        </div>
                        <div>
                            <span className="font-semibold">Fee:</span>{" "}
                            {eventDetails.reg_fee ?? "Free"}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-gray-700 text-sm sm:text-base">
                        {eventDetails.description}
                    </div>

                    {/* Register Button */}
                    <div className="flex justify-center">
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-colors">
                            Register
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}
