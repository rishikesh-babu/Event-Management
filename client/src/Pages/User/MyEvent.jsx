import React, { useState, useEffect } from 'react'

export default function MyEvent() {
  
    const getStatusBorderClass = (status) => {
  switch (status) {
    case 'Upcoming':
    case 'Registered': // Treat Registered the same as Upcoming for visual emphasis
      return 'border-blue-500'; // Primary color for future/active events
    case 'Attended':
      return 'border-green-500'; // Green for successfully completed/attended
    case 'Completed': // If you use 'Completed' instead of 'Attended'
      return 'border-green-500';
    case 'Missed':
      return 'border-red-500'; // Red/Warning for missed events
    default:
      return 'border-gray-300'; // Default neutral color
  }
};

    const dummyRegisteredEvents = [
    {
      id: 1,
      title: 'Advanced React Hooks Workshop',
      date: 'Oct 25, 2025',
      time: '10:00 AM - 1:00 PM',
      location: 'Auditorium 101',
      status: 'Registered', // Status will change to 'Attended' or 'Missed' after the event
      isCertificateAvailable: false,
    },
    {
      id: 2,
      title: 'Annual Research Conference',
      date: 'Nov 10, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Main Convention Hall',
      status: 'Upcoming',
      isCertificateAvailable: false,
    },
    {
      id: 3,
      title: 'Student Entrepreneurship Summit',
      date: 'Sept 1, 2025',
      time: '2:00 PM - 4:00 PM',
      location: 'Online (Zoom Link)',
      status: 'Attended',
      isCertificateAvailable: true,
    },
  ];

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // --- Data Fetching Logic (Replace with your actual API call) ---
    // In a real application, you would fetch data here based on the logged-in user ID.
    const t = setTimeout(() => {
      setRegisteredEvents(dummyRegisteredEvents);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  // Function to handle certificate download (placeholder)
  const handleCertificateDownload = (eventId) => {
    alert(`Downloading certificate for Event ID: ${eventId}`);
    // Implement API call to fetch certificate PDF/image
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-blue-600">Loading your registered events...</p>
      </div>
    );
  }

  return (
    <div className="my-events-container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-500 inline-block pb-1">
          My Registered Events
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A list of all events you have successfully registered for.
        </p>
      </div>

      {/* No Events Message */}
      {registeredEvents.length === 0 && (
        <div className="text-center p-10 bg-white rounded-lg shadow-lg border-l-4 border-yellow-500">
          <p className="text-xl text-gray-700 font-medium">
            You haven't registered for any events yet.
          </p>
          <button 
            onClick={() => window.location.href='/events'} 
            className="mt-5 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Browse Events
          </button>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-6">
        {registeredEvents.map((event) => (
          <div 
            key={event.id} 
            className={'event-card bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-xl transition duration-300 border-l-8 ${getStatusBorderClass(event.status)}'}>
            
            {/* Event Details */}
            <div className="details mb-4 md:mb-0 md:w-3/5">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{event.title}</h2>
              <p className="text-gray-600">
                <span className="font-semibold">Date:</span> {event.date} at {event.time}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span> {event.location}
              </p>
            </div>
            
            {/* Status and Action Buttons */}
            <div className="actions md:w-2/5 flex flex-col sm:flex-row items-start md:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              
              {/* Status Badge */}
              <span className={`px-3 py-1 text-sm font-semibold rounded-full min-w-[100px] text-center
                ${event.status === 'Registered' ? 'bg-blue-100 text-blue-800' : 
                  event.status === 'Upcoming' ? 'bg-indigo-100 text-indigo-800' :
                  event.status === 'Attended' ? 'bg-green-100 text-green-800' : 
                  'bg-gray-100 text-gray-600'}
              `}>
                {event.status}
              </span>

              {/* Action Button */}
              {event.isCertificateAvailable ? (
                <button
                  onClick={() => handleCertificateDownload(event.id)}
                  className="bg-yellow-500 text-blue-900 font-medium py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-200 shadow-md"
                >
                  Download Certificate
                </button>
              ) : (
                <button
                  disabled={event.status !== 'Registered'}
                  className={`py-2 px-4 rounded-lg font-medium 
                    ${event.status === 'Registered' 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                    transition duration-200 shadow-md
                  `}
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
