import React from "react";
import tajmahal from "../assets/tajmahal.png";
import destinations from "../data/destinations.json";
import { MapPin, Search, User, ShieldAlert, AlertTriangle, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import TourGuideCard from "./tourguides";

const DashboardPage = () => {
  const handleclick = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [userdata,setUserdata]=useState({})
  const [loc1,setloc1]=useState('')
  const [loc2,setloc2]=useState('')
  useEffect(() => {
    if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //console.log("Permission granted ✅");
      //console.log("Latitude:", position.coords.latitude);
      //console.log("Longitude:", position.coords.longitude);
      setloc1(position.coords.latitude)
      setloc2(position.coords.longitude)
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        //console.log("User denied the request ❌");
      } else {
        //console.log("Error:", error.message);
      }
    }
  );
} else {
  //console.log("Geolocation not supported in this browser.");
}
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      handleConfirmEmergency();
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleEmergencyClick = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/userdata/fethalldata`
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'accessToken': localStorage.getItem('accessToken')
      },
    })
    const data = await res.json()
    //console.log(data)
    setUserdata(data.message)
    setShowModal(true);
  };
  const handleCancelEmergency = () => {
    setShowModal(false);
    setCountdown(null);
  };
  const handleConfirmEmergency = async() => {
    setIsEmergencyActive(true);
    setShowModal(false);
    setCountdown(null);
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v3/sendalert/sendsms`
    const res= await fetch(url,{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({
        phoneno:userdata.ownphno,
        name:userdata.fullname,
        location1:loc1,
        location2:loc2
      })

    })
    const data= await res.json()
    //console.log(data)
    // Simulate emergency service activation
    // alert('🚨 Emergency services have been contacted!\n\n📞 Calling: 112 (Emergency)\n📍 Location shared with authorities\n📱 Emergency contacts notified');
    setTimeout(() => setIsEmergencyActive(false), 5000);
  };

  const startCountdown = () => {
    setCountdown(5);
  };

  return (

    <main className="w-full min-h-screen bg-gray-50">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={tajmahal}
            alt="India"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/70 via-black/30 to-green-600/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
            Discover <span className="text-orange-400">Incredible India</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Explore ancient temples, vibrant cultures, majestic palaces – your
            unforgettable journey through India starts here.
          </p>

          {/* Search & Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4" style={{ flexDirection: "column" }}>
            <a onClick={(e) => {
              e.preventDefault(); // Prevent default anchor jump
              handleclick('#allsopt');
            }}><button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition">
                <MapPin size={20} /> Explore Destinations
              </button></a>
            <button onClick={handleEmergencyClick} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:to-red-500 hover:from-red-700 transition cursor-pointer">
              <ShieldAlert size={20} /> Emergency SOS
            </button>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl p-8 max-w-md w-11/12 text-center shadow-2xl animate-in zoom-in duration-300">
                {/* Warning Icon */}
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <AlertTriangle size={40} className="text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency SOS</h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Are you sure you want to activate Emergency SOS? This will immediately contact emergency services and your emergency contacts.
                </p>

                {/* Emergency Info */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Phone size={16} className="text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Emergency Numbers</span>
                  </div>
                  <div className="text-sm text-yellow-700">
                    <div>Police: 100 | Fire: 101 | Ambulance: 108</div>
                    <div className="mt-1">Universal Emergency: 112</div>
                  </div>
                </div>

                {/* Countdown Display */}
                {countdown !== null && (
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-red-500 mb-2">
                      Auto-activating in: {countdown}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Modal Buttons */}
                <div className="flex flex-col md:flex-row gap-3 justify-center">
                  {countdown === null ? (
                    <>
                      <button
                        onClick={startCountdown}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg min-w-32"
                      >
                        Activate SOS
                      </button>
                      <button
                        onClick={handleCancelEmergency}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg min-w-32"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleConfirmEmergency}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg min-w-32 animate-pulse"
                      >
                        Activate Now
                      </button>
                      <button
                        onClick={handleCancelEmergency}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg min-w-32"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Your location will be shared with emergency services
                </div>
              </div>
            </div>
          )}

          {/* Emergency Active Indicator */}
          {isEmergencyActive && (
            <div className="fixed top-32 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse z-40">
              🚨 Emergency Active
            </div>
          )} 
          {/* Stats */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 md:gap-12 text-lg font-semibold">
            {[
              { num: "28", label: "States & UT" },
              { num: "1.4B", label: "People" },
              { num: "22", label: "Languages" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg"
              >
                <span className="block text-2xl md:text-3xl">{stat.num}</span>
                <span className="text-gray-200">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section id="allsopt" className="py-12 px-6  mx-auto bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Top Destinations in <span className="text-orange-600">In<span className="text-white">d</span><span className="text-green-600">ia</span></span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-gray-800 rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              {/* Image & Overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-2xl"></div>
                <div className="absolute top-3 left-3 flex items-center gap-2 text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                  <MapPin size={16} /> {dest.temp}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white group-hover:text-orange-600 transition">
                    {dest.name}
                  </h3>
                  <span className="text-gray-400 flex items-center text-sm gap-1">
                    <User size={16} /> {dest.subtitle}
                  </span>
                </div>

                <p className="mt-2 text-gray-300 text-sm leading-relaxed">
                  {dest.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {dest.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full hover:bg-green-500 hover:text-white transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <TourGuideCard/>
    </main>
  );
};

export default DashboardPage;
