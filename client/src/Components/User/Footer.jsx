import React from "react";
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-[#121826] text-gray-300 py-6">
      {/* Top Links */}
      <div className="flex justify-center space-x-6 mb-4 text-sm">
   <Link to="/" className="hover:text-white">
          Home
        </Link>
        <Link to="/about" className="hover:text-white">
          About Us
          </Link>
        
        <Link to="/admin/login" className="hover:text-white">
          Admin Login
        </Link>
        <Link to="/contact" className="hover:text-white">
          Contact Us
        </Link>
      </div>

      {/* Logo (optional placeholder) */}
      <div className="flex justify-center mb-3">
        <img
          src=" /logo-placeholder.png"
        
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
