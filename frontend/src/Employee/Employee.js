import React, { useState } from 'react'
import { FaBell } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
import { FaBusinessTime, FaRegCircleXmark } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { useProfile } from "../utils/useProfile";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate()

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { userData} = useProfile(
    "https://flash-wash-l6v3.onrender.com/api/v1/employee/info"
  );

  console.log(userData)

  const handleMenuIconClick = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogout =()=>{
      localStorage.removeItem('accessToken')
      navigate("/api/v1/users/login") 
     }
  return (
    <div>
      <div className="w-screen h-screen flex flex-row p-4 bg-[#ececec]">
        <div className="w-4/12 md:w-2/12 flex flex-col items-center gap-16 bg-[#0f1715] text-white rounded-xl p-2">
          <span className="text-3xl font-bold" id="board-1">
            Employee
          </span>
          <div
            className={`sidebar ${
              isSidebarVisible ? "visible" : ""
            } flex flex-col justify-between h-full`}
          >
            <div className="list">
              <ul className="flex flex-col gap-8 mt-2">
                <Link to={"profile"}>
                  <li className="list-none  cursor-pointer  flex gap-2">
                    <FaBusinessTime color="white" size={24} />
                    <span>Profile</span>
                  </li>
                </Link>      
                <Link to={"assigned-work"}>
                <li className="list-none cursor-pointer  flex gap-2">
                  <MdOutlineSettings color="white" size={24} />
                  <span>Assigned Work</span>
                </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer mb-4" onClick={handleLogout}>
          <FaSignOutAlt  color="white" size={24}/>
          <span>Logout</span>
          </div>
        </div>
        <div className="w-10/12 flex flex-col justify-between px-4 gap-8">
          <div className="w-full flex flex-row items-center justify-between gap-4">
            <div className="">
              <span className="text-2xl font-bold" id="">
                Dashboard
              </span>
            </div>
            <div className="right flex flex-row gap-4 items-center justify-center">
              {/* <input
                type="search"
                placeholder="Search..."
                id="search"
                className="h-8 w-48 border border-none font-bold rounded-xl px-4 text-sm bg- text-gray-500 font-lato"
              /> */}
              <FaBell />
              <div className="">
              <img
                src={userData?.user?.avatar}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <span className="font-bold text-gray-500">{userData?.user?.username[0]?.toUpperCase()+userData?.user?.username.slice(1)}</span>
              </div>
          </div>
          <div className="flex flex-col w-full gap-6 justify-between h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Employee