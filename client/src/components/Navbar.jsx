import React from 'react'
import { FaShieldVirus, FaUserShield } from "react-icons/fa6";
import { MdDone, MdExitToApp } from 'react-icons/md';
import { TbCopy } from 'react-icons/tb';

const Navbar = () => {
  return (
    <div className="h-16 w-[95%] top-[1rem] fixed rounded-2xl left-1/2 -translate-x-1/2 bg-gray-800 text-white flex items-center justify-between px-4 border border-gray-700 z-50">
      {/* Left side - Logo */}
      <div className="flex items-center gap-4">
        <div className='flex items-center justify-center text-4xl'>
          <FaShieldVirus />
        </div>
        <h1 className='text-xl font-bold sm:block hidden'>CheatRoom</h1>
      </div>

      {/* Center - Code display */}
      <div className="lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-700/80 py-1 px-3 rounded-lg border border-gray-600">
        <span className="text-sm font-mono font-medium tracking-wide">Room: </span>
        <button
          className="p-2 rounded-md transition-all duration-200 flex items-center justify-center bg-gray-600/50 hover:bg-gray-500/70 text-gray-300 hover:text-white"
          aria-label="Copy code"
        >
          <TbCopy className="text-lg" />
        </button>
      </div>

      {/* Right side - User icon and Exit button */}
      <div className='flex items-center gap-4'>
        {/* Exit button */}
        <button
          className="max-[1000px]:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg border border-red-700 transition-colors duration-200 text-sm hidden"
        >
          <MdExitToApp className="text-lg" />
          <span className="hidden xs:inline">Exit</span>
        </button>
        
        {/* Profile icon */}
        <div className="flex items-center justify-center text-3xl cursor-pointer">
          <FaUserShield />
        </div>
      </div>
    </div>
  )
}

export default Navbar