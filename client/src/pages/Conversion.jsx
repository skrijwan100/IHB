import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { User, X, Send, UserPlus } from 'lucide-react';
import conversionStore from "../store/conversionStore.js";
import {timeAgo} from "../constants/constant.js"

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-gray-500">
    <g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g>
  </svg>
);

const PostCard = ({ post }) => {
    console.log("Post:", post);
  return (
    <div className="flex space-x-4 p-4 border-b border-gray-700 ">
      <User />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="font-bold">{post?.user?.[0]?.fullname}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{timeAgo(post?.createdAt)}</span>
          </div>
          <UserPlus className='cursor-pointer'  />
        </div>
        <p className="mt-1">{post?.content}</p>
      </div>
    </div>
  );
};

const CreateConversionPopup = ({ isOpen, onClose, onCreate }) => {
  const [content, setContent] = useState('');
  const { isLoading, error, message, createConversion } = conversionStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    try {
      await createConversion(content);
      setContent('');
      onClose();
    } catch (error) {
      console.error("Failed to create conversion:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Create New Conversion</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
              Your Message
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-900 border border-red-700 text-red-200 rounded">
              {error}
            </div>
          )}
          
          {message && (
            <div className="mb-4 p-2 bg-green-900 border border-green-700 text-green-200 rounded">
              {message}
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                "Posting..."
              ) : (
                <>
                  <Send size={18} className="mr-1" />
                  Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Conversion = () => {
  const { allConversions, getAllConversions, deleteConversion } = conversionStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  useEffect(() => {
    getAllConversions();
  }, [getAllConversions]);
  
  console.log("All Conversions:", allConversions);

  

  return (
    <div className="bg-[#000000] min-h-screen font-sans">
      <div className="bg-[#000000] pt-4">
        <Navbar />
      </div>
      <main>
        <div className="bg-[#000000] text-white max-w-4xl pt-[5rem] mx-auto border-x border-gray-700 min-h-screen">
          <div className='flex flex-col-reverse'>
            {allConversions?.map(post => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
      </main>
      
      {/* Floating action button */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Send size={24} />
      </button>
      
      {/* Create Conversion Popup */}
      <CreateConversionPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default Conversion;