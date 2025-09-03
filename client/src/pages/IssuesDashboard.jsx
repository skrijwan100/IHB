import React, { useEffect, useState } from "react";
import issues from "../data/issues.json";
import { User, Calendar, Tag, Globe } from "lucide-react";
import { ethers, BrowserProvider } from 'ethers';
import { useNavigate } from "react-router";
import Turistcontract from "../contracts/TouristIDRegistration.sol/AllTourist.json"
const IssuesDashboard = () => {
  const { ethereum } = window;
  const naviget = useNavigate()
  const [pre, setpre] = useState(false)
  const [bloackdata,setbloackdata]=useState([])
  useEffect(() => {
    const chakeadminid = async () => {
      if (!ethereum) {
        settrycon(false)
        return alert('Install MetaMask');
      }
      const account = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      const fulladdress = account[0]
      console.log(fulladdress)
      console.log()
      if (fulladdress == `${import.meta.env.VITE_MY_ADDRESS.toLowerCase()}`) {
        const infuraProvider = new ethers.JsonRpcProvider(
          import.meta.env.VITE_INFURA_URL
        )
        const getcontarct = new ethers.Contract(
          import.meta.env.VITE_CONTRACT_DEPOLY_ADDRESS,
          Turistcontract.abi,
          infuraProvider
        )

        const allvote = await getcontarct.filters.SaveTourist();
        const getEvent = await getcontarct.queryFilter(allvote)
        console.log(getEvent)
        setbloackdata(getEvent)
        return setpre(true)
      }
      else {

        naviget("/")

      }
    }
    chakeadminid()
  }, [])
  if (!pre) {
    return (
      <div className='w-full  bg-gray-700 h-[100vh] flex justify-center items-center '><div className='bigloder'></div></div> 
    )
  }
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center px-6 py-10">
      <header className="relative w-full max-w-5xl mb-10">
        <h1 className="text-center text-4xl font-bold flex items-center justify-center gap-2 text-white">
          <Globe className="w-10 h-10 text-blue-400" />
          Goverment Admin Page
        </h1>
        <p className="text-gray-300 text-center mt-5">
          Track the all Tourister 
        </p>
      </header>

      {/* Issues list */}
      <div className="w-full max-w-5xl space-y-6 text-white">
        {bloackdata.map((data,inedx) => (
          <div
            key={inedx}
            className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl shadow-lg hover:from-gray-700 hover:to-gray-600 hover:shadow-xl transition"
          >
            {/* Issue Details */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
               <h2 className="text-xl font-semibold"> Name: {data.args.name}</h2>
              </div>

              <p className="text-sm text-gray-300">SmartId: {data.args.Touristaddress}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                Trip Duration:
                <Calendar className="w-4 h-4  text-green-400" />
                <span>{data.args.tripstart}</span> -
                <Calendar className="w-4 h-4 text-green-400 ml-4" />
                <span>{data.args.tripend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesDashboard;
