import React, { useEffect, useState } from "react";
import FeedbackForm from "../Template/FeedbackForm";

const Appointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  console.log(appointment);

  useEffect(() => {
    fetchAppointMent();
  }, []);
  const fetchAppointMent = async () => {
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
        console.log(response)
      if (response.ok) {
        const data = await response.json();
        setAppointment(data?.data);
      } else {
        console.log("Error fetching Appointment !");
      }
    } catch (error) {
      console.log("Error :", error.message);
    }
  };

  useEffect(() => {
    if (appointment?.workProgress === "Completed") {
      setShowFeedbackForm(true);
    } else {
      setShowFeedbackForm(false);
    }
  }, [appointment]);

  const accessToken = localStorage.getItem('accessToken')
  const handleFeedbackSubmit = async(formData)=>{
    const appointmentId = appointment?._id;
    console.log(formData)

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/feedback',{
        method:"POST",
        headers:{
          Authorization : `Bearer ${JSON.parse(accessToken)}`,
          "Content-Type": 'application/json'
        },
        body:JSON.stringify({
          appointmentId,
          ...formData,
        })
    })

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("Error updating user profile:", response.statusText);
    }
    } catch (error) {
      console.log(error)
    }
  }


  

  return (
    <>
    {appointment && appointment.map((ele)=><><div className='w-[300px] bg-white rounded-lg shadow-lg p-6'>
  <h3 className='text-xl font-bold mb-4'>Appointment Details</h3>
  <div className='grid grid-cols-2 gap-4 mb-4'>
    <div>
      <p className='text-gray-600'><strong>Service:</strong></p>
      <p className='text-lg text-gray-800'>{ele?.service?.name}</p>
    </div>
    <div>
      <p className='text-gray-600'><strong>Scheduled Date:</strong></p>
      <span>{new Date(ele?.scheduledDate).toLocaleDateString().replaceAll('/','-')}</span>
    </div>
  </div>
  <div className='grid grid-cols-2 gap-4 mb-4'>
    <div>
      <p className='text-gray-600'><strong>Confirmed:</strong></p>
      <p className={`text-lg ${ele?.isConfirmed ? 'text-green-600' : 'text-red-600'}`}>
        {ele?.isConfirmed ? 'Yes' : 'No'}
      </p>
    </div>
    <div>
      <p className='text-gray-600'><strong>Work Progress:</strong></p>
      <p className='text-lg text-gray-800'>{ele?.workProgress}</p>
    </div>
  </div>
  <div className='mb-4'>
    <p className='text-gray-600'><strong>Location:</strong></p>
    <p className='text-lg text-gray-800'>{ele?.location}</p>
  </div>
  <div>
    <p className='text-gray-600'><strong>Notes:</strong></p>
    <p className='text-lg text-gray-800'>{ele?.notes}</p>
  </div>
</div><br/><br/></>) }
  {showFeedbackForm && (
      <div className='mt-4'>
        <FeedbackForm onSubmit={handleFeedbackSubmit} />
      </div>
    )}
</>
  );
};

export default Appointment;
