import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MapPin, Star, User, Calendar, X, Send } from 'lucide-react';
import { handleError, handleSuccess } from './ErrorMessage';
import axios from 'axios';
const KashmirDetailPage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { id } = useParams()
  const [rating, setRating] = useState(0);
  const [Feedbackdisc, setFeedbackdisc] = useState('');
  const [name, setname] = useState('');
  const [nationality, setnationality] = useState('');
  const [loder, setLoder] = useState(false)
  const [feedbackList, setFeedbackList] = useState([])
  const [placeadata,setplacedata]=useState([])
  const [Mainloder, setMainloder] = useState(false)
  const [reloaddata,setreloaddata]=useState(false)
  useEffect(() => {
    const fecthallfeedback = async () => {
      const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v4/place/feedback/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("accessToken")
        }
      });
      if (!responce.data.status) {
        return handleError("Server Error Try Again!")

      }
      setFeedbackList(responce.data.message)
    }
    const fecthplacedata= async()=>{
      const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v4/place/placedata/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("accessToken")
        }
      });
      if (!responce.data.status) {
        return handleError("Server Error Try Again!")

      }
      setplacedata(responce.data.message)
  
    }
    fecthallfeedback()
    fecthplacedata()
  }, [reloaddata])


  const handleSubmitFeedback = async () => {
    if (name && nationality && rating && Feedbackdisc) {
      setLoder(false)
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/v4/place/addreview`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("accessToken")
        },
        body: JSON.stringify({ name: name, nationality: nationality, rating: rating, Feedbackdisc: Feedbackdisc, id: id })
      })
      const data = await res.json()
      //console.log(data)
      if (!data.status) {
        setLoder(false)
        return handleError("Server Error try again!")
      }
      handleSuccess("Add done.")
      setLoder(false)
      setreloaddata(true)
      setShowFeedbackModal(false);
      setRating(0);
      setFeedbackdisc('');
      setname('');
      setnationality('');
    }
  };
  const formatTimeAgo = (isoDateString) => {
    const date = new Date(isoDateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 5) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };
  return (
    <div className="min-h-screen bg-gray-800">
      {/* Hero Section */}
      <div className={`relative h-80 bg-gradient-to-b from-cyan-600 to-blue-800 `}>
       <div className='flex items-center justify-center pt-7'> <img className='h-52' src={placeadata.imgUrl} alt="" /></div>
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{placeadata.temperature}°</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-4xl font-bold text-white mb-2">{placeadata.name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-white">{placeadata.tags}</span>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
              One day budget: {placeadata.budget}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">About {placeadata.name}</h2>
          <p className="text-gray-700 mb-3">
           {placeadata.description}
          </p>
          <a target='_blank' href={`${placeadata.LocUrl}`}><button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-semibold rounded-lg text-lg px-5 py-4 text-center transition-all duration-300 transform hover:scale-[1.03] mt-5 cursor-pointer"> LIve location </button></a>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Visitor Feedback</h3>

          {/* Feedback List */}
          {Mainloder ? <div className='w-full h-[70vh] flex justify-center items-center '><div className='bigloder'></div></div> : <div className="space-y-4 mb-6">
            {feedbackList.map((feedback) => (
              <div key={feedback._id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{feedback.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatTimeAgo(feedback.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-m ml-13">I am form: <span className='font-bold'>{feedback.nationality}</span></p>
                <p className="text-gray-600 text-sm ml-13">{feedback.Feedbackdisc}</p>
              </div>
            ))}
          </div>}

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
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Nationality </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setnationality(e.target.value)}
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
                        className={`w-8 h-8 cursor-pointer ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Feedback</label>
                <textarea
                  value={Feedbackdisc}
                  onChange={(e) => setFeedbackdisc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className={`flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 ${loder ? 'hidden' : ''}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {loder ? <div className='w-full h-full flex justify-center items-center '><div className='loder '></div></div> : "Submit"}
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