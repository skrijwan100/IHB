import React, { useState, useEffect, useRef } from 'react';
import { MapPin, User } from 'lucide-react';
import destinations from "../data/destinations.json";
const TopDestinations = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId);
            setVisibleCards(prev => new Set([...prev, cardId]));
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="allsopt" className="py-12 px-6 mx-auto bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
        Top Destinations in <span className="text-orange-600">In<span className="text-white">d</span><span className="text-green-600">ia</span></span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((dest, index) => (
          <div
            key={dest.id}
            ref={el => cardRefs.current[index] = el}
            data-card-id={dest.id}
            className={`bg-gray-800 rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 transform ${
              visibleCards.has(dest.id) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: visibleCards.has(dest.id) ? `${index * 150}ms` : '0ms'
            }}
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
  );
};

export default TopDestinations;