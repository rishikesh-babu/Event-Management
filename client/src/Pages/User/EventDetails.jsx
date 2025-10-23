import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../Config/axiosInstance'
import { Calendar, Clock, IndianRupee, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function EventDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [eventDetails, setEventDetails] = useState()
    const [registrations, setRegistrations] = useState([])
    const [collageDetails, setCollageDetails] = useState()
    const [registered, setRegistered] = useState(false)
    const [registrationClosed, setRegistrationClosed] = useState(false);


    useEffect(() => {
        fetchEventDetails()
        //fetchRegistrations()
        fetchMyRegistrations()
    }, [id])

    useEffect(() => {
        if (eventDetails) {
            fetchCollage()
        }
    }, [eventDetails])

    // useEffect(() => {
    //     if (collageDetails) {
    //         const shortName = collageDetails?.name.match(/[A-Z]/g).join('') || ''
    //         setCollageDetails({
    //             ...collageDetails,
    //             shortName
    //         })
    //     }
    // }, [collageDetails])

    function fetchEventDetails() {
        axiosInstance({
            method: 'GET',
            url: `/event/${id}`
        })
            .then((res) => {
                setEventDetails(res?.data?.data)
                const today = new Date()
                const deadline = new Date(res?.data?.data?.registration_deadline);
                setRegistrationClosed(today > deadline)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    function fetchCollage() {
        axiosInstance({
            method: 'GET',
            url: `/collage/${eventDetails?.collageId}`
        })
            .then((res) => {
                setCollageDetails(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    function calculateAvailableSeat() {
        const availableSeat = eventDetails.seat - registrations.length
        return availableSeat
    }

    function fetchRegistrations() {
        axiosInstance({
            method: 'GET',
            url: `/registration/${id}`
        })
            .then((res) => {
                setRegistrations(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }


    function fetchMyRegistrations() {
        axiosInstance({
            method: 'GET',
            url: '/registration'
        })
            .then((res) => {
                const data = res?.data?.data
                const isRegistered = data.some((item) => Number(item.event.id) === Number(id))
                setRegistered(isRegistered)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr)

        const day = date.toLocaleDateString("en-US", { weekday: "long" })
        const dayNum = date.getDate().toString()
        const month = date.toLocaleDateString("en-US", { month: "long" })
        const year = date.getFullYear().toString()

        const result = [day, dayNum, month, year]
        return result
    }

    function formatTime(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    function eventRegistrtion() {
        axiosInstance({
            method: 'POST',
            url: `/registration/${id}`
        })
            .then((res) => {
                console.log(res?.data?.data)
                setRegistered(true)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    return (
        <div>
            {!eventDetails ? (
                <div className="flex justify-center items-center h-48">
                    <span className="loading loading-spinner text-primary w-10 h-10" />
                </div>
            ) : (
                 <div className='px-1 pb-7 sm:pb-10 flex flex-col gap-6 sm:gap-8'>
                    {/* Title and short details */}
                    <div className=' text-white bg-[url("https://picsum.photos/1200/400?random=1")] bg-cover rounded-2xl '>
                        <div className=' min-h-[85vh] bg-black/70 rounded-2xl flex flex-col justify-center items-center gap-7 sm:gap-9 '>
                            <div className='px-6 py-2 font-semibold sm:text-xl capitalize bg-primary rounded-full shadow-[0px_0px_10px_#00ffff]'>
                                {eventDetails?.type}
                            </div>

                            <div className=' font-bold text-5xl sm:text-6xl capitalize '>
                                {eventDetails?.title}
                            </div>

                            <div className='font-semibold text-lg sm:text-2xl flex flex-col sm:flex-row items-center gap-3'>
                                <div className=' flex items-center gap-2 '>
                                    <Calendar />
                                    <span>{formatDate(eventDetails?.date)[0]},</span>
                                    <span>{formatDate(eventDetails?.date)[2]}</span>
                                    <span>{formatDate(eventDetails?.date)[1]},</span>
                                    <span>{formatDate(eventDetails?.date)[3]}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Clock />
                                    {formatTime(eventDetails?.time)}
                                </div>
                            </div>
                            {registrationClosed ? (
                                <button
                                    disabled
                                    className='px-6 py-2 text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 rounded-xl shadow-[0px_0px_10px_#FF3366]  cursor-not-allowed'>
                                    Registration Closed
                                </button>
                            ) : registered ?
                                (<div className="flex flex-col items-center gap-2">
                                        <p className="text-gray-300 text-lg text-center">
                                            You’re already registered for this event
                                        </p>
                                        <button
                                            onClick={() => navigate('/user/myevent')}
                                            className='px-6 py-2 text-2xl sm:text-3xl font-semibold  bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600  rounded-xl shadow-[0px_0px_10px_#9B5DE5] hover:scale-105 transition-all duration-300'>
                                            View My Events
                                        </button>
                                    </div>) :
                                (<button
                                    onClick={eventRegistrtion}
                                    className='px-6 py-2 text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500  rounded-xl shadow-[0px_0px_10px_#00ffff] hover:scale-105 transition-all duration-300'>
                                    Register
                                </button>)
                            }
                        </div>
                    </div>

                    <div className='p-4 rounded-xl shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] flex flex-row justify-around'>
                        <div className=' flex flex-col items-center'>
                            <Users className=' size-8 text-indigo-600' />
                            <span className=' font-bold text-2xl'>
                                {calculateAvailableSeat()}
                            </span>
                            <span className=' text-gray-500 text-center'>
                                Seat Available
                            </span>
                        </div>

                        <div className='flex flex-col items-center'>
                            <IndianRupee className='size-8 text-indigo-600' />
                            <span className='font-bold text-2xl'>
                                {eventDetails?.fee ? eventDetails?.fee : 'FREE'}
                            </span>
                            <span className='text-gray-500 text-center'>
                                Registration Fee
                            </span>
                        </div>

                        <div className='flex flex-col items-center'>
                            <Calendar className='size-8 text-indigo-600' />
                            <span className='font-bold text-2xl '>
                                {formatDate(eventDetails?.date)[2].slice(0, 3)}
                                {' '}
                                {formatDate(eventDetails?.date)[1]}
                            </span>
                            <span className='text-gray-500 text-center'>
                                Registration Deadline
                            </span>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8 '>
                        <div className='p-4 rounded-xl shadow-[0_0_20px_4px_rgba(0,0,0,0.2)]'>
                            <div className='mb-2 font-medium text-2xl text-center'>
                                About the {' '}
                                <span className=' capitalize'>
                                    {eventDetails?.type}
                                </span>
                            </div>
                            <hr />
                            <div className='mt-5 text-justify'>
                                {eventDetails?.description}
                            </div>
                        </div>

                        <div className='p-4 rounded-xl shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] '>
                            <div className='mb-2 font-medium text-2xl text-center'>
                                Hosted By
                            </div>
                            <hr />
                            <div className='mt-5 flex items-center gap-4'>
                                <div className='p-4 font-bold text-xl text-primary bg-gray-300/50 border rounded-full '>
                                    {collageDetails?.name ? collageDetails.name.match(/[A-Z]/g)?.join('') || '' : ''}
                                </div>
                                <div className=' font-medium text-lg'>
                                    {collageDetails?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
