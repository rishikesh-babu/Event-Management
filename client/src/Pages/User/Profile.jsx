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
        <div className="py-10 min-h-[80vh] flex justify-center items-center border">
            <div className="p-3 w-full max-w-md bg-white rounded-lg shadow-lg">
                <h1 className="mb-4 text-2xl font-semibold text-gray-800 text-center">
                    Profile
                </h1>

                {loading && <div className="loading loading-spinner loading-xl text-center">Loading...</div>}

                {!loading && userDetails && (
                    <div className="flex flex-col items-center gap-4">
                        {/* 👇 Profile Picture + Upload Line */}
                        <div className="flex flex-col items-center gap-2">
                            <img src="/Profile.jpg"
                                alt="User Avatar"
                                className="w-24 h-24 rounded-full border border-gray-300 object-cover"
                            />
                        </div>

                        {/* User Info */}
                        <div className="text-center">
                            <h2 className="text-xl font-medium text-gray-800">
                                {userDetails?.name || "No Name"}
                            </h2>
                            <p className="text-gray-500">{userDetails?.email}</p>
                            <p className="text-sm text-gray-500">
                                Joined on: <span>{formatDate(userDetails.created_at)[1]} </span>
                                           <span>{formatDate(userDetails.created_at)[2]} </span>
                                           <span>{formatDate(userDetails.created_at)[3]}</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
