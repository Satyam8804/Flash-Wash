import React, { useEffect, useRef, useState } from "react";
import { fetchAllService, scheduleService } from "../utils/service";

import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./ServiceDashBoard.css";

const ServiceDashBoard = () => {
  const navigate = useNavigate();
  const [allService, setAllService] = useState([]);
  const loginStatus = localStorage.getItem("isLoggedIn");
  const [status, setStatus] = useState(loginStatus);

  useEffect(() => {
    setStatus(loginStatus);
  }, [loginStatus]);
  console.log("logi", loginStatus);
  const getData = async () => {
    const res = await fetchAllService();
    setAllService(res);
  };

  const postAppointment = async () => {
    const res = await scheduleService();
    if (res === true) {
      handleClose();
    } else {
      alert(res);
      handleClose();
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);

  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const currentServiceId = useRef(null);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
    console.log("Submitted:", scheduleDate, address, notes);
    if (status.trim() === "true") {
      const res = await scheduleService(
        currentServiceId.current,
        scheduleDate,
        address,
        notes
      );
      if (res === true) {
        toast.success("Appointment added successfully");
        navigate("/api/v1/users/profile/appointment");
      } else {
        toast.success("Appointment added successfully");
        navigate("/api/v1/users/profile/appointment");
      }
    } else {
      toast.error("Please Login to continue");
    }

    //postAppointment(currentServiceId.current,scheduleDate,address,notes)
    //handleClose(); // Close the modal after submission
  };
  return (
    <div>
      <div className="main-container">
        {allService !== "error" &&
          allService.length > 0 &&
          allService.map((ele) => {
            return (
              <div key={ele._id} className="car-container">
                <div className="service-card">
                  <h5 className="card-name">{ele.name}</h5>
                  <img src={ele.serviceImage} alt="img" />
                  <p className="Discription">{ele.description}</p>
                  <p className="Pricing">Price -: ₹{ele.price}</p>
                  <p className="Category">Category -: {ele.category}</p>
                  <p className="Vehical">VehicleType -: {ele.vehicleType}</p>
                  <div className="buttons">
                    <Link
                      className="primary"
                      onClick={() => {
                        console.log("inside login", status);
                        if (status.trim() === "true") {
                          handleShow();
                        } else {
                          toast.error("Please login to continue");
                        }
                        currentServiceId.current = ele._id;
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div>
        {show && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-3 bg-indigo-600 text-white flex justify-between items-center">
                  <h5 className="text-xl font-medium">Schedule Appointment</h5>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-200 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md px-3 py-1"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.707 3.307a1 1 0 00-1.414 0L0 6.014l4.707 2.707a1 1 0 001.414-1.414L2.307 6l2.407-1.293a1 1 0 000-1.414zM11.707 8.707a1 1 0 00-1.414 0L8 11.014l4.707 2.707a1 1 0 001.414-1.414L9.307 12l2.407-1.293a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="px-4 py-5 flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="scheduleDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Schedule Date
                    </label>
                    <input
                      type="date"
                      id="scheduleDate"
                      className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Address"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="notes"
                      className="text-sm font-medium text-gray-700"
                    >
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      rows="3"
                      className="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Enter Notes"
                    ></textarea>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex justify-end items-center">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md px-4 py-2"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-indigo-500"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDashBoard;
