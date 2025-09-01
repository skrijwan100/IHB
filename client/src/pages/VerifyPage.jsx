import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
    Shield,
    CheckCircle,
    Search,
    User,
    Phone,
    Calendar,
    MapPin,
    Clock,
    AlertCircle,
    RefreshCw,
    ExternalLink,
    Download,
    FileText,
    Globe,
    Lock
} from 'lucide-react';
import { ethers } from 'ethers';
import { BrowserProvider } from 'ethers';
import Turistcontract from "../contracts/TouristIDRegistration.sol/AllTourist.json"
import { handleError } from '../components/ErrorMessage';
const GovernmentVerificationPage = () => {
    const { id } = useParams()
    const { ethereum } = window;
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState(true) // 'passport' or 'txhash'
    const [isLoading, setIsLoading] = useState(false);
    const [fecthdone, setfecthdone] = useState(false)
    const [verificationData, setVerificationData] = useState('A1234567');
    const [blockdata,setbloackdata]=useState([])


    const fecthBlockdata = async () => {
        setIsLoading(true)
        setSearchType(false)
        if (!ethereum) {
            settrycon(false)
            return alert('Install MetaMask');
        }
        const infuraProvider = new ethers.JsonRpcProvider(
            import.meta.env.VITE_INFURA_URL
        )
        const getcontarct = new ethers.Contract(
            import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
            Turistcontract.abi,
            infuraProvider
        )
        try {
            const allvote = await getcontarct.filters.SaveTourist(id);
            const getEvent = await getcontarct.queryFilter(allvote)
            console.log(getEvent)
            setbloackdata(getEvent)
            setIsLoading(false)
            setfecthdone(true)

        } catch (error) {
            handleError("This is Invalid Id")
            return setIsLoading(false)
        }

        if (getEvent.length == 0) {
            return alert("This is a Invalid Id")
        }
        
    }
    useEffect(() => {
        fecthBlockdata()
    }, [searchType])

    const getTripStatus = (startDate, endDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            return { status: 'Upcoming', color: 'blue', icon: Clock };
        } else if (now >= start && now <= end) {
            return { status: 'Active', color: 'green', icon: CheckCircle };
        } else {
            return { status: 'Completed', color: 'gray', icon: AlertCircle };
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <div className="max-w-6xl mx-auto p-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Government Verified Page</h1>
                                <p className="text-sm text-gray-600">Smart Tourist Safety System - Official Verification Service</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                            <Globe className="w-4 h-4" />
                            <span>Ministry of Tourism, Government of India</span>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
                        <div className="text-center">
                            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                            <p className="text-gray-600">Fetching verification data from blockchain...</p>
                            <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                        </div>
                    </div>
                )}

                {/* Verification Results */}
                {fecthdone && (
                    <div className="space-y-6">
                        {/* Verification Status Header */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg text-white p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">VERIFIED BY GOVERNMENT</h3>
                                        <p className="text-green-100 mt-1">This tourist is officially registered and verified</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-100 text-sm">Verification Level</p>
                                    {/* <p className="text-white font-semibold">{verificationData.verificationStatus.verificationLevel}</p> */}
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Tourist Information */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Personal Details */}
                                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                                    <div className="p-6 border-b border-gray-200">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                            <User className="w-5 h-5" />
                                            <span>Tourist Information</span>
                                        </h4>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                                                {/* <p className="text-lg font-semibold text-gray-900 mt-1">{verificationData.touristInfo.fullName}</p> */}
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nationality</label>
                                                {/* <p className="text-lg font-semibold text-gray-900 mt-1">{verificationData.touristInfo.nationality}</p> */}
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Passport Number</label>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    {/* <p className="text-lg font-mono font-semibold text-gray-900">{verificationData.touristInfo.passportNumber}</p> */}
                                                    <button
                                                        onClick={() => copyToClipboard(verificationData.touristInfo.passportNumber)}
                                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                                        title="Copy passport number"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tourist Contact</label>
                                                {/* <p className="text-lg font-semibold text-gray-900 mt-1">{verificationData.touristInfo.touristContact}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trip Details */}
                                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                                    <div className="p-6 border-b border-gray-200">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                            <Calendar className="w-5 h-5" />
                                            <span>Trip Information</span>
                                        </h4>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Trip Duration</label>
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-gray-600">Start:</span>
                                                        {/* <span className="font-semibold text-gray-900">{formatDate(verificationData.tripDetails.startDate)}</span> */}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-gray-600">End:</span>
                                                        {/* <span className="font-semibold text-gray-900">{formatDate(verificationData.tripDetails.endDate)}</span> */}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm text-gray-600">Duration:</span>
                                                        {/* <span className="font-semibold text-gray-900">{verificationData.tripDetails.duration} days</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div>
                                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Trip Status</label>
                                            <div className="mt-2">
                                                {(() => {
                                                    const statusInfo = getTripStatus(verificationData.tripDetails.startDate, verificationData.tripDetails.endDate);
                                                    const StatusIcon = statusInfo.icon;
                                                    return (
                                                        <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-${statusInfo.color}-100`}>
                                                            <StatusIcon className={`w-4 h-4 text-${statusInfo.color}-600`} />
                                                            <span className={`font-medium text-${statusInfo.color}-800`}>{statusInfo.status}</span>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div> */}
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Registered By</label>
                                                {/* <p className="text-lg font-semibold text-gray-900 mt-1">{verificationData.tripDetails.registeredBy}</p> */}
                                                {/* <p className="text-sm text-gray-600">{verificationData.tripDetails.location}</p> */}
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Registration Date</label>
                                                {/* <p className="text-lg font-semibold text-gray-900 mt-1">{formatDate(verificationData.tripDetails.registrationDate)}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar - Verification & Blockchain Info */}
                            <div className="space-y-6">
                                {/* Government Verification */}
                                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                                    <div className="p-6 border-b border-gray-200">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                            <Lock className="w-5 h-5" />
                                            <span>Official Verification</span>
                                        </h4>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Verified By</label>
                                            {/* <p className="text-sm font-semibold text-gray-900 mt-1">{verificationData.verificationStatus.verifiedBy}</p> */}
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</label>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                <span className="text-green-700 font-medium">Active & Valid</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Updated</label>
                                            {/* <p className="text-sm text-gray-900 mt-1">{verificationData.verificationStatus.lastUpdated}</p> */}
                                        </div>
                                    </div>
                                </div>

                                {/* Blockchain Information */}
                                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                                    <div className="p-6 border-b border-gray-200">
                                        <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                                            <FileText className="w-5 h-5" />
                                            <span>Blockchain Record</span>
                                        </h4>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Transaction Hash</label>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <p className="text-xs font-mono text-gray-900 bg-gray-50 p-2 rounded border flex-1 truncate">
                                                {blockdata[0].transactionHash}
                                            </p>
                                                <button
                                                    onClick={() => copyToClipboard(blockdata[0].transactionHash)}
                                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                                    title="Copy transaction hash"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Block Number</label>
                                                <p className="text-sm font-mono text-gray-900 mt-1">{blockdata[0].blockNumber}</p>
                                            </div>
                                        </div>
                                    
                                        <a target="_blank" href={`https://sepolia.etherscan.io/tx/${blockdata[0].transactionHash}`}><button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                                            <ExternalLink className="w-4 h-4" />
                                            <span>View on Blockchain Explorer</span>
                                        </button></a>
                                    </div>
                                </div>

                                {/* Actions */}
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    );
};

export default GovernmentVerificationPage;