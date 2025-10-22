import React from "react";
import { Link } from "react-router-dom";

export default function AdminFooter() {
  return (
    <footer className="px-2 py-2 text-gray-400 bg-gray-800 flex flex-col items-center gap-2">
      {/* Top Links */}
      <div className="text-xs sm:text-sm flex flex-wrap justify-center gap-6">
        <Link to="/about" className="hover:text-white">About</Link>
        <Link to="/job" className="hover:text-white">Job</Link>
        <Link to="/contact" className="hover:text-white">Contact</Link>
        <Link to="/" className="hover:text-white">Home</Link>
      </div>

      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-8 h-8"
        />
      </div>

      {/* Copyright */}
      <p className="text-xs text-center text-gray-400">
        © {new Date().getFullYear()} — All rights reserved by{" "}
        <span className="italic text-white">PlanIt</span>
      </p>
    </footer>
  );
}
