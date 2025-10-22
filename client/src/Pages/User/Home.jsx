import React, { useEffect } from 'react'
import { Reveal, UpReveal } from '../../Animation/Animation';
import { Link } from 'react-router-dom';

export default function Home() {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    
    const systemName = 'EventManager';
    const teamMembers = ['Rishekesh Babu', 'Savio Shaju', 'Sulfa Saji', 'Renet Mammen Reji'];

    return (
        <div>
            {/* 1. Hero Section: Value Proposition & Call to Action */}
            <section className=" px-4 sm:px-6 lg:px-8 min-h-[70vh] bg-zinc-100 flex flex-col justify-center">
                <div className="max-w-6xl mx-auto mb-5 flex flex-col justify-between gap-8">
                    <Reveal className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                        Smart Event Management for Smarter Campuses
                    </Reveal>

                    <Reveal className="font-light text-justify text-xl md:text-4xl ">
                        {/* Automate event workflows for educational institutions with real-time capacity control, digital check-ins, and instant certificate generation. */}
                        Whether it’s a workshop, seminar, or cultural fest — plan, manage, and monitor everything from one place. Simple, fast, and reliable.
                    </Reveal>

                    <UpReveal className=" flex justify-center md:justify-start space-x-4">
                        <Link
                            to={'/event'}
                            className="py-1 px-3 sm:py-3 sm:px-8 font-bold text-center text-lg text-blue-900 bg-blue-400 sm:hover:bg-yellow-300 rounded-lg flex justify-center items-center transition duration-300 transform hover:scale-105 shadow-md "
                        >
                            View Upcoming Events
                        </Link>
                        <Link
                            to={'/login'}
                            className="py-2 px-4 sm:py-3 sm:px-8 font-bold text-lg text-blue-900 hover:text-blue-700 bg-pink-600 border rounded-lg flex justify-center items-center transition duration-300"
                        >
                            Login
                        </Link>
                    </UpReveal>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-6xl mx-auto h-px bg-gray-300 my-10"></div>

            {/* 2. Abstract/Problem & Solution Summary */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <Reveal className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Solution for Event Management</Reveal>

                    <div className="summary-grid grid md:grid-cols-2 gap-10">
                        <Reveal className="p-4 sm:p-8 bg-white rounded-xl shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] border-l-4 border-red-500">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">The Challenge in Existing Systems</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Event administration often relies on fragmented tools like Google Forms, which lead to **manual bottlenecks**. Current processes lack **real-time capacity enforcement**, require constant manual monitoring to stop registrations, and offer no integrated way to manage attendance or issue certificates. This results in unnecessary work and a poor experience.
                            </p>
                        </Reveal>

                        <Reveal className="p-4 sm:p-8 bg-white rounded-xl shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] border-l-4 border-green-500">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Introducing {systemName}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We propose a **centralized web-based platform** designed specifically to tackle these inefficiencies. Our system allows administrators to set **hard seat limits**, automatically stops registration when capacity is reached, provides participants with a seamless check-in process, and **auto-generates certificates** upon attendance.
                            </p>
                        </Reveal>

                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="max-w-6xl mx-auto h-px bg-gray-300 my-10"></div>

            {/* 3. Key Features/Benefits */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 ">
                <div className="mx-auto max-w-6xl min-h-[70vh]">
                    <Reveal className="text-3xl font-bold text-gray-800 mb-12 text-center">What Our System Automates</Reveal>

                    <div className="feature-cards-grid grid md:grid-cols-3 gap-8">
                        <UpReveal className=" p-6 border rounded-lg text-center shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] sm:shadow-xl sm:hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] sm:hover:scale-105 cursor-pointer transition duration-300">
                            <span className=" text-4xl mb-4 inline-block text-blue-500">⏱️</span>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Capacity Control</h4>
                            <p className="text-gray-600">Registrations are automatically closed when the event's designated seat limit is reached, eliminating manual intervention and over-registration.</p>
                        </UpReveal>

                        <UpReveal className=" p-6 border rounded-lg text-center shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] sm:shadow-xl sm:hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] sm:hover:scale-105 cursor-pointer transition duration-300">
                            <span className=" text-4xl mb-4 inline-block text-blue-500">✅</span>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Digital Attendance Tracking</h4>
                            <p className="text-gray-600">Registered participants can log in via the platform to securely mark their attendance, streamlining the check-in process and providing accurate records.</p>
                        </UpReveal>

                        <UpReveal className=" p-6 border rounded-lg text-center shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] sm:shadow-xl sm:hover:shadow-[0_0_20px_4px_rgba(0,0,0,0.2)] sm:hover:scale-105 cursor-pointer transition duration-300">
                            <span className="icon text-4xl mb-4 inline-block text-blue-500">🏆</span>
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">Auto-Generated Certificates</h4>
                            <p className="text-gray-600">The system automatically processes and issues personalized, digital certificates to all participants who successfully check in for the event.</p>
                        </UpReveal>

                    </div>
                </div>
            </section>

            {/* 4. Team Section */}
            <section className="team-section py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
                <div className="mx-auto max-w-4xl min-h-[50vh] flex flex-col justify-around items-center ">
                    <Reveal className="font-bold text-center text-3xl text-gray-800 mb-8">Meet the Project Team</Reveal>
                    <div className="team-list flex flex-wrap justify-center gap-4">
                        {/* Map through the teamMembers prop (or a hardcoded array) */}
                        {teamMembers && teamMembers.map((member, index) => (
                            <Reveal key={index} className="team-member-card bg-white py-2 px-6 rounded-full shadow-md hover:bg-blue-50 transition duration-200">
                                <p className="team-name text-gray-700 font-medium">{member}</p>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal className=" text-gray-500 mt-8 text-sm text-center italic ">
                        This system is a project developed to enhance the efficiency and user experience of event management within educational settings.
                    </Reveal>
                </div>
            </section>
        </div>
    )
}
