import React from 'react'
import { FaArchive, FaCar, FaPhoneAlt ,FaRupeeSign, FaTypo3, FaUser} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
const ServiceCard = ({service}) => {
    console.log("salik",service)
  return (
    <div className="flex flex-col text-white border-2  rounded-xl p-4 shadow-lg transition-transform font-lato w-[300px] bg-[#3cadbc] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border-gray-200 cursor-pointer">
      <div className="flex w-full items-center gap-4">
      <img
        src={service?.serviceImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdHO6b9-w3GKg6WiuzHKUcUsLc2bHrg1nxgQ&usqp=CAU'}
        alt={service?.name}
        className="w-16 h-16 rounded-full border-2 border-white"
      />
      <span className="text-xl font-bold text-white">{service?.name}</span>
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <FaTypo3/>
      <span className="">{service?.category}</span>

      </div>
      <div className="flex items-center gap-2">
        <FaCar/>
      <span className="">{service?.vehicleType}</span>

      </div>
      
      <div className="flex items-center gap-2">
        <FaRupeeSign/>
      <span className="">{service?.price}</span>

      </div>
      <div className="flex  gap-2">
      <FaArchive size={20} />
      <ul>
      {
      service?.description?.split(",").map((services,idx)=>(
        <li>{services}</li>
      ))
}
      </ul>
      </div>
      
    </div>
  )
}

export default ServiceCard