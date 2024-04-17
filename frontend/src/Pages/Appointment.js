import React, { useEffect, useState } from "react";
import FeedbackForm from "../Template/FeedbackForm";
import printIcon from "./../assets/printer.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Appointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
 
 
  // console.log(appointment);

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/get-appointment",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json",
          },
        }
      );

        // console.log(response)
      if (response.ok) {
        const data = await response.json();
        setAppointment(data?.data);

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
    // console.log(formData)

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/feedback",
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
      // console.log(data);
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

  return (
    <div className="flex items-center gap-8">
      {appointment &&
        appointment.map((ele, index) => (
          <div
            id={`${index}`}
            key={index}
            className="flex items-center space-x-4 mb-4"
          >
            <div className="w-[400px] h-[500px] bg-white  shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-700">Appointment Details</h3>
                <img
                  onClick={() => downloadPdf(`${index}`)}
                  src={printIcon}
                  alt="print img"
                  height={30}
                  width={30}
                  style={{cursor:'pointer'}}
                  className="ml-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <strong>Service:</strong>
                  </p>
                  <p className="text-lg text-gray-800">{ele?.service?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <strong>Scheduled Date:</strong>
                  </p>
                  <span>
                    {new Date(ele?.scheduledDate)
                      .toLocaleDateString()
                      .replaceAll("/", "-")}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">
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
                  <p className="text-gray-600">
                    <strong>Work Progress:</strong>
                  </p>
                  <p className="text-lg text-gray-800">{ele?.workProgress}</p>
                </div>
              </div>
              <div className="mb-4">
  <p className="text-gray-600">
    <strong>Location:</strong>
  </p>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <p className="text-lg text-gray-800">
        <strong>{ele?.location?.split(",")[0].split(":")[0]}</strong>:{" "}
        {ele?.location?.split(",")[0].split(":")[1]}
      </p>
      <p className="text-lg text-gray-800">
        <strong>{ele?.location?.split(",")[1].split(":")[0]}</strong>:{" "}
        {ele?.location?.split(",")[1].split(":")[1]}
      </p>
    </div>
    <div>
      <p className="text-lg text-gray-800">
        <strong>{ele?.location?.split(",")[2].split(":")[0]}</strong>:{" "}
        {ele?.location?.split(",")[2].split(":")[1]}
      </p>
      <p className="text-lg text-gray-800">
        <strong>{ele?.location?.split(",")[3].split(":")[0]}</strong>:{" "}
        {ele?.location?.split(",")[3].split(":")[1]}
      </p>
    </div>
  </div>
</div>

              <div>
                <p className="text-gray-600">
                  <strong>Notes:</strong>
                </p>
                <p className="text-lg text-gray-800">{ele?.notes}</p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Amount Paid:</strong>
                </p>
              
                  <p  className="text-lg text-gray-800">{ele?.price}</p>
               
                
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
  );
};

export default Appointment;
