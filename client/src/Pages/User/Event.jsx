import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/axiosInstance'
import { CalendarDays, Layers } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Event() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvents()
    }, [])

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
    return (
       <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
        Events
      </h1>

      {/* Loading Spinner */}
      {events?.length === 0 && (
        <div className="flex justify-center items-center h-48">
          <span className="loading loading-spinner text-primary w-10 h-10" />
        </div>
      )}

      {/* Event Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events?.map((item) => (
          <div
            key={item?.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {item?.title}
              </h2>
              <p className="text-sm capitalize text-blue-600 font-medium mb-3">
                {item?.type}
              </p>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <CalendarDays className="w-4 h-4 text-blue-500" />
                <span>{item?.date}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>{item?.seat} seats</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/event/${item.id}`)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm font-medium transition-all"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
    )
}
