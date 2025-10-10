import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../store/slice/userSlice";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function Navbar() {

  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [active, setActive] = useState(location.pathname);
  const [open, setOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(() => {
    setActive(location.pathname);
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(clearUserData());
  };

  const getClass = (path) =>
    path === active ? "text-blue-700 font-bold  rounded-2xl px-4 py-2 text-md md:text-lg" : "text-gray-700 hover:text-blue-600 trasition px-4 py-2 text-md md:text-lg ";

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center h-20 px-6">
        <div className="flex items-center gap-2">
          {/*logo*/}
        </div>

        <nav className="hidden sm:flex gap-8 items-center">
          <Link to="/" className={getClass("/")}>
            Home
          </Link>
          <Link to="/event" className={getClass("/event")}>
            Events
          </Link>
          {user.isAdmin && (
            <Link to="/admin" className={getClass("/admin")}>
              Admin
            </Link>
          )}

          {user.isLoggedIn ? (
            <div className="relative items-center">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="mt-1 rounded-full hover:bg-gray-100 transition"
              >
                <UserCircleIcon className="w-10 h-10 text-gray-600 hover:text-blue-600 transition" />
              </button>

              {profileDropdown && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-40 bg-white border rounded-b-lg shadow-lg flex flex-col py-2">
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdown(false)}
                    className={getClass("/profile")}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-blue-500 px-4 py-2 ring ring-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white"
            >
              Login
            </Link>
          )}
        </nav>

        <div className="sm:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-blue-700"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="sm:hidden absolute top-20 w-full flex flex-col items-center gap-y-6 py-6 bg-white  shadow-md">
          <Link to="/" className={getClass("/")}>
            Home
          </Link>
          <Link to="/event" className={getClass("/event")}>
            Events
          </Link>
          {user.isAdmin && (
            <Link to="/admin" className={getClass("/admin")}>
              Admin
            </Link>
          )}

          {user.isLoggedIn ? (
            <div className="w-full flex flex-col items-center gap-y-6 ">
              <Link to="/profile" className={getClass("/profile")}>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 px-6 py-2 ring ring-red-500 rounded-2xl hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-blue-600 px-6 py-2 ring ring-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white"
            >
              Login
            </Link>
          )}

        </nav>
      )}
    </header>
  );
}
