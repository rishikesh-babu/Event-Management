import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosInstance";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

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

  // 🖼️ Handle image change
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // preview the selected image
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Profile
        </h1>

        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {userDetails && (
          <div className="flex flex-col items-center gap-4">
            {/* 👇 Profile Picture + Upload Line */}
            <div className="flex flex-col items-center gap-2">
              <img
  src={
    selectedImage
      ? selectedImage
      : "/userprofilepic.jpg" // path relative to /public folder
  }
  alt="User Avatar"
  className="w-24 h-24 rounded-full border border-gray-300 object-cover"
/>


              {/* Upload Photo Button */}
              <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* User Info */}
            <div className="text-center">
              <h2 className="text-xl font-medium text-gray-800">
                {userDetails?.name || "No Name"}
              </h2>
              <p className="text-gray-500">{userDetails?.email}</p>
              <p className="text-sm text-gray-500 capitalize">
                Role: {userDetails?.role || "User"}
              </p>
              <p className="text-sm text-gray-500">
                Joined:{"October 2,2025"}
                
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Edit Profile
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
