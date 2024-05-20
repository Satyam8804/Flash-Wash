import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const AssignedAppointmentCard = ({ accessToken }) => {
  const [assignedAppointment, setAssignedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedAppointment = async () => {
      try {
        // Make a GET request to fetch assigned appointments
        const response = await axios.get("https://flash-wash-l6v3.onrender.com/api/v1/employee/get-assigned-work", {
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
          },
        });

        if (response.data.success) {
          setAssignedAppointment(response.data.data);
          console.log(response.data.data)
        } else {
          setError(response.data.message || "Failed to fetch assigned appointments");
        }
      } catch (error) {
        setError(error.message || "Error fetching assigned appointments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignedAppointment();
  }, [accessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa", // Light grey background color
        borderRadius: "10px", // Rounded corners
        padding: "20px", // Padding inside the card
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for a lifted effect
        margin: "20px", // Margin around the card
        maxWidth: "400px", // Maximum width of the card
      }}
    >
      <h2
        style={{
          color: "#333", // Darker text color for the heading
          fontSize: "1.5em", // Larger font size for the heading
          marginBottom: "15px", // Space below the heading
        }}
      >
        <b>Assigned Appointment</b>
      </h2>
      {assignedAppointment ? (
        <div>
          <p
            style={{
              color: "#555", // Slightly lighter text color for paragraph
              marginBottom: "10px", // Space below paragraphs
            }}
          >
            <b>User:</b> {assignedAppointment?.user?.fullName}
          </p>
          <p
            style={{
              color: "#555", // Slightly lighter text color for paragraph
              marginBottom: "10px", // Space below paragraphs
            }}
          >
           <b>Phone Number:</b>{assignedAppointment?.user?.phoneNumber}
          </p>
          <p
            style={{
              color: "#555", // Slightly lighter text color for paragraph
              marginBottom: "10px", // Space below paragraphs
            }}
          >
            <b>Scheduled Date:</b> {new Date(assignedAppointment?.scheduledDate).toLocaleDateString()}
          </p>
          <p
            style={{
              color: "#555", // Slightly lighter text color for paragraph
              marginBottom: "10px", // Space below paragraphs
            }}
          >
            <b>Address:</b> {assignedAppointment?.location}
          </p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p
          style={{
            color: "#555", // Slightly lighter text color for paragraph
            marginBottom: "10px", // Space below paragraphs
          }}
        >
          No assigned appointment found.
        </p>
      )}
    </div>
  );
};

export default AssignedAppointmentCard;
