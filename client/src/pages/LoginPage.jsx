import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import userStore from "../store/userStore.js";
import { useNavigate } from "react-router-dom";
import avfar from "../assets/avter.png"

export default function LoginPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logIn, isLoading, error } = userStore();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [smartID, setSmartID] = useState("");

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         //console.log("Permission granted ✅");
  //       },
  //       (error) => {
  //         if (error.code === error.PERMISSION_DENIED) {
  //           //console.log("User denied the request ❌");
  //            alert('We need permission for your sefty.')
  //         } else {
  //           //console.log("Error:", error.message);
  //         }
  //       }
  //     );
  //   } else {
  //     //console.log("Geolocation not supported in this browser.");
  //   }
  // }, [])

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await logIn(smartID, fullname);
      // ✅ Navigate after successful login
      localStorage.setItem("ID",smartID)
      navigate("/dashboard");

      const messageBox = document.getElementById("message-box");
      if (messageBox) {
        messageBox.innerText = "Login successful!";
        messageBox.classList.remove("opacity-0");
        setTimeout(() => messageBox.classList.add("opacity-0"), 3000);
      }
    } catch (err) {
      const messageBox = document.getElementById("message-box");
      if (messageBox) {
        messageBox.innerText =
          error || "Login failed. Please check your details.";
        messageBox.classList.remove("opacity-0");
        setTimeout(() => messageBox.classList.add("opacity-0"), 3000);
      }
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="w-full max-w-7xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden md:grid md:grid-cols-2">
          {/* Column 1: Image */}
          <div className="hidden md:block">
            <img
              className="w-full h-full object-cover"
              src={avfar}
              alt="Promotional background image showing a modern workspace"
            />
          </div>

          {/* Column 2: Login Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Member Login
            </h1>
            <p className="text-gray-400 mb-8">
              Access your dashboard by signing in.
            </p>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-shadow duration-200 placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="appId"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Smart ID
                </label>
                <input
                  type="text"
                  id="appId"
                  name="appId"
                  value={smartID}
                  onChange={(e) => setSmartID(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-shadow duration-200 placeholder-gray-400"
                  placeholder="e.g., 0x892583A6C1589D7EEA90e98ba848bc311A43f672"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-semibold rounded-lg text-lg px-5 py-4 text-center transition-all duration-300 transform hover:scale-105"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="text-center text-gray-500 mt-8 text-sm">
              &copy; 2024 SecureApp. All Rights Reserved.
            </div>
          </div>
        </div>
      </main>

      {/* A simple message box for feedback instead of alert() */}
      <div
        id="message-box"
        className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg opacity-0 transition-opacity duration-300"
      >
        Message
      </div>
    </div>
  );
}
