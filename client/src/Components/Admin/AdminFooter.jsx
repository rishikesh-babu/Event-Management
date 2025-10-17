import React from 'react';
import { Link } from 'react-router-dom'; // 👈 FIX 1: Import Link

export default function AdminFooter() {
    return (
        <footer className="bg-gray-800 text-gray-400 py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                
                {/* 👈 FIX 2: Links placed in a centered, spaced-out container */}
                <div className="flex justify-center space-x-6 mb-4 text-sm"> 
                    <Link to="/" className="hover:text-white">
                        Home
                    </Link>
                    <Link to="/about" className="hover:text-white">
                        About Us
                    </Link>
                    <Link to="/contact" className="hover:text-white">
                        Contact Us
                    </Link>
                </div>

                {/* Copyright/Branding */}
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} PlanIt Admin Dashboard - All Rights Reserved.
                </p>
                
            </div>
        </footer>
    );
}