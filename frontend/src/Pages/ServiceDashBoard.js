import React, { useEffect, useRef, useState } from "react";
import { fetchAllService, scheduleService } from "../utils/service";
import { toast } from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import { SlCalender } from "react-icons/sl";
import './ServiceDashBoard.css';

const ServiceDashboard = () => {
  const navigate = useNavigate();
  const [allService, setAllService] = useState([]);
  const loginStatus = localStorage.getItem("isLoggedIn");
  const [status, setStatus] = useState(loginStatus);

  useEffect(() => {
    setStatus(loginStatus);
  }, [loginStatus]);

  console.log("login", loginStatus);

  const getData = async () => {
    const res = await fetchAllService();
    setAllService(res);
  };


    const postAppointment = async () => {
        const res = await scheduleService();
        if (res === true) {
            handleClose();
        } else {
           // alert(res);
            handleClose();
        }
    };


  useEffect(() => {
    getData();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    //window.location.reload();
  };
  const handleShow = () => setShow(true);

  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [notes, setNotes] = useState("");
  const stateValue = "Punjab"; // State value, assuming Punjab is prefilled

  const currentServiceId = useRef(null);
  const price = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(
      "Submitted:",
      scheduleDate,
      city,
      landmark,
      pincode,
      stateValue,
      notes
    );
    // Check login status
    if (status.trim() === "true") {
      const res = await scheduleService(
        currentServiceId.current,
        scheduleDate,
        `City: ${city},
                Landmark: ${landmark},
                Pincode: ${pincode},
                state: ${stateValue}`,
        notes,
        price.current
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data)
        navigate("/checkout", { state: { price: price.current } });
       
        //return data
      } else {
        console.error("Error updating user profile:", res);
        
        toast.error(res?.message)
      
      }
      // if (res.ok) {
        
      //   navigate("/checkout", { state: { price: price.current } });
      //   //navigate('/api/v1/users/profile/appointment')
      // } else {
        
      //   console.log(res)
      //   //navigate("/checkout", { state: { price: price.current } });
      //   //navigate('/api/v1/users/profile/appointment')
      // }
    } else {
      toast.error("Please Login to continue");
    }
  };

  return (
    <div className="w-full signinDiv">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-16 bg-[#eff8f5a7] ml-20 mr-20">
        {allService !== "error" &&
          allService.length > 0 &&
          allService.map((ele) => (
            <div
              key={ele._id}
              className="bg-[#3d3d3d6d] shadow-lg overflow-hidden"
            >
              <img
                src={ele.serviceImage}
                alt="Service"
                className="w-full h-48 object-stretch "
              />
              <div className="p-6">
                <h5 className="font-bold text-lg mb-2">{ele.name}</h5>
                <p className="text-white mb-2">
                  <strong>Description:</strong>
                  <ul>
                    {ele?.description?.split(",").map((services, idx) => (
                      <li key={idx}>{services}</li>
                    ))}
                  </ul>
                </p>
                <p className="text-white mb-2">
                  <strong>Price:</strong> ₹{ele.price}
                </p>
                <p className="text-white mb-2">
                  <strong>Hours:</strong> {ele.duration}
                </p>
                <p className="text-white mb-2">
                  <strong>Category:</strong> {ele.category}
                </p>
                <p className="text-white mb-2">
                  <strong>Vehicle Type:</strong> {ele.vehicleType}
                </p>
                <button
                  onClick={() => {
                    if (status.trim() === "true") {
                      handleShow();
                    } else {
                      toast.error("Please login to continue");
                    }
                    currentServiceId.current = ele._id;
                    price.current = ele.price;
                  }}
                  className="bg-[#0f1715a3] hover:bg-[#0f1715] text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg overflow-y-auto max-h-96 mx-4 my-8 w-full max-w-md">
            <div className="px-4 py-2 bg-gray-800 text-white">
              <h3 className="font-semibold">Schedule Appointment</h3>
            </div>
            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="scheduleDate"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Schedule Date
                  </label>
                  <DatePicker
                    selected={scheduleDate}
                    onChange={(date) => setScheduleDate(date)}
                    dateFormat="yyyy-MM-dd" // Set your desired date format
                    className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    City
                  </label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select City</option>
                    <option value="Jalandhar">Jalandhar</option>
                    <option value="Phagwara">Phagwara</option>
                    <option value="Kapurthala">Kapurthala</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="landmark"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Landmark
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Enter Landmark"
                    className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="pincode"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Pincode
                  </label>
                  <input
                    type="number"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Pincode"
                    className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="state"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={stateValue}
                    readOnly
                    className="p-2 border rounded-md w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="notes"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter Notes"
                    className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mr-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDashboard;
