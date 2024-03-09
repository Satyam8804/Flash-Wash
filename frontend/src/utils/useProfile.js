import { useEffect, useState } from "react";

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
          setUserData(data?.data);
          setUpdatedUserData({ ...data?.data });
        } else {
          const errorData = await response.json();
          console.error('Error fetching user data:', errorData);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchProfile();
  }, [url, accessToken]);

  return { userData, setUserData, updatedUserData, setUpdatedUserData };
};

export { useProfile };
