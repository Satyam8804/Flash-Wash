import React, { useEffect, useState } from 'react'
import EmployeeCard from '../components/Cards/EmployeeCard';

const Employees = () => {

  const [employees,setEmployees] = useState([]);

  console.log(employees)

  useEffect(()=>{
    fetchEmployees()
  },[])

  const accessToken = localStorage.getItem('accessToken')
  const fetchEmployees = async()=>{
    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/get-all-employees',{
        method:'GET',
        headers:{
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
          'Content-Type' :'application/json'
        }
      })
      console.log(response)
      if(response.ok){
        const data = await response.json()
        console.log(data?.data)
        setEmployees(data?.data)
      }else{
        const errorData = await response.json();
        console.error('Error fetching appointment data:', errorData);
      }

    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <div className='px-4 flex flex-col gap-8'>
      <span className='text-2xl font-bold text-gray-500'>EMPLOYEES ({employees.length})</span>
      {
        employees && employees.map((employee)=>(
          <EmployeeCard employee={employee} key={employee._id}/>
        ))
      }
    </div>
  )
}

export default Employees