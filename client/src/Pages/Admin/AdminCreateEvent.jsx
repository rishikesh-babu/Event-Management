import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from '../../Config/axiosInstance'
import { Loader } from 'lucide-react'
import { toast } from 'react-toastify'
export default function AdminCreateEvent() {
    const [collages, setCollages] = useState([])
    const [event, setEvent] = useState({
        title: "",
        description: "",
        type: "",
        date: "",
        time: "",
        collageId: "",
        seat: "",
        registration_deadline: "",
        reg_fee: "",
        duration: "", durationType: "",
    })
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchCollage()
    }, [])

    function fetchCollage() {
        axiosInstance({
            method: 'GET',
            url: '/collage'
        })
            .then((res) => {
                console.log('res :>> ', res);
                setCollages(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    const validateForm = () => {
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
        if (!event.reg_fee || event.reg_fee < 0) {
            newErrors.reg_fee = "Enter valid registration fee.";
            setEvent({
                ...event,
                reg_fee: 0
            });
        }
        if (event.date && event.registration_deadline && event.registration_deadline > event.date)
            newErrors.registration_deadline = "Enter valid event date.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


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
        setEvent({
            title: "",
            description: "",
            type: "",
            date: "",
            time: "",
            collageId: "",
            seat: "",
            registration_deadline: "",
            reg_fee: "",
            duration: "", durationType: "",
        })
        setErrors({});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const valid = validateForm();
        if (!valid) return;
        setSubmitting(true);
        const payload = {
            title: event.title,
            description: event.description,
            type: event.type,
            date: event.date,
            time: event.time,
            collageId: event.collageId,
            seat: event.seat,
            registration_deadline: event.registration_deadline,
            fee: event.reg_fee,
            duration: `${event.duration} ${event.durationType}`,
        }

        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/event',
                data: payload
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    toast.success(res?.data?.message || 'Event created successfully')
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message || 'Error in creating event')
                }),
            {
                pending: 'Creating Event..'
            }
        )

        setEvent({
            title: "",
            description: "",
            type: "",
            date: "",
            time: "",
            collageId: "",
            seat: "",
            registration_deadline: "",
            reg_fee: "",
            duration: "", durationType: "",
        })
        setSubmitting(false);
    }

    return (
        <div className='w-full min-h-[90vh] flex items-center justify-center my-5'>
            <div className='border shadow-xl bg-gradient-to-tr from-blue-100 to-purple-100 w-full md:w-[60%] px-6 py-8 rounded-xl'>

                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create New Event</h1>
                    <div className="w-24 h-1 bg-violet-500 mx-auto rounded-full"></div>
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
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
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
                        <div className="grid grid-cols-3 gap-4">
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

                            <div className="md:col-span-2">
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
                                    name="reg_fee"
                                    value={event.reg_fee}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                                    min="0"
                                />
                                {errors.reg_fee && (
                                    <p className="text-sm text-red-600 mt-1">{errors.reg_fee}</p>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={submitting}
                            className="flex-1 bg-gray-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-600 focus:outline-none transition-all duration-300 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader size={20} className="animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Event'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}