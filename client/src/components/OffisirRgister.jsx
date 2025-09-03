import React, { useRef, useState } from 'react';
import { Calendar, MapPinHouse ,Shield, User, Phone, MapPin, Clock, Wallet, CheckCircle } from 'lucide-react';
import { ethers, BrowserProvider } from 'ethers';
import { keccak256, toUtf8Bytes } from "ethers";
import Trutiscontract from "../contracts/TouristIDRegistration.sol/AllTourist.json"
import { QRCodeCanvas } from 'qrcode.react'
import { handleError, handleSuccess } from "./ErrorMessage"
import { Link } from 'react-router';
const OfficerTouristRegistration = () => {
    const qrRef = useRef()
    const { ethereum } = window;
    const [formData, setFormData] = useState({
        fullName: '',
        passportNumber: '',
        trustemail: '',
        touristContact: '',
        familyContact: '',
        startDate: '',
        endDate: '',
        nationality:''
    });

    const [errors, setErrors] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [connermetamask, setconnermetamask] = useState(true)
    const [trycon, settrycon] = useState(false)
    const [add, setadd] = useState('')
    const [bal, setbal] = useState('')
    const [Trustid, setTrustid] = useState()
    const [Tnx, setTnx] = useState('')
    const [Trustidgen, setTrustidgen] = useState(true)
    const [downloadbtn, setdownloadbtn] = useState(true)
    const [loadmail,setloadmail]=useState(false)

    const downloadpdf = async (e) => {
        // e.preventDefault()
        setloadmail(true)
        const qrElement = qrRef.current?.querySelector("canvas");
        if (!qrElement) return;
        const qrDataUrl = qrElement.toDataURL("image/png");
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/pdfwork/sendmail`
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                qrCode: qrDataUrl,
                Trustid:Trustid
                 // if QR generated in frontend
            }),
        });
        const url1 = `${import.meta.env.VITE_BACKEND_URL}/api/v2/userdata/savedata`
        const res1= await fetch(url1, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                Trustid:Trustid
            }),
        })
        const data1 = await res1.json();
        //console.log(data1);

        const data = await res.json();
        //console.log(data);
        if (!data.success) {
            return handleError("Mail is not due to error")
        }
        setloadmail(false)
        handleSuccess("Mail is send.")
        return setdownloadbtn(true)
    };
    const connectWallet = async (e) => {
        e.preventDefault();
        settrycon(true)
        if (!ethereum) {
            settrycon(false)
            return alert('Install MetaMask');
        }
        const account = await ethereum.request({
            method: 'eth_requestAccounts',
        })
        const fulladdress = account[0]
        const showaddress = `${fulladdress.slice(0, 4)}...${fulladdress.slice(-4)}`
        setadd(showaddress)
        const eth_bal = await ethereum.request({
            method: 'eth_getBalance',
            params: [
                account[0], 'latest'
            ]
        })
        const fullbal = ethers.formatEther(eth_bal)
        const showbal = fullbal.slice(0, 6)
        setbal(showbal)
        settrycon(false)
        setconnermetamask(false)
    }

    const validatePassport = (passport) => {
        // Basic passport validation - alphanumeric, 6-9 characters
        const passportRegex = /^[A-Z0-9]{6,9}$/;
        return passportRegex.test(passport.toUpperCase());
    };

    const validatePhone = (phone) => {
        // Basic phone validation - numbers, +, -, spaces allowed
        const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
        return phoneRegex.test(phone.replace(/[\s\-]/g, ''));
    };

    const validateForm = () => {
        const newErrors = {};
        //console.log(formData.startDate, formData.endDate)
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.passportNumber.trim()) {
            newErrors.passportNumber = 'Passport number is required';
        } else if (!validatePassport(formData.passportNumber)) {
            newErrors.passportNumber = 'Invalid passport format (6-9 alphanumeric characters)';
        }

        if (!formData.touristContact.trim()) {
            newErrors.touristContact = 'Tourist contact is required';
        } else if (!validatePhone(formData.touristContact)) {
            newErrors.touristContact = 'Invalid phone number format';
        }

        if (!formData.familyContact.trim()) {
            newErrors.familyContact = 'Family contact is required';
        } else if (!validatePhone(formData.familyContact)) {
            newErrors.familyContact = 'Invalid phone number format';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        }

        if (formData.startDate && formData.endDate) {
            if (new Date(formData.startDate) >= new Date(formData.endDate)) {
                newErrors.endDate = 'End date must be after start date';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        const hashedpass = keccak256(toUtf8Bytes(formData.passportNumber));
        const hashedOwnph = keccak256(toUtf8Bytes(formData.touristContact));
        const hashedFmph = keccak256(toUtf8Bytes(formData.familyContact));

        const WalletProvider = new BrowserProvider(ethereum);
        const singer = await WalletProvider.getSigner();
        const TrutistTnx = new ethers.Contract(
            import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
            Trutiscontract.abi,
            singer
        )
        const submitTrutisdata = await TrutistTnx.TouristIDRegistration(
            formData.fullName,
            hashedpass,
            hashedOwnph,
            hashedFmph,
            formData.startDate,
            formData.endDate
        )
        await submitTrutisdata.wait()
        //console.log(submitTrutisdata)
        setTnx(submitTrutisdata.hash)
        // setTrustid(submitTrutisdata.to)
        setIsSubmitting(false);
        setShowConfirmation(true);
        // if (showConfirmation) {
        //console.log("hiiiiiiii")
        const submitTrutisdataget = await TrutistTnx.filters.SaveTourist()
        const event = await TrutistTnx.queryFilter(submitTrutisdataget)
        //console.log(event)
        for (let i = 0; i < event.length; i++) {
            if (hashedpass == event[i].args.Passhash) {
                setTrustid(event[i].args.Touristaddress)
            }
        }
        setTrustidgen(false)
        // }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const generateTxHash = () => {
        return '0x' + Math.random().toString(16).substr(2, 40);
    };

    const calculateDuration = () => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return 0;
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            passportNumber: '',
            trustemail: '',
            touristContact: '',
            familyContact: '',
            startDate: '',
            endDate: ''
        });
        setErrors({});
        setShowConfirmation(false);
    };


    if (showConfirmation) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm mb-6 p-4 flex justify-around">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Tourist ID Registration</h1>
                                <p className="text-sm text-gray-600">Officer Portal</p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-500  hover:to-orange-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(add)}
                            title="Click to copy address"
                        >
                            <div style={{ height: "15px", width: "15px", backgroundColor: "black", borderRadius: "50%" }}>

                            </div>

                            {/* Address & Balance */}
                            <div className="flex flex-col">
                                <span className="text-sm font-mono truncate max-w-[150px]">{add}</span>
                                <span className="text-xs opacity-80">{bal} SpETH</span>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Registration Successful</h2>
                            </div>
                            <p className="text-gray-600">Tourist ID has been successfully created and recorded on blockchain.</p>
                        </div>

                        <div className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Tourist Information</label>
                                        <div className="mt-2 space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{formData.fullName}</p>
                                                    <p className="text-sm text-gray-500">Full Name</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{formData.passportNumber.toUpperCase()}</p>
                                                    <p className="text-sm text-gray-500">Passport Number</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <MapPinHouse  className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{formData.nationality}</p>
                                                    <p className="text-sm text-gray-500">Nationality </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact Information</label>
                                        <div className="mt-2 space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{formData.touristContact}</p>
                                                    <p className="text-sm text-gray-500">Tourist Contact</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{formData.familyContact}</p>
                                                    <p className="text-sm text-gray-500">Family Contact</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Trip Duration</label>
                                        <div className="mt-2 space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{new Date(formData.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                    <p className="text-sm text-gray-500">Start Date</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{new Date(formData.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                    <p className="text-sm text-gray-500">End Date</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{calculateDuration()} days</p>
                                                    <p className="text-sm text-gray-500">Total Duration</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Blockchain Record</label>
                                {/* */}
                                <div className="mt-2">
                                    <p className="text-xs font-mono text-gray-700 bg-white p-2 rounded border">
                                        TnxHash: {Tnx}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Transaction recorded on blockchain network</p>
                                </div>
                                {Trustidgen ? <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Genarate TrustId ...</span>
                                </div> : <div><div className="mt-2">
                                    <p className="text-xs font-mono text-gray-700 bg-white p-2 rounded border">
                                        TrustId: {Trustid}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Transaction recorded on blockchain network</p>
                                </div>
                                    <p className="text-[20px] text-gray-800 mt-1 text-center"> blockchain Transaction recorded QR</p>
                                    <div ref={qrRef} className='flex flex-col items-center justify-center mt-3'>
                                        <QRCodeCanvas value={`${import.meta.env.VITE_FRONTEND_URL}/${Trustid}`} size={150} />
                                    </div>
                                </div>
                                }
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-medium">Important:</span> This Tourist ID will be valid only for the duration of the trip ({new Date(formData.startDate).toLocaleDateString()} to {new Date(formData.endDate).toLocaleDateString()}). All data is securely stored on blockchain and cannot be modified.
                                    </p>
                                </div>

                                {downloadbtn ? <button onClick={downloadpdf} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{loadmail?<div className='flex justify-center items-center'><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>:'Send PDF'}</button> : <button
                                    onClick={resetForm}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Register Another Tourist
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {connermetamask ? <div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3 justify-center">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <Wallet className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Connect MetaMask Wallet</h3>
                                <p className="text-sm text-gray-600">Connect your wallet to access blockchain features</p>
                            </div>
                        </div>
                    </div>

                    {/* Connection Content */}
                    <div className="p-6">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Wallet className="w-10 h-10 text-white" />
                            </div>
                            <p className="text-gray-600 mb-6">
                                To register tourists on the blockchain and access secure features, you need to connect your MetaMask wallet.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                </div>
                                <span className="text-sm text-gray-700">Secure blockchain transactions</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                </div>
                                <span className="text-sm text-gray-700">Immutable tourist registration records</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                </div>
                                <span className="text-sm text-gray-700">Decentralized identity verification</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                </div>
                                <span className="text-sm text-gray-700">Enhanced security and privacy</span>
                            </div>
                        </div>

                        {/* Connect Button */}
                        <button
                            onClick={connectWallet}
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
                        >
                            {trycon ? <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Connecting...</span>
                            </div> : <div className='flex items-center justify-center'>
                                <Wallet className="w-5 h-5" />
                                <span>Connect MetaMask</span>
                            </div>}
                        </button>

                        {/* Info */}
                        <div className="bg-blue-50 rounded-lg p-4 mt-4">
                            <div className="flex items-start space-x-3">
                                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-sm text-blue-800">
                                        <span className="font-medium">Secure Connection:</span> Your wallet connection is encrypted and secure. We never store your private keys or sensitive information.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Install MetaMask Link */}
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-500">
                                Don't have MetaMask?
                                <a
                                    href="https://metamask.io/download/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 font-medium ml-1"
                                >
                                    Install it here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>


            </div> : <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm mb-6 p-4 flex justify-around">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">Tourist ID Registration</h1>
                                <Link to="/allturist"><p className="text-sm text-gray-600">Officer Portal</p></Link>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-500  hover:to-orange-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(add)}
                            title="Click to copy address"
                        >
                            <div style={{ height: "15px", width: "15px", backgroundColor: "black", borderRadius: "50%" }}>

                            </div>

                            {/* Address & Balance */}
                            <div className="flex flex-col">
                                <span className="text-sm font-mono truncate max-w-[150px]">{add}</span>
                                <span className="text-xs opacity-80">{bal} SpETH</span>
                            </div>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Register New Tourist</h2>
                            <p className="text-sm text-gray-600 mt-1">Complete all required fields to issue a new Tourist ID</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Tourist Information */}
                            <div>
                                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>Tourist Information</span>
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.fullName ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Enter tourist's full name as per passport"
                                        />
                                        {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Passport Number *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.passportNumber}
                                            onChange={(e) => handleInputChange('passportNumber', e.target.value.toUpperCase())}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.passportNumber ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="e.g., A1234567"
                                            maxLength="9"
                                        />
                                        {errors.passportNumber && <p className="text-red-600 text-sm mt-1">{errors.passportNumber}</p>}
                                        <p className="text-xs text-gray-500 mt-1">6-9 alphanumeric characters</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nationality *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nationality}
                                            onChange={(e) => handleInputChange('nationality', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="Your own country "
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.trustemail}
                                            onChange={(e) => handleInputChange('trustemail', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                            placeholder="e.g., example@gmail.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center space-x-2">
                                    <Phone className="w-4 h-4" />
                                    <span>Contact Information</span>
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tourist Contact Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.touristContact}
                                            onChange={(e) => handleInputChange('touristContact', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.touristContact ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="+1 234 567 8900"
                                        />
                                        {errors.touristContact && <p className="text-red-600 text-sm mt-1">{errors.touristContact}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Family Emergency Contact *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.familyContact}
                                            onChange={(e) => handleInputChange('familyContact', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.familyContact ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="+1 234 567 8901"
                                        />
                                        {errors.familyContact && <p className="text-red-600 text-sm mt-1">{errors.familyContact}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Trip Duration */}
                            <div>
                                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Trip Duration</span>
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Start Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.startDate ? 'border-red-300' : 'border-gray-300'}`}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            End Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.endDate ? 'border-red-300' : 'border-gray-300'}`}
                                            min={formData.startDate || new Date().toISOString().split('T')[0]}
                                        />
                                        {errors.endDate && <p className="text-red-600 text-sm mt-1">{errors.endDate}</p>}
                                    </div>
                                </div>
                                {formData.startDate && formData.endDate && !errors.endDate && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        Trip duration: {calculateDuration()} days
                                    </p>
                                )}
                            </div>

                            {/* Info Text */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-blue-800">
                                            <span className="font-medium">Security Notice:</span> This Tourist ID will be valid only for the duration of the trip. All data is securely stored on blockchain and cannot be modified after registration.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Registering Tourist...</span>
                                        </div>
                                    ) : (
                                        'Register Tourist'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default OfficerTouristRegistration;