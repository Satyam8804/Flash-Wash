import React, { useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Navbar from "../components/Navbar";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="contactUs">
      <Navbar />
      <div className="w-screen containeritems-center backdrop:blur-md flex justify-center flex-col">
        <div className="w-full flex md:flex-row flex-col-reverse items-center md:h-screen">
          <div className="flex flex-start md:justify-center w-full bg-[#0f1715] h-[300px]">
            <div className="h-full w-1/2 p-8 flex flex-col  gap-6 text-white">
              <div className="pb-2">
                <div className="flex gap-4 ">
                  <IoCall color="white" size={24} />
                  <span>CALL US</span>
                </div>
                <phone className="float-start ">+91-6207621814</phone>
              </div>
              <div className="pb-2">
                <div className="flex gap-4">
                  <FaLocationDot color="white" size={24} />
                  <span>LOCATION</span>
                </div>
                <address className="float-start ">
                  Lovely Professional University, Phagwara
                </address>
              </div>
              <div className="">
                <div className="flex gap-4">
                  <MdEmail color="white" size={24} />
                  <span>MAIL US</span>
                </div>
                <email className="float-left">flashwash@gmail.com</email>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:absolute right-40 -bottom-100 w-[400px] bg-white p-8 gap-4 ">
            <h2 className="text-2xl font-bold font-lato">CONTACT US</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex flex-col gap-1 ">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-sm border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-sm border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-sm border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-sm border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 h-24 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#0f1715] hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-center text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426.3271172982521!2d75.70063420473748!3d31.259025965986567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f801ab02cf5%3A0x33e6157f6ec4ba39!2sKhan%20PG!5e0!3m2!1sen!2sin!4v1709029612228!5m2!1sen!2sin"
            className="w-full h-[300px] border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;