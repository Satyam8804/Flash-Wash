import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useProfile = (url) => {
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [userData, setUserData] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProfile = async () => {
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
          // console.log(data)
          setUserData(data?.data);
          setUpdatedUserData({ ...data?.data });
        } else {
          const errorData = await response.json();
          console.error('Error fetching user data:', errorData);
        }
      } catch (error) {
        console.error('Error:', error.message);
        if (error.response.status === 401 && error.response.data.message === 'Session expired') {
          // Display toast message for session expiration
          toast('Session has expired. Please log in again.');
      } else {
          // Handle other errors
          console.error('Error:', error.response.data);
      }
      }
    };

    

    fetchProfile();
  }, [url, accessToken]);

  return { userData, setUserData, updatedUserData, setUpdatedUserData };
};

export { useProfile };
