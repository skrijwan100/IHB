import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { User, X, Send, UserPlus, Mail, Globe, UserCheck } from 'lucide-react';
import conversionStore from "../store/conversionStore.js";
import {timeAgo} from "../constants/constant.js"

// User Info Modal Component
const UserInfoModal = ({ isOpen, onClose, userInfo, isLoading }) => {
  if (!isOpen) return null;
  //console.log(userInfo)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-md border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center">
            <User className="mr-2" size={20} />
            User Profile
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-300">Loading user info...</span>
            </div>
          ) : userInfo ? (
            <div className="space-y-4">
              {/* Profile Avatar/Initial */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {userInfo.fullname?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <UserCheck className="text-blue-400 mr-3" size={18} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Full Name</p>
                    <p className="text-white font-medium">{userInfo.fullname}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <Mail className="text-green-400 mr-3" size={18} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                    <p className="text-white font-medium text-sm">{userInfo.email}</p>
                  </div>
                </div>

                {/* Nationality */}
                <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                  <Globe className="text-purple-400 mr-3" size={18} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Nationality</p>
                    <p className="text-white font-medium">{userInfo.nationality}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6 justify-center">
                <a  href={`mailto:${userInfo.email}` }><button className="flex-1 justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium w-[190px]" >
                 send mail
                </button></a>
           
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No user information available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ post, onUserClick }) => {
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
          <UserPlus 
            onClick={() => onUserClick(post.user[0].fullname)} 
            className='cursor-pointer text-gray-400 hover:text-blue-400 transition-colors  rounded-full hover:bg-gray-800' 
            
          />
        </div>
        <p className="mt-1">{post?.content}</p>
      </div>
    </div>
  );
};

const CreateConversionPopup = ({ isOpen, onClose, onCreate }) => {
  const [content, setContent] = useState('');
  const { isLoading, error, message, createConversion, getAllConversions } = conversionStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    try {
      await createConversion(content);
      await getAllConversions();
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
  const [userInfoModal, setUserInfoModal] = useState({
    isOpen: false,
    userInfo: null,
    isLoading: false
  });
  
  useEffect(() => {
    getAllConversions();
  }, [getAllConversions]);
  
  const handleUserClick = async (name) => {
    // Open modal and show loading state
    setUserInfoModal({
      isOpen: true,
      userInfo: null,
      isLoading: true
    });

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v2/userdata/fethdatausename`;
      const res = await fetch(url, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "accessToken": localStorage.getItem('accessToken') 
        },
        body: JSON.stringify({ fullName: name }),
      });
      const data = await res.json();
      //console.log(data)
      // Update modal with user data
      setUserInfoModal({
        isOpen: true,
        userInfo: data.message[0],
        isLoading: false
      });
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUserInfoModal({
        isOpen: true,
        userInfo: null,
        isLoading: false
      });
    }
  };

  const closeUserInfoModal = () => {
    setUserInfoModal({
      isOpen: false,
      userInfo: null,
      isLoading: false
    });
  };

  return (
    <div className="bg-[#000000] min-h-screen font-sans">
      <div className="bg-[#000000] pt-4">
        <Navbar />
      </div>
      <main>
        <div className="bg-[#000000] text-white max-w-4xl pt-[5rem] mx-auto border-x border-gray-700 min-h-screen">
          <div className='flex flex-col-reverse'>
            {allConversions?.map(post => (
              <PostCard 
                key={post._id} 
                post={post} 
                onUserClick={handleUserClick}
              />
            ))}
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

      {/* User Info Modal */}
      <UserInfoModal
        isOpen={userInfoModal.isOpen}
        onClose={closeUserInfoModal}
        userInfo={userInfoModal.userInfo}
        isLoading={userInfoModal.isLoading}
      />
    </div>
  );
};

export default Conversion;