// UserProfile.js

import React, { useState } from "react";

import Appointment from "./Appointment";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import { Link, Outlet } from "react-router-dom";
const UserProfile = () => {

  const [isVisible , setIsVisible] = useState({
      "profile":true,
      "appointment":false,
      "changePassword":false
  })

  const handleVisible = (e) => {
    const itemName = e.target.getAttribute("name");
    setIsVisible((prevVisibility) => ({
      ...Object.fromEntries(Object.keys(prevVisibility).map(key => [key, key === itemName])),
    }));
  };
  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-300 p-4 h-full">
        <ul className="flex flex-col gap-6 font-bold text-gray-500">
          <Link to={"edit-profile"}>
          <li onClick={handleVisible} name="profile" className="cursor-pointer hover:bg-gray-500 hover:text-white p-2">
            Edit Profile
          </li>
          </Link>
        <Link to={"appointment"}>
          <li onClick={handleVisible} name="appointment" className="cursor-pointer hover:bg-gray-500 hover:text-white p-2">
            Appointment
          </li>
        </Link>
          <Link to={"change-password"}>
          <li onClick={handleVisible} name="changePassword" className="cursor-pointer hover:bg-gray-500 hover:text-white p-2">
            Change Password
          </li>
          </Link>
        </ul>
      </div>
      <div className=" flex flex-col items-center w-3/4 p-8">
        <Outlet/>
      </div>
    </div>
  );
};

export default UserProfile;
