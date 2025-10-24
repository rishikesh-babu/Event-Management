import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../Config/axiosInstance';
import { useParams } from 'react-router-dom'
import { X } from 'lucide-react';
import { Calendar, Clock, Users, CreditCard } from 'lucide-react';

export default function AdminEventDetails() {
    const { id } = useParams()
    const [event, setEvent] = useState({})
    const [originalEvent, setOriginalEvent] = useState({})

    const [errors, setErrors] = useState([])
    const [collages, setCollages] = useState([])
    const [edit, setEdit] = useState(false)

    const [loading, setLoading] = useState(true)
    const [registrations, setRegistrations] = useState([])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        fetchEventDetails()
        fetchRegistrations()
        fetchCollage()
    }, [id]);

    function fetchEventDetails() {
        setLoading(true);
        axiosInstance
            .get(`/event/${id}`)
            .then((res) => {
                let data = res?.data?.data
                data = {
                    ...data,
                    duration: data.duration,
                    durationType: data.durationType,

                }
                setEvent(data);
                setOriginalEvent(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log('err :>> ', err);
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

    function fetchRegistrations() {
        axiosInstance({
            method: 'GET',
            url: `/user/${id}`
        })
            .then((res) => {
                setRegistrations(res?.data?.data)
                console.log(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({
            ...event,
            [name]: value
        });
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null
            }));
        }
    }

    const handleCancel = () => {
        setEdit(false);
        setEvent(originalEvent);
        setErrors({});
    }

    const validate = () => {
        let newErrors = {};

        if (!event.title.trim()) newErrors.title = "Title is required.";
        if (!event.description.trim()) newErrors.description = "Description is required.";
        if (!event.type.trim()) newErrors.type = "Event type is required.";
        if (!event.date) newErrors.date = "Event date is required.";
        if (!event.time) newErrors.time = "Event time is required.";
        if (!event.duration || event.duration <= 0) newErrors.duration = "Enter valid duration.";
        if (!event.durationType) newErrors.durationType = "Select duration type.";
        if (!event.seat || event.seat <= 0) newErrors.seat = "Enter valid number of seats.";
        if (!event.collageId) newErrors.collageId = "Select a college.";
        if (!event.registration_deadline) newErrors.registration_deadline = "Registration deadline required.";
        if (!event.fee || event.fee < 0) {
            setEvent({
                ...event,
                fee: 0
            });
        }
        if (event.date && event.registration_deadline && event.registration_deadline > event.date)
            newErrors.registration_deadline = "Enter valid event date.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return;

        const payload = {};
        Object.keys(event).forEach(key => {
            if (event[key] !== originalEvent[key]) {
                payload[key] = event[key]
            }
        })
        if (payload.duration || payload.durationType) {
            payload.duration = `${event.duration} ${event.durationType}`
        }

        console.log("Payload", payload)
        axiosInstance({
            method: 'PUT',
            url: `/event/${id}`,
            data: payload
        })
            .then((res) => {
                console.log('res :>> ', res);
                setEdit(false);
            })
            .catch((err) => {
                console.log('err :>> ', err);

            })

        setOriginalEvent(event);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="flex flex-col items-center justify-start h-screen pt-20">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-700 font-semibold">Loading event details...</p>
                </div>
            </div>
        );
    }



    return (<>
        <div>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Details</h1>
                    </div>
                    {!edit && (
                        <button
                            onClick={() => setEdit(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Edit Event
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">

                        <div className="relative flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="w-1 h-full bg-blue-500 rounded-l-lg absolute top-0 left-0"></div>
                            <div className="ml-3">
                                <p className="font-medium">Event Title</p>
                                <p>{event.title}</p>
                            </div>
                        </div>

                        <div className="relative flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="w-1 h-full bg-purple-500 rounded-l-lg absolute top-0 left-0"></div>
                            <div className="ml-3">
                                <p className="font-medium">Event Date & Time</p>
                                <p>{event.date} at {event.time}</p>
                            </div>
                        </div>

                        <div className="relative flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="w-1 h-full bg-green-500 rounded-l-lg absolute top-0 left-0"></div>
                            <div className="ml-3">
                                <p className="font-medium">Duration</p>
                                <p>{event.duration} {event.durationType}</p>
                            </div>
                        </div>

                        <div className="relative flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="w-1 h-full bg-yellow-500 rounded-l-lg absolute top-0 left-0"></div>
                            <div className="ml-3">
                                <p className="font-medium">Registration Deadline</p>
                                <p>{event.registration_deadline}</p>
                            </div>
                        </div>

                        <div className="relative flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="w-1 h-full bg-red-500 rounded-l-lg absolute top-0 left-0"></div>
                            <div className="ml-3">
                                <p className="font-medium">Total Seats</p>
                                <p>{event.seat}</p>
                            </div>
                        </div>

                        <div className="relative flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="w-1 h-full bg-teal-500 rounded-l-lg absolute top-0 left-0"></div>
                            <div className="ml-3">
                                <p className="font-medium">Registered Participants</p>
                                <p>{registrations?.length}</p>
                            </div>
                        </div>

                        <div className="relative flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="w-1 h-full bg-orange-500 rounded-l-lg absolute top-0 left-0"></div>
                            <div className="ml-3">
                                <p className="font-medium">Event Fee</p>
                                <p>{event.fee ? 'Rs.' + event.fee : 'FREE'}</p>
                            </div>
                        </div>

                        <div className="relative flex items-center p-4 bg-white rounded-lg shadow">
                            <div className="w-1 h-full bg-indigo-500 rounded-l-lg absolute top-0 left-0"></div>
                            <div className="ml-3">
                                <p className="font-medium">Hosted By</p>
                                <p>{collages.find(c => c.id === event.collageId)?.name}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 pb-16">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        Registration
                    </h3>
                    <div className="overflow-x-scroll md:overflow-hidden rounded-xl border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                <tr className="text-left">
                                    <th className="py-4 px-6 font-semibold text-gray-700">#</th>
                                    <th className="py-4 px-6 font-semibold text-gray-700">Participant</th>
                                    <th className="py-4 px-6 font-semibold text-gray-700">Email</th>
                                    <th className="py-4 px-6 font-semibold text-gray-700">Collage</th>
                                    <th className="py-4 px-6 font-semibold text-gray-700">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {registrations.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-gray-500 text-lg font-medium">No registrations yet</p>
                                                <p className="text-gray-400 mt-2">Participants will appear here once they register</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    registrations.map((reg, index) => (
                                        <tr key={reg.id} className="hover:bg-blue-50 transition-colors">
                                            <td className="py-4 px-6 text-gray-600 font-medium">{index + 1}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                        {reg.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-900">
                                                        {reg.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                {reg.email}
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                {collages.find(c => c.id === event.collageId)?.name}
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-sm border font-medium capitalize ${reg.status === 'active' ? 'bg-green-100 text-green-800 border-green-800' : 'bg-yellow-100 text-yellow-600 border-yellow-600'}`}>
                                                    {reg.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {edit && (<div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-tr from-blue-50 to-purple-50 rounded-xl shadow-2xl p-8">
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Update Event Details</h1>
                    <div className="w-24 h-1 bg-violet-500 mx-auto rounded-full"></div>
                    <button
                        onClick={handleCancel}
                        className="absolute top-4 right-4 p-2 rounded-full  focus:outline-none transition"
                        aria-label="Close"
                    >
                        <X size={26} className="text-gray-900 hover:text-gray-600" />
                    </button>

                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={event.title}
                                onChange={handleChange}
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all'
                            />
                            {errors.title && (
                                <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description <span className='text-red-500'>*</span></label>
                            <textarea
                                name="description"
                                value={event.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-none transition-all"
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 my-3">
                            <div className="w-1 h-6 bg-green-600 rounded-full"></div>
                            Event Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type<span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    name="type"
                                    value={event.type}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all'
                                    placeholder='Hackathon, Seminar, etc'
                                />
                                {errors.type && (
                                    <p className="text-sm text-red-600 mt-1">{errors.type}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Seats<span className='text-red-500'>*</span></label>
                                <input
                                    type="number"
                                    name="seat"
                                    value={event.seat}
                                    onChange={handleChange}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all'
                                    min="1"
                                />
                                {errors.seat && (
                                    <p className="text-sm text-red-600 mt-1">{errors.seat}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">College <span className='text-red-500'>*</span></label>
                            <select
                                name="collageId"
                                value={event.collageId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">Select a college</option>
                                {collages.map((collage) => (
                                    <option key={collage.id} value={collage.id}>
                                        {collage.name}
                                    </option>
                                ))}
                            </select>
                            {errors.collageId && (
                                <p className="text-sm text-red-600 mt-1">{errors.collageId}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 py-3">
                            <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                            Date & Time
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date <span className='text-red-500'>*</span></label>
                                <input
                                    type="date"
                                    name="date"
                                    value={event.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                                />
                                {errors.date && (
                                    <p className="text-sm text-red-600 mt-1">{errors.date}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Event Time <span className='text-red-500'>*</span></label>
                                <input
                                    type="time"
                                    name="time"
                                    value={event.time}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                                />
                                {errors.time && (
                                    <p className="text-sm text-red-600 mt-1">{errors.time}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={event.duration}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                                />
                                {errors.duration && (
                                    <p className="text-sm text-red-600 mt-1">{errors.duration}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 invisible">
                                    Type
                                </label>
                                <select
                                    name="durationType"
                                    value={event.durationType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all">
                                    <option value="">Select Type</option>
                                    <option value="minutes">Minutes</option>
                                    <option value="hours">Hours</option>
                                    <option value="days">Days</option>
                                    <option value="months">Months</option>
                                </select>
                                {errors.durationType && (
                                    <p className="text-sm text-red-600 mt-1">{errors.durationType}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
                            Registration
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Deadline <span className='text-red-500'>*</span></label>
                                <input
                                    type="date"
                                    name="registration_deadline"
                                    value={event.registration_deadline}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                                />
                                {errors.registration_deadline && (
                                    <p className="text-sm text-red-600 mt-1">{errors.registration_deadline}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Fee <span className='text-red-500'>*</span></label>
                                <input
                                    type="number"
                                    name="fee"
                                    value={event.fee}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                                />
                                {errors.fee && (
                                    <p className="text-sm text-red-600 mt-1">{errors.fee}</p>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-gray-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-300"
                        >
                            Update Event
                        </button>
                    </div>
                </form>
            </div>
        </div>)}
    </>
    )
}