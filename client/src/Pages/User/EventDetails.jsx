import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../Config/axiosInstance'
import { Calendar, Clock } from 'lucide-react'

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

    function formatDate(dateStr) {
        const date = new Date(dateStr)

        const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "long",    // "Wednesday"
            year: "numeric",    // "2023"
            month: "long",      // "November"
            day: "numeric"      // "15"
        })
        return formattedDate
    }

    function formatTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    return (
        <div>
            {!eventDetails ? (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            ) : (
                <div className='p-1'>
                    <div className=' text-white bg-[url("https://picsum.photos/1200/400?random=1")] rounded-2xl '>
                        <div className=' min-h-[70vh] bg-black/70 rounded-2xl flex flex-col justify-center items-center gap-7 '>
                            <div className='px-6 py-2 font-semibold bg-primary rounded-full'>
                                {eventDetails?.type}
                            </div>
                            <div className=' font-bold text-5xl'>
                                {eventDetails?.title}
                            </div>
                            <div className='font-semibold text-lg flex flex-col items-center gap-3'>
                                <div className=' flex items-center gap-2 '>
                                    <Calendar />
                                    {formatDate(eventDetails?.date)}
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Clock />
                                    {formatTime(eventDetails?.time)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
