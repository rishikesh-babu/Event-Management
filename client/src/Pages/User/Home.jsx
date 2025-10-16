import React from 'react'

export default function Home() {
    // Define placeholders used in the JSX to avoid reference errors
    const systemName = 'EventManager';
    const teamMembers = ['Rishekesh Babu', 'Savio Shaju', 'Sulfa Saji', 'Renet Mammen Reji'];

    return (
        <div className="home-container bg-gray-50 min-h-screen">
      
      {/* 1. Hero Section: Value Proposition & Call to Action */}
      <section className="hero-section bg-blue-700 text-white py-20 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="hero-content md:w-3/5 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              Seamless Events, Smart Administration.
            </h1>
            <p className="tagline text-xl md:text-4xl font-light mb-8 opacity-90">
              Automate event workflows for educational institutions with real-time capacity control, digital check-ins, and instant certificate generation.
            </p>
            {/* <div className="hero-cta-group flex justify-center md:justify-start space-x-4">
              <button 
                onClick={() => window.location.href='/events'} 
                className="cta-primary bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
              >
                View Upcoming Events
              </button>
              <button 
                onClick={() => window.location.href='/admin/login'} 
                className="cta-secondary border border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Admin Login
              </button>
            </div> */}
          </div>
          {/* Optional: Add an illustration/image here for visual impact */}
          <div className="hidden md:block md:w-2/5 p-8">
            {/* <img src={HeroImage} alt="Event Dashboard Mockup" className="rounded-xl shadow-2xl" /> */}
          </div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gray-300 my-10"></div>

      {/* 2. Abstract/Problem & Solution Summary */}
      <section className="abstract-summary-section py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Solution for Event Management</h2>
          
          <div className="summary-grid grid md:grid-cols-2 gap-10">
            
            <div className="problem-statement bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">The Challenge in Existing Systems</h3>
              <p className="text-gray-600 leading-relaxed">
                Event administration often relies on fragmented tools like Google Forms, which lead to **manual bottlenecks**. Current processes lack **real-time capacity enforcement**, require constant manual monitoring to stop registrations, and offer no integrated way to manage attendance or issue certificates. This results in unnecessary work and a poor experience.
              </p>
            </div>
            
            <div className="solution-statement bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Introducing {systemName}</h3>
              <p className="text-gray-600 leading-relaxed">
                We propose a **centralized web-based platform** designed specifically to tackle these inefficiencies. Our system allows administrators to set **hard seat limits**, automatically stops registration when capacity is reached, provides participants with a seamless check-in process, and **auto-generates certificates** upon attendance.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto h-px bg-gray-300 my-10"></div>

      {/* 3. Key Features/Benefits */}
      <section className="features-section py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">What Our System Automates</h2>
          
          <div className="feature-cards-grid grid md:grid-cols-3 gap-8">
            
            <div className="feature-card p-6 border rounded-lg text-center hover:shadow-xl transition duration-300">
              <span className="icon text-4xl mb-4 inline-block text-blue-500">⏱️</span>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Capacity Control</h4>
              <p className="text-gray-600">Registrations are automatically closed when the event's designated seat limit is reached, eliminating manual intervention and over-registration.</p>
            </div>
            
            <div className="feature-card p-6 border rounded-lg text-center hover:shadow-xl transition duration-300">
              <span className="icon text-4xl mb-4 inline-block text-blue-500">✅</span>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Digital Attendance Tracking</h4>
              <p className="text-gray-600">Registered participants can log in via the platform to securely mark their attendance, streamlining the check-in process and providing accurate records.</p>
            </div>
            
            <div className="feature-card p-6 border rounded-lg text-center hover:shadow-xl transition duration-300">
              <span className="icon text-4xl mb-4 inline-block text-blue-500">🏆</span>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Auto-Generated Certificates</h4>
              <p className="text-gray-600">The system automatically processes and issues personalized, digital certificates to all participants who successfully check in for the event.</p>
            </div>

          </div>
        </div>
      </section>
      
      {/* 4. Team Section */}
      <section className="team-section py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet the Project Team</h2>
          <div className="team-list flex flex-wrap justify-center gap-4">
            {/* Map through the teamMembers prop (or a hardcoded array) */}
            {teamMembers && teamMembers.map((member, index) => (
              <div key={index} className="team-member-card bg-white py-2 px-6 rounded-full shadow-md hover:bg-blue-50 transition duration-200">
                <p className="team-name text-gray-700 font-medium">{member}</p>
              </div>
            ))}
          </div>
          <p className="project-note text-gray-500 mt-8 text-sm italic">
            This system is a project developed to enhance the efficiency and user experience of event management within educational settings.
          </p>
        </div>
      </section>
    </div>
  )
}
