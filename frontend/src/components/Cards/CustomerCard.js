import React from 'react'
import { FaPhoneAlt ,FaRupeeSign, FaUser} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
const CustomerCard = ({users}) => {
    console.log("salik",users)
  return (
    <div className="flex flex-col text-white border-2 h-[200px] rounded-xl p-4 shadow-lg transition-transform font-lato w-[300px] bg-[#d4a13a] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border-gray-200 cursor-pointer">
      <div className="flex w-full items-center gap-4">
      <img
        src={users?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdHO6b9-w3GKg6WiuzHKUcUsLc2bHrg1nxgQ&usqp=CAU'}
        alt={users?.fullName}
        className="w-16 h-16 rounded-full border-2 border-white"
      />
      <span className="text-xl font-bold text-white">{users?.fullName}</span>
      </div>
      <p className="text-white font-bold">{users?.position?.toUpperCase()}</p>
      <div className="flex items-center gap-2">
      <IoIosMail size={20} /><span className="">{users?.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaPhoneAlt/>
      <span className="">+91-{users?.phoneNumber}</span>

      </div>
      <div className="flex items-center gap-2">
      <FaUser/>

      <span className="">{users?.username}</span>
      </div>
    </div>
  )
}

export default CustomerCard