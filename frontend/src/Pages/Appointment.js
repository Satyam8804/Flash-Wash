import React, { useEffect, useState } from "react";
import FeedbackForm from "../Template/FeedbackForm";
import printIcon from "./../assets/printer.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { fetchAllService } from "../utils/service";

const Appointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [curAppointment, setCurAppointment] =useState(null)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [allService, setAllService] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const getData = async () => {
    const res = await fetchAllService();
    setAllService(res);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `https://flash-wash-l6v3.onrender.com/api/v1/users/get-appointment`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAppointment(data?.data);
        setCurAppointment(data?.data)
        console.log("dem",data?.data)
      } else {
        console.log("Error fetching Appointment!");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    if (appointment?.workProgress === "Completed") {
      setShowFeedbackForm(true);
    } else {
      setShowFeedbackForm(false);
    }
  }, [appointment]);

  const accessToken = localStorage.getItem("accessToken");

  const handleFeedbackSubmit = async (formData) => {
    const appointmentId = appointment?._id;
    try {
      const response = await fetch(
        "https://flash-wash-l6v3.onrender.com/api/v1/users/feedback",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentId,
            ...formData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Error updating user profile:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdf = (index) => {
    const input = document.getElementById(index);

    html2canvas(input)
      .then((canvas) => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // A4 size
        pdf.save("downloaded-pdf.pdf");
      })
      .catch((error) => {
        console.log("Error generating PDF: ", error);
      });
  };

  const handleFilterChange = (event) => {
    if(event.target.value==="All"){
      fetchAppointment()
    }
    setSelectedFilter(event.target.value);
    console.log(appointment.filter((ele)=>ele?.service?.name===event.target.value))
    setCurAppointment(appointment.filter((ele)=>ele?.service?.name===event.target.value))
  };

  return (
    <div className="flex flex-col w-full ">
<div className="flex items-right gap-4 mb-4  mr-36 justify-end">
        <span className="text-white"><strong>Filter:</strong></span>
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All</option>
          {allService.map((service, index) => (
            <option key={index} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>
    
    <div className="flex items-center gap-8 flex-wrap">
      
      {curAppointment &&
        curAppointment.map((ele, index) => (
          <div
            id={`${index}`}
            key={index}
            className="flex items-center space-x-4 mb-4"
          >
            <div className="w-[400px] h-[450px] bg-[#eff8f5a7] rounded-md shadow-lg p-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-black">
                  Appointment Details
                </h3>
                <img
                  onClick={() => downloadPdf(`${index}`)}
                  src={printIcon}
                  alt="print img"
                  height={30}
                  width={30}
                  style={{ cursor: "pointer" }}
                  className="ml-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-black">
                    <strong>Service:</strong>
                  </p>
                  <p className="text-lg text-gray-800">{ele?.service?.name}</p>
                </div>
                <div>
                  <p className="text-black">
                    <strong>Scheduled Date:</strong>
                  </p>
                  <span>
                    {new Date(ele?.scheduledDate)
                      .toLocaleDateString()
                      .replaceAll("/", "-")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4 text-left">
                <div>
                  <p className="text-black">
                    <strong>Confirmed:</strong>
                  </p>
                  <p
                    className={`text-lg ${
                      ele?.isConfirmed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {ele?.isConfirmed ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-black">
                    <strong>Work Progress:</strong>
                  </p>
                  <p className="text-lg text-gray-800">{ele?.workProgress}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-black">
                  <strong>Location:</strong>
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-left">
                    <span className="text-gray-800">
                      <strong>
                        {ele?.location?.split(",")[0].split(":")[0]}:{" "}
                      </strong>
                    </span>
                    <span className="text-lg text-gray-800">
                      {ele?.location?.split(",")[0].split(":")[1]}
                    </span>
                    <span className="text-gray-800">
                      <strong>
                        {ele?.location?.split(",")[1].split(":")[0]}:{" "}
                      </strong>
                    </span>
                    <span className="text-lg text-gray-800">
                      {ele?.location?.split(",")[1].split(":")[1]}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-gray-800">
                      <strong>
                        {ele?.location?.split(",")[2].split(":")[0]}:{" "}
                      </strong>
                    </span>
                    <span className="text-lg text-gray-800">
                      {ele?.location?.split(",")[2].split(":")[1]}
                    </span>
                    <span className="text-gray-800">
                      <strong>
                        {ele?.location?.split(",")[3].split(":")[0]}:{" "}
                      </strong>
                    </span>
                    <span className="text-lg text-gray-800">
                      {ele?.location?.split(",")[3].split(":")[1]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <span className="text-black">
                    <strong>Notes:</strong>
                  </span>
                  <span className="text-lg text-gray-800">{ele?.notes}</span>
                </div>
                <div>
                  <span className="text-black">
                    <strong>Amount Paid:</strong>
                  </span>
                  <span className="text-lg text-gray-800">{ele?.price}</span>
                </div>
              </div>
            </div>
            {showFeedbackForm && (
              <div className="mt-4">
                <FeedbackForm onSubmit={handleFeedbackSubmit} />
              </div>
            )}
          </div>
        ))}
    </div>
    </div>
  );
};

export default Appointment;