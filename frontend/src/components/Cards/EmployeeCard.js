import React from 'react'
import { FaPhoneAlt ,FaRupeeSign} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
const EmployeeCard = ({employee}) => {
  return (
    <div className="flex flex-col text-white border-2 h-[200px] rounded-xl p-4 shadow-lg transition-transform font-lato w-[300px] bg-[#06934d] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border-gray-200 cursor-pointer">
      <div className="flex w-full items-center gap-4">
      <img
        src={employee?.user?.avatar || 'default-avatar.jpg'}
        alt={employee?.user?.fullName}
        className="w-16 h-16 rounded-full border-2 border-white"
      />
      <span className="text-xl font-bold text-white">{employee?.user?.fullName}</span>
      </div>
      <p className="text-white font-bold">{employee?.position?.toUpperCase()}</p>
      <div className="flex items-center gap-2">
      <IoIosMail size={20} /><span className="">{employee?.user?.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaPhoneAlt/>
      <span className="">+91-{employee?.user?.phoneNumber}</span>

      </div>
      <div className="flex items-center gap-2">
      <FaRupeeSign />
      <span className="">{employee?.monthlyPays}</span>
      </div>
    </div>
  )
}

export default EmployeeCard