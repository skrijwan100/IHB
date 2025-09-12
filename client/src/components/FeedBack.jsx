import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { MapPin, Upload, User } from 'lucide-react';
import { handleError, handleSuccess } from './ErrorMessage';
import axios from 'axios';
import { Link, useParams } from 'react-router';
const AddPlaceForm = ({ onCancel,setreloaddata }) => {
    const [formData, setFormData] = useState({
        name: '',
        tags: '',
        description: '',
        budget: '',
        LocUrl: '',
        temperature: '',
    });
    const [img, setimg] = useState()
    const [Loder, setLoder] = useState(false)
    const handleImageUpload = (e) => {
        setimg(e.target.files[0]);
        console.log(img)
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoder(true)
        const formallData = new FormData();
        if (img) {
            formallData.append("profilepic", img);
        }
        const placeDetiles = ({
            name: formData.name,
            tags: formData.tags,
            description: formData.description,
            LocUrl: formData.LocUrl,
            budget: formData.budget,
            temperature: formData.temperature
        })
        formallData.append("placeDetiles", JSON.stringify(placeDetiles));
        try {
            const responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v4/place/addplace`, formallData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (responce.data.status) {
                handleSuccess("Place is added")
                onCancel()
                return setLoder(false)
            }
        } catch (error) {
            console.log("Upload Error:", error);
            setLoder(false)
            return handleError("Some error happend")
        }
        setreloaddata(true)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-[#1a202c] p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-6">Add New Tourist Place</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Place Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-[#2d3748] text-white border-gray-600 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">Tags (comma separated)</label>
                            <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} className="w-full bg-[#2d3748] text-white border-gray-600 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="LocUrl" className="block text-sm font-medium text-gray-300 mb-1">Google Map Location URL</label>
                        <input type="url" name="LocUrl" id="LocUrl" value={formData.LocUrl} onChange={handleChange} className="w-full bg-[#2d3748] text-white border-gray-600 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="flex items-center text-white font-semibold mb-3">
                            <Upload className="w-5 h-5 mr-2 text-indigo-400" />
                            palce Image
                        </label>
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300`}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            {img ? (
                                <div className="space-y-2">
                                    <div className="w-[200px] h-[100px] bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                        {/* <Upload className="w-8 h-8 text-green-400" /> */}
                                        <img src={URL.createObjectURL(img)} alt="Preview"
                                            className="w-full h-full object-cover" />

                                    </div>
                                    {/* <p className="text-green-400 font-semibold">{formData.image.name}</p> */}
                                    <p className="text-gray-400 text-sm">Click to change image</p>
                                </div>
                            ) : (

                                <div className="space-y-2">
                                    <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto">
                                        <Upload className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <p className="text-white font-semibold">Click to upload</p>
                                    <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea name="description" id="description" rows="3" value={formData.description} onChange={handleChange} className="w-full bg-[#2d3748] text-white border-gray-600 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">Budget per day (₹)</label>
                            <input type="number" name="budget" id="budget" value={formData.budget} onChange={handleChange} className="w-full bg-[#2d3748] text-white border-gray-600 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="temperature" className="block text-sm font-medium text-gray-300 mb-1">Temperature (°C)</label>
                            <input type="number" name="temperature" id="temperature" value={formData.temperature} onChange={handleChange} className="w-full bg-[#2d3748] text-white border-gray-600 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onCancel} className={`px-6 py-2 ${Loder ? 'hidden' : ''} rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition-colors`}>Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-semibold">{Loder ? <div className='w-full h-full flex justify-center items-center '><div className='loder '></div></div> : "Save Place"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Feedback = () => {
    const [destinationss, setdestinations] = useState([])
    const [mainloder,setMainloder]=useState(false)
    const [reloaddata,setreloaddata]=useState(false)
    useEffect(() => {
        const fecthdata = async () => {
            setMainloder(true)
            const responce = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v4/place/allplaceshoe`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("accessToken")
                }
            });
            console.log(responce.data.data)

            setdestinations(responce.data.data)
            setMainloder(false)

        }
        fecthdata()

    }, [reloaddata])

    const [showForm, setShowForm] = useState(false);
   




    return (
        <div className="min-h-screen bg-gradient-to-br bg-gray-800  text-white p-5">

            <Navbar />

            {/* Header Section */}

            {/* Trusted Places Grid */}
            {mainloder?<div className='w-full h-[70vh] flex justify-center items-center '><div className='bigloder'></div></div>:<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                {destinationss.map((dest) => (
                    <div
                        key={dest._id}
                        className="bg-gray-800 rounded-2xl shadow-md overflow-hidden group hover:shadow-2xl hover:-translate-y-2 transition duration-300"
                    >
                        {/* Image & Overlay */}
                        <div className="relative overflow-hidden">
                            <img
                                src={dest.imgUrl}
                                alt={dest.name}
                                className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-2xl"></div>
                            <div className="absolute top-3 left-3 flex items-center gap-2 text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                                <MapPin size={16} /> {dest.temperature}°
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white group-hover:text-orange-600 transition">
                                    {dest.name}
                                </h3>
                                <span className="text-gray-400 flex items-center text-sm gap-1">
                                    <User size={16} /> {dest.tags}
                                </span>
                            </div>

                            <p className="mt-2 text-gray-300 text-sm leading-relaxed">
                                {dest.description}
                            </p>

                            {/* Tags */}
                            <div>

                                <span
                                    className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full hover:bg-green-500 hover:text-white transition"
                                >
                                    One day budget: {dest.budget}
                                </span>
                            </div>
                            <a target='_blank' href={`${dest.LocUrl}`}><button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-semibold rounded-lg text-lg px-5 py-4 text-center transition-all duration-300 transform hover:scale-105 mt-5 cursor-pointer"> LIve location </button></a>
                             <Link to={`/feedback/${dest._id}`}><button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-semibold rounded-lg text-lg px-5 py-4 text-center transition-all duration-300 transform hover:scale-105 mt-5 cursor-pointer"> Feedback </button></Link>
                        </div>
                    </div>
                ))}
            </div>
}

            {/* Add New Section */}
            <div className="max-w-2xl mx-auto text-center mb-12 mt-6">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-3 mx-auto"
                >
                    Add New Tourist Place for feedback
                </button>

            </div>
            {showForm && (
                <AddPlaceForm
                    onCancel={() => setShowForm(false)}
                    setreloaddata={setreloaddata}
                />
            )}

            {/* Footer */}
            <div className="text-center mt-16 pt-8 border-t border-blue-500/10">
                <p className="text-slate-400">© 2024 SecureApp. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Feedback;
