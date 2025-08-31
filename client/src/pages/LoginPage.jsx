import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';

// --- SVG Icons ---
// A simple, modern logo SVG
const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// A generic user profile icon
const UserProfileIcon = () => (
    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    </div>
);


export default function LoginPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // In a real app, you would handle login logic here.
    console.log("Login form submitted.");
    // For demonstration, we'll just show an alert substitute.
    const messageBox = document.getElementById('message-box');
    if(messageBox) {
        messageBox.innerText = "Login functionality is for demonstration.";
        messageBox.classList.remove('opacity-0');
        setTimeout(() => messageBox.classList.add('opacity-0'), 3000);
    }
  };


  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden md:grid md:grid-cols-2">
          
          {/* Column 1: Image */}
          <div className="hidden md:block">
            <img 
              className="w-full h-full object-cover" 
              src="https://placehold.co/800x800/000000/FFFFFF?text=Welcome\nBack"
              alt="Promotional background image showing a modern workspace"
            />
          </div>

          {/* Column 2: Login Form */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Member Login</h1>
            <p className="text-gray-400 mb-8">Access your dashboard by signing in.</p>
            
            <form onSubmit={handleFormSubmit}>

              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-shadow duration-200 placeholder-gray-400"
                  placeholder="Enter your full name" 
                  required 
                />
              </div>

              <div className="mb-8">
                <label htmlFor="appId" className="block mb-2 text-sm font-medium text-gray-300">Application ID</label>
                <input 
                  type="text" 
                  id="appId" 
                  name="appId" 
                  className="bg-gray-700 border border-gray-600 text-white text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition-shadow duration-200 placeholder-gray-400"
                  placeholder="e.g., APP-12345678"
                  required 
                />
              </div>
              
              
              <button 
                type="submit" 
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-semibold rounded-lg text-lg px-5 py-4 text-center transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </button>
            </form>

            <div className="text-center text-gray-500 mt-8 text-sm">
              &copy; 2024 SecureApp. All Rights Reserved.
            </div>
          </div>
        </div>
      </main>
      
      {/* A simple message box for feedback instead of alert() */}
      <div id="message-box" className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg opacity-0 transition-opacity duration-300">
        Message
      </div>
    </div>
  );
}
