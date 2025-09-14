import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Star, Calendar, Users, Wifi, Car, Utensils, Waves } from 'lucide-react';

const BestStayHotels = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  const hotels = [
    {
      id: 1,
      name: "Taj Mahal Palace",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop&crop=center",
      description: "Iconic luxury hotel overlooking the Gateway of India with unparalleled heritage and world-class amenities.",
      rating: 5,
      priceRange: "₹25,000 - ₹45,000",
      amenities: ["Free WiFi", "Spa", "Pool", "Restaurant"]
    },
    {
      id: 2,
      name: "Oberoi Udaivilas",
      location: "Udaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center",
      description: "A fairy-tale palace hotel on Lake Pichola's banks, offering royal splendor and breathtaking lake views.",
      rating: 5,
      priceRange: "₹30,000 - ₹60,000",
      amenities: ["Lake View", "Spa", "Fine Dining", "Butler Service"]
    },
    {
      id: 3,
      name: "ITC Grand Chola",
      location: "Chennai, Tamil Nadu",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop&crop=center",
      description: "South India's largest luxury hotel, inspired by Chola architecture with modern sophistication.",
      rating: 5,
      priceRange: "₹15,000 - ₹35,000",
      amenities: ["Business Center", "Multiple Restaurants", "Spa", "Pool"]
    },
    {
      id: 4,
      name: "Aman-i-Khas",
      location: "Ranthambore, Rajasthan",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      description: "Luxury tented camp near Ranthambore National Park, perfect for wildlife enthusiasts seeking comfort.",
      rating: 4,
      priceRange: "₹40,000 - ₹80,000",
      amenities: ["Safari Tours", "Spa", "Fine Dining", "Nature Walks"]
    },
    {
      id: 5,
      name: "The Leela Palace",
      location: "New Delhi, Delhi",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center",
      description: "Majestic luxury hotel in Chanakyapuri, blending royal Indian hospitality with contemporary elegance.",
      rating: 5,
      priceRange: "₹20,000 - ₹40,000",
      amenities: ["Rooftop Restaurant", "Spa", "Garden", "Concierge"]
    },
    {
      id: 6,
      name: "Wildflower Hall",
      location: "Shimla, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop&crop=center",
      description: "Luxury mountain retreat in the Himalayas offering stunning valley views and pristine natural beauty.",
      rating: 4,
      priceRange: "₹18,000 - ₹35,000",
      amenities: ["Mountain View", "Spa", "Adventure Sports", "Nature Trails"]
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        } transition-colors duration-200`}
      />
    ));
  };

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      "Free WiFi": <Wifi size={14} />,
      "Spa": <Waves size={14} />,
      "Restaurant": <Utensils size={14} />,
      "Pool": <Waves size={14} />,
      "Business Center": <Users size={14} />,
      "Concierge": <Users size={14} />,
    };
    return iconMap[amenity] || <Star size={14} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Best Stay Hotels <span className="text-orange-600">In<span className="text-white">d</span><span className="text-green-600">ia</span></span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover India's most luxurious and iconic hotels, where heritage meets hospitality and every stay becomes an unforgettable experience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              ref={el => cardRefs.current[index] = el}
              data-card-id={hotel.id}
              className={`group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden transform ${
                visibleCards.has(hotel.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              } hover:scale-105 hover:-translate-y-2`}
              style={{
                transitionDelay: visibleCards.has(hotel.id) ? `${index * 150}ms` : '0ms'
              }}
            >
              {/* Hotel Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  {renderStars(hotel.rating)}
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
                  <MapPin size={14} className="text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">{hotel.location}</span>
                </div>
              </div>

              {/* Hotel Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-blue-600 transition-colors">
                  {hotel.name}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price and Booking */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-100 uppercase tracking-wide">Per Night</p>
                    <p className="text-lg font-bold text-yellow-500">{hotel.priceRange}</p>
                  </div>
                  
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              Ready for Your Dream Stay?
            </h2>
            <p className="text-gray-200 mb-6">
              Experience the finest hospitality India has to offer. Book your perfect getaway today!
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Explore More Hotels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestStayHotels;