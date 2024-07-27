import React, { useEffect, useState } from 'react'
import CustomerCard from '../components/Cards/CustomerCard';

const Customers = () => {
  const [users,setUsers] = useState([]);



  useEffect(()=>{
    fetchUsers()
  },[])

  const accessToken = localStorage.getItem('accessToken')
  const fetchUsers = async()=>{
    try {
      const response = await fetch('https://flash-wash-l6v3.onrender.com/api/v1/admin/get-all-users',{
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
        setUsers(data?.data)
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
      <span className='text-2xl font-bold text-gray-500'>Customer ({users.length})</span>
      <div className='flex flex-wrap w-full h-full overflow-y-auto max-h-[510px] gap-14' >
      {
        users && users.map((users)=>(
          
          <CustomerCard users={users} key={users._id}/>
        ))
      }
      </div>
    </div>
  )
}

export default Customers