import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Star, Phone, Mail, Globe, Calendar, Award } from 'lucide-react';

const TourGuideCard = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [flippedCard, setFlippedCard] = useState(null);
    const [detiles, setDetils] = useState([]);
    const [visibleCards, setVisibleCards] = useState(new Set());
    const cardRefs = useRef([]);

    useEffect(() => {
        const fecthtourGuides = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/v5/tourguide/allTourGuides`,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const data = await response.json();
                setDetils(data.data || []);
            } catch (error) {
                console.error('Error fetching tour guides:', error);
                // Fallback demo data
                setDetils([
                    {
                        _id: '1',
                        fullName: "Sayan Ali",
                        email: "rijwansk329@gmail.com",
                        phoneNumber: "9966332255",
                        tourLocations: ["kolkata", "bardhaman"],
                        languagesSpoken: ["English", "Bengali"],
                        experience: "0",
                        rating: 0,
                        createdAt: { $date: "2025-09-13T14:32:27.191Z" }
                    }
                ]);
            }
        }
        fecthtourGuides();
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cardId = entry.target.dataset.cardId;
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
    }, [detiles]);

    const handleCardFlip = (cardId) => {
        setFlippedCard(flippedCard === cardId ? null : cardId);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                size={16}
                className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                    } transition-colors duration-200`}
            />
        ));
    };

    // Helper function to handle date formatting
    const formatDate = (dateObj) => {
        if (dateObj && dateObj.$date) {
            return new Date(dateObj.$date).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            });
        }
        return new Date(dateObj).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-800 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-12 text-white">
                    Professional Tour Guides
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {detiles.map((guide, index) => (
                        <div
                            key={guide._id}
                            ref={el => cardRefs.current[index] = el}
                            data-card-id={guide._id}
                            className={`relative perspective-1000 transition-all duration-700 transform ${
                                visibleCards.has(guide._id) 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-8'
                            }`}
                            style={{
                                transitionDelay: visibleCards.has(guide._id) ? `${index * 200}ms` : '0ms'
                            }}
                            onMouseEnter={() => setHoveredCard(guide._id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div
                                className={`relative w-full h-96 transition-transform duration-700 transform-style-preserve-3d ${flippedCard === guide._id ? 'rotate-y-180' : ''
                                    }`}
                            >
                                {/* Front Side */}
                                <div className="absolute inset-0 w-full h-full backface-hidden">
                                    <div
                                        className={`bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full overflow-hidden transform ${hoveredCard === guide._id ? 'scale-105 -translate-y-2' : ''
                                            }`}
                                    >
                                        {/* Header with gradient */}
                                        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/10"></div>
                                            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
                                            <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-white/20 rounded-full animate-pulse delay-1000"></div>
                                        </div>

                                        {/* Avatar */}
                                        <div className="relative -mt-12 flex justify-center">
                                            <div className="relative">
                                                <img
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                                                    alt={guide.fullName}
                                                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover animate-fadeIn"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-bounce"></div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-6 py-4 space-y-4">
                                            <div className="text-center">
                                                <h3 className="text-2xl font-bold text-white mb-1">
                                                    {guide.fullName}
                                                </h3>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                                                    <MapPin size={18} className="text-blue-400" />
                                                    <span className="text-sm">
                                                        {guide.tourLocations.filter(loc => loc.trim()).slice(0, 2).join(', ')}
                                                        {guide.tourLocations.filter(loc => loc.trim()).length > 2 && ` +${guide.tourLocations.filter(loc => loc.trim()).length - 2} more`}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors">
                                                    <Globe size={18} className="text-green-400" />
                                                    <span className="text-sm">
                                                        {guide.languagesSpoken.join(', ')}
                                                    </span>
                                                </div>

                                                <div className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors">
                                                    <Award size={18} className="text-purple-400" />
                                                    <span className="text-sm">
                                                        {guide.experience} {guide.experience === '1' ? 'Year' : 'Years'} Experience
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    onClick={() => handleCardFlip(guide._id)}
                                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium"
                                                >
                                                    View Contact Info
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Side */}
                                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                                    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg h-full overflow-hidden">
                                        {/* Header */}
                                        <div className="h-24 bg-gradient-to-r from-purple-600 to-blue-500 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/10"></div>
                                            <div className="flex items-center justify-center h-full">
                                                <h3 className="text-white text-xl font-bold">Contact Information</h3>
                                            </div>
                                        </div>

                                        {/* Contact Details */}
                                        <div className="px-6 py-8 space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                                                    <Phone size={20} className="text-blue-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                                                        <p className="font-medium text-white">{guide.phoneNumber}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                                                    <Mail size={20} className="text-green-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                                                        <p className="font-medium text-white text-sm">{guide.email}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                                                    <Calendar size={20} className="text-purple-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase tracking-wide">Member Since</p>
                                                        <p className="font-medium text-white">
                                                            {formatDate(guide.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 space-y-3">
                                                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium">
                                                    Book a Tour
                                                </button>
                                                <button
                                                    onClick={() => handleCardFlip(guide._id)}
                                                    className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-medium"
                                                >
                                                    Back to Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .transform-style-preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
};

export default TourGuideCard;