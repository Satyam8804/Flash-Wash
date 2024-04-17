import React, { useEffect, useRef, useState } from "react";
import { fetchAllService, scheduleService } from "../utils/service";
import { toast } from 'react-hot-toast';
import { Link, Outlet, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from "../components/Navbar";

const ServiceDashboard = () => {
    const navigate = useNavigate();
    const [allService, setAllService] = useState([]);
    const loginStatus = localStorage.getItem('isLoggedIn');
    const [status, setStatus] = useState(loginStatus);

    
    useEffect(() => {
        setStatus(loginStatus);
    }, [loginStatus]);

    console.log('login', loginStatus);

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
    const handleClose = () => { setShow(false); window.location.reload(); };
    const handleShow = () => setShow(true);

    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const currentServiceId = useRef(null);
    const price = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitted:', scheduleDate, address, notes);
        if (status.trim() === "true") {
            const res = await scheduleService(currentServiceId.current, scheduleDate, address, notes);
            if (res === true) {
                alert(price.current)
                navigate('/checkout',{ state: { price: price.current } });
            } else {
                alert(price.current)
                // toast.success("Appointment added successfully")
                navigate('/checkout',{ state: { price: price.current } });
            }
        } else {
            toast.error("Please Login to continue");
        }
    };

    return (
        <div className="w-full px-8 py-8 signinDiv">
            <Navbar/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-16 bg-[#eff8f5a7]">
                {allService !== "error" && allService.length > 0 && allService.map((ele) => (
                    <div key={ele._id} className="bg-[#3d3d3d6d] shadow-lg overflow-hidden">
                        <img src={ele.serviceImage} alt="Service" className="w-full h-48 object-stretch " />
                        <div className="p-6">
                            <h5 className="font-bold text-lg mb-2">{ele.name}</h5>
                            <p className=" mb-2"><strong>Description:</strong> {ele.description}</p>
                            <p className=" mb-2"><strong>Price:</strong> ₹{ele.price}</p>
                            <p className=" mb-2"><strong>Category:</strong> {ele.category}</p>
                            <p className=" mb-2"><strong>Vehicle Type:</strong> {ele.vehicleType}</p>
                            <button
                                onClick={() => {
                                    if (status.trim() === "true") {
                                        handleShow();
                                    } else {
                                        toast.error("Please login to continue");
                                    }
                                    currentServiceId.current = ele._id;
                                    price.current = ele.price
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
                    <div className="bg-white rounded-lg overflow-hidden w-full max-w-md">
                        <div className="px-4 py-2 bg-gray-800 text-white">
                            <h3 className="font-semibold">Schedule Appointment</h3>
                        </div>
                        <div className="p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="scheduleDate" className="block text-gray-700 font-bold mb-2">Schedule Date</label>
                                    <DatePicker
                                        selected={scheduleDate}
                                        onChange={(date) => setScheduleDate(date)}
                                        dateFormat="yyyy-MM-dd" // Set your desired date format
                                        className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter Address"
                                        className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="notes" className="block text-gray-700 font-bold mb-2">Notes</label>
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
