import toast from "react-hot-toast";

const accessToken=localStorage.getItem('accessToken');
const url = 'https://flash-wash-l6v3.onrender.com/api/v1/users/get-all-services'
export const fetchAllService = async () => {
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("md",data.data)
        return data.data
      } else {
        const errorData = await response.json();
        console.error('Error fetching user data:', errorData);
        return "error"
      }
    } catch (error) {
      console.error('Error:', error.message);
      return "error"
    }
  };

  const url1 = 'https://flash-wash-l6v3.onrender.com/api/v1/users/book-appointment';

  export const scheduleService = async (serviceId, scheduledDate, location, notes,price) => {
    try {
      const response = await fetch('https://flash-wash-l6v3.onrender.com/api/v1/users/book-appointment',{
        method:"POST",
        headers:{
          Authorization : `Bearer ${JSON.parse(accessToken)}`,
          "Content-Type": 'application/json'
        },
        body:JSON.stringify({
          serviceId,
          scheduledDate,
          location,
          notes,
          price
        })
    })

    // if (response.ok) {
    //   const data = await response.json();
     
    //   toast.success(response?.message)
    //   return data
    // } else {
    //   console.error("Error updating user profile:", response);
      
    //   toast.error(response?.message)
    //   return response
    // }
    return response
    } catch (error) {
      console.log(error)
      return error
    }

  };
  