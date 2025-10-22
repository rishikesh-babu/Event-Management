import React from "react";
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="py-6 text-white bg-gray-800 flex flex-col justify-between gap-4">
            {/* Top Links */}
            <div className="text-sm text-nowrap flex justify-around">
                <Link to="/" className="hover:text-white">
                    Home
                </Link>
                <Link to="/about" className="hover:text-white">
                    About Us
                </Link>
                <Link to="/contact" className="hover:text-white">
                    Contact Us
                </Link>
                <Link to="/admin/login" className="hover:text-white">
                    Admin Login
                </Link>
            </div>

            {/* Logo (optional placeholder) */}
            <div className="flex justify-center ">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-12 h-12"
                />
            </div>

            {/* Copyright */}
            <p className="text-center text-sm text-gray-400">
                Copyright © 2025 - All rights reserved by <span className="italic">PlanIt</span>
            </p>
        </footer>
    );
}
