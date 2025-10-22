import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-2 py-3 text-gray-400 bg-gray-800 flex flex-col items-center gap-3">
      {/* Top Links */}
      <div className="text-sm sm:text-base flex flex-wrap justify-center gap-6">
        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/about" className="hover:text-white">About</Link>
        <Link to="/contact" className="hover:text-white">Contact</Link>
        <Link to="/admin/event" className="hover:text-white">Admin</Link>
      </div>

      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-10 h-10"
        />
      </div>

      {/* Copyright */}
      <p className="text-xs sm:text-sm text-center text-gray-400">
        © {new Date().getFullYear()} — All rights reserved by{" "}
        <span className="italic text-white">PlanIt</span>
      </p>
    </footer>
  );
}
