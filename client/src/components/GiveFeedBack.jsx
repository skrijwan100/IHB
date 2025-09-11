import React, { useState } from 'react';
import { MapPin, Star, User, Calendar, X, Send } from 'lucide-react';

const KashmirDetailPage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      date: "2 days ago",
      rating: 5,
      comment: "Absolutely breathtaking! The lakes are pristine and the mountain views are spectacular. A must-visit destination for nature lovers."
    },
    {
      id: 2,
      name: "Sarah Williams",
      date: "1 week ago",
      rating: 4,
      comment: "Beautiful location with stunning scenery. The ancient Greek connection is fascinating. Would recommend visiting during spring for the best experience."
    },
    {
      id: 3,
      name: "Amit Patel",
      date: "2 weeks ago",
      rating: 5,
      comment: "Kashmir truly is paradise on earth. The natural beauty is unmatched. The budget-friendly options make it accessible for everyone."
    },
    {
      id: 4,
      name: "Priya Sharma",
      date: "3 weeks ago",
      rating: 4,
      comment: "Loved the serene environment and crystal-clear lakes. The historical significance adds another layer to this amazing destination."
    },
    {
      id: 5,
      name: "Michael Chen",
      date: "1 month ago",
      rating: 5,
      comment: "The perfect blend of natural beauty and historical significance. The mountain reflections in the lake are mesmerizing!"
    }
  ]);

  const handleSubmitFeedback = () => {
    if (userName && userEmail && rating && feedbackText) {
      console.log(rating)
      const newFeedback = {
        id: feedbackList.length + 1,
        name: userName,
        date: "Just now",
        rating: rating,
        comment: feedbackText
      };
      setFeedbackList([newFeedback, ...feedbackList]);
      setShowFeedbackModal(false);
      setRating(0);
      setFeedbackText('');
      setUserName('');
      setUserEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-b from-cyan-600 to-blue-800">
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">17°</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-4xl font-bold text-white mb-2">Khasmir</h1>
          <div className="flex items-center gap-4">
            <span className="text-white">Nature</span>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
              One day budget: ₹1000
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">About Khasmir</h2>
          <p className="text-gray-700 mb-3">
            The Ancient Greeks called the region Kasperia, which has been identified with Kaspayros of 
            Hecataeus of Miletus (apud Stephanus of Byzantium) and Kaspatyros of Herodotus (3.102, 4.44). 
            Kashmir is also believed to be the country meant by Ptolemy's Kaspeiria.
          </p>
          <p className="text-gray-700">
            This stunning destination offers breathtaking mountain views, pristine lakes, and a rich 
            historical heritage that dates back to ancient times.
          </p>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Visitor Feedback</h3>
          
          {/* Feedback List */}
          <div className="space-y-4 mb-6">
            {feedbackList.map((feedback) => (
              <div key={feedback.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{feedback.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {feedback.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm ml-13">{feedback.comment}</p>
              </div>
            ))}
          </div>

          {/* Feedback Button */}
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Give Your Feedback
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Share Your Experience</h2>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Nationality </label>
                <input
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="eg.., India"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 cursor-pointer ${
                          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Feedback</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KashmirDetailPage;