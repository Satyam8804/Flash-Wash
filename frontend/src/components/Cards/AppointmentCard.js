import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaBusinessTime } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const AppointmentCard = ({ appointment, accessToken }) => {
  const [updatedAppointment, setUpdatedAppointment] = useState({
    ...appointment,
    employee: appointment.employee || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://flash-wash-l6v3.onrender.com/api/v1/admin/get-all-employees", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json"
          },
        });
        if (response.ok) {
          const data = await response.json();
          setEmployees(data?.data || []);
        } else {
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, [accessToken]);

  const handleUpdate = async (appointmentId, updatedFields) => {
    try {
      const response = await fetch(
        "https://flash-wash-l6v3.onrender.com/api/v1/admin/update-appointment",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: appointmentId,
            ...updatedFields,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUpdatedAppointment(prev => ({
          ...prev,
          ...updatedFields,
          employee: employees.find(emp => emp._id === updatedFields.employee) || prev.employee
        }));
        setErrorMessage("");  // Clear any previous error messages
      } else {
        const errorData = await response.json();
        console.error("Error updating appointment:", errorData);
        setErrorMessage(errorData.message);  // Set the error message from the response
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("An error occurred while updating the appointment.");  // Set a generic error message
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const updatedFields = {};

      if (updatedAppointment.isConfirmed ) {
        updatedFields.isConfirmed = updatedAppointment.isConfirmed;
      }
      if (updatedAppointment.workProgress) {
        updatedFields.workProgress = updatedAppointment.workProgress;
      }
      if (updatedAppointment.employee && updatedAppointment.employee !== appointment.employee?._id) {
        updatedFields.employee = updatedAppointment.employee;
      }

      // Send the update if there are changes
      if (Object.keys(updatedFields).length > 0) {
        await handleUpdate(appointment._id, updatedFields);
        
      }
      window.location.reload()
        
      
    } catch (error) {
      console.error("Error saving changes:", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col text-white gap-1 border rounded-xl p-4 m-4 shadow-lg transition-transform cursor-pointer font-lato w-[300px] bg-[#1d99e1] bg-clip-padding backdrop-filter backdrop-blur-sm border-gray-100">
      <div className="flex gap-4 items-center">
        <img
          src={appointment?.user?.avatar || "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"}
          alt="profile"
          className="w-16 h-16 rounded-[50%] border-2 transform brightness-125 object-fill"
        />
        <span className="text-lg font-bold">{appointment?.user?.fullName}</span>
        <div className="flex gap-2 items-center">
          <FaPhoneAlt />
          <span className="text-md">{appointment?.user?.phoneNumber}</span>
        </div>
      </div>
      <p className="text-2xl font-extrabold">{appointment?.service?.name}</p>
      <div className="flex gap-2 items-center">
        <FaBusinessTime />
        <span>{new Date(appointment?.scheduledDate).toLocaleDateString()}</span>
      </div>
      <div className="flex gap-2 items-center">
        <FaLocationDot />
        <span>{appointment?.location}</span>
      </div>
      {/* Editable Fields */}
      <div className="flex items-center gap-2">
        <label>Confirmed:</label>
        <input
          type="checkbox"
          checked={updatedAppointment.isConfirmed}
          onChange={(e) =>
            setUpdatedAppointment({
              ...updatedAppointment,
              isConfirmed: e.target.checked,
            })
          }
          className="checked:text-black checked:bg-white"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="mr-2">Work Progress:</label>
        <select
          value={updatedAppointment.workProgress}
          onChange={(e) =>
            setUpdatedAppointment({
              ...updatedAppointment,
              workProgress: e.target.value,
            })
          }
          className="px-2 py-1 rounded cursor-pointer text-gray-500"
          disabled={!updatedAppointment.isConfirmed}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <label className="mr-2">Assign Employee:</label>
        <select
          value={updatedAppointment.employee}
          onChange={(e) =>
            setUpdatedAppointment({
              ...updatedAppointment,
              employee: e.target.value,
            })
          }
          className="px-2 py-1 rounded cursor-pointer text-gray-500"
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee?._id} value={employee?._id}>
              {employee?.user?.fullName}
            </option>
          ))}
        </select>
      </div>
      {/* Display Error Message */}
      {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
      {/* Save Changes Button */}
      <button
        className={`bg-[#0f1715] text-white py-2 px-4 mt-2 rounded-md hover:bg-gray-600 transition duration-300 ${
          isSaving ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default AppointmentCard;