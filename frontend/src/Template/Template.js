import React from "react";
import SignUpForm from "../components/Forms/SignUpForm";
import LoginInForm from "../components/Forms/LoginInForm";
import { Link } from "react-router-dom";
import google from "../assets/google-icon.png";
import apple from "../assets/apple-icon.png";

const Template = ({ title, subTitle, formtype }) => {
  return (
    <div className="flex flex-col shadow-lg p-8 bg-[#acacac86] w-auto justify-center items-center gap-4 backdrop-blur-lg inset-0">
      <div className=" flex flex-col gap-6 justify-center items-center w-full">
        <div className="w-full">
          <div className="w-full flex flex-col gap-2">
            <span className="text-3xl font-bold font-lato text-white">
              {title}
            </span>
            <span className="text-white">{subTitle}</span>
          </div>
        </div>

        <div className=" w-full">
          {formtype === "signup" ? <SignUpForm /> : <LoginInForm />}
        </div>
      
      </div>
      <div className="flex gap-4 invisible">
        <Link to="#" className="span ">
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-md shadow-md">
            <img src={google} className="h-[20px]" alt="logo" />
            <span className="text-[12px] font-lato text-gray-500">
              Sign in with Google
            </span>
          </div>
        </Link>
        <Link to="#" className="span">
          <div className="flex items-center gap-2 bg-white p-1 rounded-md shadow-md px-2 ">
            <img src={apple} className="h-[20px]" alt="logo" />
            <span className="text-[12px] font-lato text-gray-500">
              Sign in with Apple
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Template;