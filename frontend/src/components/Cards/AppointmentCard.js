import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBusinessTime } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const AppointmentCard = ({ appointment, accessToken }) => {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);
  const [isSaving, setIsSaving] = useState(false);

  console.log(updatedAppointment);

  const handleUpdate = async (appointmentId, updatedFields) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/admin/update-appointment",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAppointment),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
        console.error("Error updating appointment:", errorData);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      // Only send fields that have been modified
      const updatedFields = {};
      if (updatedAppointment.isConfirmed !== appointment.isConfirmed) {
        updatedFields.isConfirmed = updatedAppointment.isConfirmed;
      }
      if (updatedAppointment.workProgress !== appointment.workProgress) {
        updatedFields.workProgress = updatedAppointment.workProgress;
      }

      // Send the update if there are changes
      if (Object.keys(updatedFields).length > 0) {
        await handleUpdate(appointment._id, updatedFields);
      }
    } catch (error) {
      console.error("Error saving changes:", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="flex flex-col text-white gap-1 border rounded-xl p-4 m-4  shadow-lg transition-transform cursor-pointe font-lato w-[300px] bg-[#1d99e1] bg-clip-padding backdrop-filter backdrop-blur-sm  border-gray-100
    "
    >
      <div className="flex gap-4 items-center">
        <img
          src={appointment?.user?.avatar!==""?appointment?.user?.avatar:'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'}
          alt="profile"
          className="w-16 h-16 rounded-[50%] border-2 transfrom brightness-125 object-fill"
        />
        <span className="text-lg font-bold">
          {appointment.user.fullName}
        </span>
        <div className="flex gap-2 items-center text-w">
          <FaPhoneAlt />
          <span className="text-md">
            {appointment.user.phoneNumber}
          </span>
        </div>
      </div>
      <p className="text-2xl font-extrabold">
        {appointment.service.name}
      </p>
      <div className="flex gap-2 items-center">
        <FaBusinessTime />
        <span>{new Date(appointment.scheduledDate).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2 items-center">
      <FaLocationDot />
      <span>{appointment?.location}</span>
      </div>
      {/* Editable Fields */}
      <div className="flex items-center gap-2">
        <label className="">Confirmed:</label>
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
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

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
