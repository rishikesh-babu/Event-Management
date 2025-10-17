import React, { useState } from "react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Message:", message);
    alert("Thank you for contacting us! We’ll get back to you soon.");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#121826] flex flex-col items-center justify-center text-gray-300 p-6">
      <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <label className="block mb-3">
          <span className="text-gray-200">Your Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-200">Your Message</span>
          <textarea
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white font-medium"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
