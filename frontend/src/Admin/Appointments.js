// Appointments.js
import React, { useEffect, useState } from 'react';
import AppointmentCard from '../components/Cards/AppointmentCard';

const Appointments = () => {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const accessToken = localStorage.getItem('accessToken');

  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://flash-wash-l6v3.onrender.com/api/v1/admin/get-all-appointment', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setAppointments(data?.data);
        console.log("appoint",data?.data)
      } else {
        const errorData = await response.json();
        console.error('Error fetching appointment data:', errorData);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };



  return (
    <div className="flex flex-wrap w-full ">
      <span className="font-bold text-gray-500 text-2xl">APPOINTMENTS ({appointments?.length})</span>
      <div className="appointment flex flex-row flex-wrap w-full h-full overflow-y-auto max-h-[510px]">
      {appointments &&
        appointments.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} accessToken={accessToken}  />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
