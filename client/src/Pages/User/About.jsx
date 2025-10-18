import React from 'react'

export default function About() {
  // Define variables for placeholders to make them easy to update
  const companyName = "PlanIt"; 
  const founderName = "The Dev Team";
  const foundedYear = "2023";
  const eventCount = "20+";

  return (
    // Outer container for padding and background
    <div className="bg-gray-50 min-h-screen py-10">
      
      <div className="about-us-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Section: Introduction */}
        <header className="p-10 mb-12 text-center text-white bg-blue-700 rounded-xl shadow-lg">
          <h1 className="mb-3 font-extrabold text-4xl sm:text-5xl">Welcome to {companyName}</h1>
          <p className="tagline text-xl font-light opacity-90">Crafting unforgettable moments, one event at a time.</p>
        </header>
        
        <hr className="my-10 border-gray-300" />

        {/* 2. Our Story/Mission */}
        <section className="story-mission-section py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Story & Mission</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
              {/* Story */}
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-yellow-400">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Our Journey</h3>
                  <p className="story-text text-gray-600 leading-relaxed">
                    Founded in **{foundedYear}** by **{founderName}**, {companyName} was built on the belief that every celebration deserves to be seamless, stunning, and stress-free. We noticed a need for a truly **personalized, automated approach** to event management, particularly in educational institutions, and that's exactly what our system delivers.
                  </p>
              </div>

              {/* Mission */}
              <div className="mission-vision bg-white p-8 rounded-xl shadow-md border-t-4 border-blue-500">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To **transform your event vision into a magnificent reality** using technology, ensuring every detail—from registration limits to certificate delivery—is **executed flawlessly** and exceeds expectations for both **administrators** and **participants**.
                  </p>
              </div>
          </div>
        </section>

        <hr className="my-10 border-gray-300" />

        {/* 3. Why Choose Us (Core Values/Expertise) */}
        <section className="why-us-section py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Why Partner With Us?</h2>
          <div className="values-grid grid md:grid-cols-3 gap-8">
            
            <div className="value-card text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">✨ Automated Service</h3>
              <p className="text-gray-600">We eliminate manual bottlenecks. Our system manages seat limits, check-ins, and certificate generation, making your job effortless.</p>
            </div>
            
            <div className="value-card text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">🤝 Proven Reliability</h3>
              <p className="text-gray-600">With **{eventCount}** successful events managed, our meticulous planning process and secure platform guarantee peace of mind and accurate records.</p>
            </div>
            
            <div className="value-card text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">💡 Institutional Focus</h3>
              <p className="text-gray-600">Built specifically for educational settings, our features directly address the unique needs of college and university event administration.</p>
            </div>
          </div>
        </section>

        <hr className="my-10 border-gray-300" />

        <section className="team-section py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Dedicated Team</h2>
          <p className="text-center text-gray-600 mb-8">Behind every perfect event is a passionate team of planners, designers, and logistical experts.</p>
          
          <div className="team-member-list flex justify-center flex-wrap gap-6">
            
            <div className="team-member-card w-full sm:w-64 bg-white p-6 rounded-xl shadow-lg text-center border-b-4 border-blue-400">
              <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 font-bold"><img className='rounded-full' src="\Rishikesh-Babu.jpg" alt="" /></div>
              <h4 className="text-xl font-semibold text-gray-800">[Rishikesh Babu]</h4>
              <p className="role text-blue-600 font-medium">Backend Developer</p>
            </div>
            
             <div className="team-member-card w-full sm:w-64 bg-white p-6 rounded-xl shadow-lg text-center border-b-4 border-blue-400">
              <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 font-bold">Photo</div>
              <h4 className="text-xl font-semibold text-gray-800">[Savio Shaju]</h4>
              <p className="role text-blue-600 font-medium">Frontend Developer</p>
            </div>

            <div className="team-member-card w-full sm:w-64 bg-white p-6 rounded-xl shadow-lg text-center border-b-4 border-blue-400">
              <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 font-bold">Photo</div>
              <h4 className="text-xl font-semibold text-gray-800">[Sulfa Saji]</h4>
              <p className="role text-blue-600 font-medium">Frontend Developer</p>
            </div>

            <div className="team-member-card w-full sm:w-64 bg-white p-6 rounded-xl shadow-lg text-center border-b-4 border-blue-400">
              <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 font-bold"><img className='rounded-full' src="\Renet-Reji.jpg" alt="" /></div>
              <h4 className="text-xl font-semibold text-gray-800">[Renet Mammen Reji]</h4>
              <p className="role text-blue-600 font-medium">UI/UX Designer</p>
            </div>
            
          </div>
        </section>

        <hr className="my-10 border-gray-300" />

        {/* 5. Call to Action */}
        <section className="cta-section bg-blue-50 p-10 rounded-xl text-center border-2 border-dashed border-blue-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Automate Your Event Workflow?</h2>
          <p className="text-lg text-gray-600 mb-6">Let's discuss how our centralized platform can streamline your administration.</p>
          
          <button 
            onClick={() => window.location.href='/contact'} 
            className="cta-button bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold py-3 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
          >
            Get Started Today
          </button>
        </section>
        
      </div>
      
    </div>
  )
}