import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/userSlice";

export default function Navbar() {

  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [active, setActive] = useState(location.pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActive(location.pathname);
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const getClass = (path) =>
    path === active ? "text-blue-700 font-bold ring ring-blue-700 rounded-2xl px-4 py-2" : "text-gray-600 hover:text-blue-600 px-4 py-2";

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
          <Link to="/about" className={getClass("/about")}>
            About
          </Link>
          {user.isAdmin && (
            <Link to="/admin" className={getClass("/admin")}>
              Admin
            </Link>
          )}

          {user.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 px-4 py-2 ring ring-red-500 rounded-2xl hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
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
          <Link to="/about" className={getClass("/about")}>
            About
          </Link>
          {user.isAdmin && (
            <Link to="/admin" className={getClass("/admin")}>
              Admin
            </Link>
          )}

          {user.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 px-6 py-2 ring ring-red-500 rounded-2xl hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
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
