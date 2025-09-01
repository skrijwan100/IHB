import React from "react";
import tajmahal from "../assets/tajmahal.png";
import destinations from "../data/destinations.json";
import { MapPin, Search, User } from "lucide-react";

const DashboardPage = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50">
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
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition">
              <MapPin size={20} /> Explore Destinations
            </button>

            <div className="relative w-full sm:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search places..."
                className="pl-10 pr-4 py-3 w-full rounded-xl text-white shadow-md outline-none border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 md:gap-12 text-lg font-semibold">
            {[
              { num: "28", label: "States & UT" },
              { num: "40+", label: "UNESCO Sites" },
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
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Top Destinations in <span className="text-orange-600">India</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition duration-300"
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
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition">
                    {dest.name}
                  </h3>
                  <span className="text-gray-500 flex items-center text-sm gap-1">
                    <User size={16} /> {dest.subtitle}
                  </span>
                </div>

                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {dest.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {dest.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full hover:bg-orange-500 hover:text-white transition"
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
    </main>
  );
};

export default DashboardPage;
