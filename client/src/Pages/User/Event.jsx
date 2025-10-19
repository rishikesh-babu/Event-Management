import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/axiosInstance'
import { CalendarDays, Layers } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Event() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvents()
        scrollToTop()
    }, [])

    function scrollToTop() {
        window.scroll(0, 0)
    }

    function fetchEvents() {
        axiosInstance({
            method: 'GET',
            url: '/event'
        })
            .then((res) => {
                console.log('res :>> ', res);
                setEvents(res?.data?.data)
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
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <h1 className="mb-8 text-3xl sm:text-4xl font-bold text-center">
                Events
            </h1>

            {events?.length === 0 && (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            )}

            {/* Event Cards */}
            <div className=" grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {events?.map((item) => (
                    <div
                        key={item?.id}
                        className="grid grid-cols-[100px_1fr] items-center border rounded-lg shadow-sm hover:shadow-md bg-white overflow-hidden transition-shadow duration-300"
                    >
                        {/* Left: Date */}
                        <div className="flex flex-col items-center justify-center bg-gray-100 border-r border-gray-200 py-4 w-full h-full">
                            <div className="font-bold text-2xl text-gray-800">
                                {new Date(item?.date).getDate()}
                            </div>
                            <div className="text-sm uppercase text-gray-500">
                                {new Date(item?.date).toLocaleString('default', { month: 'short' })}
                            </div>
                        </div>

                        {/* Right: Event Details */}
                        <div className="p-4 w-full flex flex-col justify-between">
                            {/* Type & Time */}
                            <div className="flex items-center justify-between mb-2">
                                <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full capitalize">
                                    {item?.type}
                                </span>
                                <span className="text-sm text-gray-500">{formatTime(item?.time)}</span>
                            </div>

                            {/* Title */}
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                                {item?.title}
                            </h2>

                            {/* View Button */}
                            <div className="flex justify-end">
                                <Link
                                    to={`/event/${item?.id}`}
                                    className="px-4 py-2 text-white text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-colors shadow-md"
                                >
                                    View →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
