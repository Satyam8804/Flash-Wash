import React from 'react'
import AssignedAppointmentCard from '../components/Cards/AssignedAppointmentCard'

const AssignedWorks = () => {
    const accessToken = localStorage.getItem('accessToken');

  return (
    <div className='flex w-full'>
        <AssignedAppointmentCard accessToken={accessToken}/>
    </div>
  )
}

export default AssignedWorks