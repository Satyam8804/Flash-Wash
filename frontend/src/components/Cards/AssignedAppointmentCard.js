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
        const response = await axios.get("http://localhost:8000/api/v1/employee/get-assigned-work", {
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
          },
        });

        if (response.data.success) {
          setAssignedAppointment(response.data.data);
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
    <div className="card">
      <h2>Assigned Appointment</h2>
      {assignedAppointment ? (
        <div>
          <p>User: {assignedAppointment.user.fullName}</p>
          <p>Service: {assignedAppointment.service.name}</p>
          <p>Scheduled Date: {new Date(assignedAppointment.scheduledDate).toLocaleDateString()}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No assigned appointment found.</p>
      )}
    </div>
  );
};

export default AssignedAppointmentCard;
