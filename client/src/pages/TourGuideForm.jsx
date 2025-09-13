import React, { useState } from 'react';
import tourGuideStore from '../store/tourGuideStore.js'; // Adjust the import path as needed
import Navbar from '../components/Navbar.jsx';

const TourGuideForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    experience: '',
    tourLocations: '',
    languagesSpoken: ''
  });
  
  const { createTourGuide, isLoading, error, message, clearState } = tourGuideStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearState();
    
    // Convert comma-separated strings to arrays
    const submitData = {
      ...formData,
      tourLocations: formData.tourLocations.split(',').map(item => item.trim()),
      languagesSpoken: formData.languagesSpoken.split(',').map(item => item.trim()),
      experience: parseInt(formData.experience) || 0
    };
    
    try {
      await createTourGuide(submitData);
      // Reset form on successful submission
      if (!error) {
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          experience: '',
          tourLocations: '',
          languagesSpoken: ''
        });
      }
    } catch (err) {
      // Error is handled in the store
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pt-[4rem]">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="px-10 py-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-2">Register New Tour Guide</h2>
              <p className="text-gray-400">Add a new tour guide to your platform</p>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="mb-6 bg-red-500/20 border border-red-500 text-red-300 px-4 py-4 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {message && (
              <div className="mb-6 bg-green-500/20 border border-green-500 text-green-300 px-4 py-4 rounded-lg" role="alert">
                <strong className="font-bold">Success: </strong>
                <span className="block sm:inline">{message}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-lg bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-lg bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-3">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-lg bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white placeholder-gray-400"
                    placeholder="+1234567890"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-3">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3.5 rounded-lg bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white placeholder-gray-400"
                    placeholder="5"
                  />
                </div>

                {/* Tour Locations */}
                <div className="sm:col-span-2">
                  <label htmlFor="tourLocations" className="block text-sm font-medium text-gray-300 mb-3">
                    Tour Locations (comma separated) *
                  </label>
                  <input
                    type="text"
                    id="tourLocations"
                    name="tourLocations"
                    value={formData.tourLocations}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-lg bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white placeholder-gray-400"
                    placeholder="Paris, London, Rome"
                  />
                </div>

                {/* Languages Spoken */}
                <div className="sm:col-span-2">
                  <label htmlFor="languagesSpoken" className="block text-sm font-medium text-gray-300 mb-3">
                    Languages Spoken (comma separated) *
                  </label>
                  <input
                    type="text"
                    id="languagesSpoken"
                    name="languagesSpoken"
                    value={formData.languagesSpoken}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-lg bg-gray-700 border-transparent focus:border-indigo-500 focus:bg-gray-600 focus:ring-0 text-white placeholder-gray-400"
                    placeholder="English, French, Spanish"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : 'Create Tour Guide'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Info Box */}
        <div className="mt-10 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-medium text-white mb-3">Information</h3>
          <p className="text-gray-400">
            Fields marked with * are required. For multiple values (like locations and languages), separate them with commas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourGuideForm;