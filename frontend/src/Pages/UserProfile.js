// UserProfile.js

import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const UserProfile = () => {
  return (
    <div className="signinDiv min-h-[100vh]">
      <Navbar />
      <div className="flex w-full h-full ">
        {/* Sidebar */}
        <div className="w-[350px] bg-[#1c212acd] p-4 m-4 rounded-lg shadow-lg h-min">
          <ul className="flex flex-col gap-6 font-bold text-white ">
            <Link to={""}>
              <li
                name="profile"
                className="cursor-pointer hover:bg-gray-500 hover:text-white p-2 rounded-md"
              >
                Edit Profile
              </li>
            </Link>
            <Link to={"appointment"}>
              <li
                name="appointment"
                className="cursor-pointer hover:bg-gray-500 hover:text-white p-2 rounded-md"
              >
                Appointment
              </li>
            </Link>
            <Link to={"change-password"}>
              <li
                name="changePassword"
                className="cursor-pointer hover:bg-gray-500 hover:text-white p-2 rounded-md"
              >
                Change Password
              </li>
            </Link>
            <Link to={'feedback'}>
              <li   
              name="feedback"
                className="cursor-pointer hover:bg-gray-500 hover:text-white p-2 rounded-md"
              >
                Feedback
              </li>
            </Link>
          </ul>
        </div>
        <div className=" flex flex-col items-center w-full p-8 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
