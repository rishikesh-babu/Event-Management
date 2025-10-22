import React from "react";
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="px-1 py-8 text-gray-400 bg-gray-800 flex flex-col justify-between gap-8">
            {/* Top Links */}
            <div className=" text-lg sm:text-xl text-nowrap flex justify-around sm:justify-center sm:gap-14">
                <Link to="/" className="hover:text-white">
                    Home
                </Link>
                <Link to="/about" className="hover:text-white">
                    About 
                </Link>
                <Link to="/contact" className="hover:text-white">
                    Contact
                </Link>
                <Link to="/admin/event" className="hover:text-white">
                    Admin Login
                </Link>
            </div>

            {/* Logo (optional placeholder) */}
            <div className="flex justify-center ">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="size-24 "
                />
            </div>

            {/* Copyright */}
            <p className=" text-lg sm:text-xl text-center text-wrap text-gray-400">
                Copyright &copy; {new Date().getFullYear()} - All rights reserved by <div className="italic">PlanIt</div>
            </p>
        </footer>
    );
}
