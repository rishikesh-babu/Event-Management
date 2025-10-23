import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosInstance";

export default function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    console.log('userDetails :>> ', userDetails);

    function formatDate(dateStr) {

        if (!dateStr) {
            return "Date Not Available";
        }


        const date = new Date(dateStr)

        if (isNaN(date.getTime())) {
            return "Invalid date format";
        }

        const day = date.toLocaleDateString("en-US", { weekday: "long" })
        const dayNum = date.getDate().toString()
        const month = date.toLocaleDateString("en-US", { month: "long" })
        const year = date.getFullYear().toString()

        const result = [day, dayNum, month, year]
        return result
    }

    function fetchUserDetails() {
        setLoading(true);
        axiosInstance({
            method: "GET",
            url: "/user",
        })
            .then((res) => {
                setUserDetails(res?.data?.data);
            })
            .catch((err) => {
                console.log("Error fetching user details:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="py-10 min-h-[50vh] flex justify-center items-center border">
            <div className="p-6 w-full max-w-md bg-white rounded-lg shadow-lg">
                <h1 className="mb-6 text-3xl font-bold text-gray-800 text-center border-b pb-2">
                    Profile Details
                </h1>

                {loading && userDetails === null && (
                    <div className="flex justify-center items-center">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                )}

                {(!loading || userDetails !== null) && (
                    <div className="flex flex-col gap-6"> {/* Main card content container */}
                        {/* Profile Picture and Primary User Info (now side-by-side) */}
                        <div className="flex items-start gap-6 w-full"> {/* Changed to flex row */}
                            {/* Profile Picture (Left) */}
                            <div className="flex-shrink-0"> {/* Prevents picture from shrinking */}
                                <img
                                    src="/Profile.jpg"
                                    alt="User Avatar"
                                    className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-md object-cover"
                                />
                            </div>

                            <div className="ml-8 mt-4">
                                <div className="flex-grow text-left"> {/* Allows text to take available space */}
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                        {userDetails?.name || "No Name Provided"}
                                    </h2>
                                    <p className="text-md text-indigo-600 font-medium">{userDetails?.email || "No Email"}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Joined on: <span>{formatDate(userDetails?.created_at)[1]} </span>
                                        <span>{formatDate(userDetails?.created_at)[2]} </span>
                                        <span>{formatDate(userDetails?.created_at)[3]}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional User Info*/}
                        <div className="w-full pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">More Information</h3>
                            <div className="space-y-3">

                                {/* Department */}
                                <div className="flex justify-between items-center gap-4 border-b border-dashed pb-2">
                                    <span className="text-gray-600 font-medium">Department:</span>
                                    <span className="text-gray-800 font-normal">{userDetails?.department || "N/A"}</span>
                                </div>

                                {/* Phone */}
                                <div className="flex justify-between items-center border-b border-dashed pb-2">
                                    <span className="text-gray-600 font-medium">Phone:</span>
                                    <span className="text-gray-800 font-normal">{userDetails?.phone || "N/A"}</span>
                                </div>

                                {/* Register Number */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Reg. Number:</span>
                                    <span className="text-gray-800 font-normal">{userDetails?.register_number || "N/A"}</span>
                                </div>

                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
