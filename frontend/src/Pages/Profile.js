import React from 'react';
import { useState, useEffect } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { MdOutlineAddAPhoto } from 'react-icons/md';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(null);

  console.log(updatedUserData)


  useEffect(() => {
    getProfile();
  }, []);

  const accessToken = localStorage.getItem('accessToken');

  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Check if data?.data?.fullName is a non-empty string before using split
        // const fullNameArray = data?.data?.fullName?.toString().split(' ') || [];
        
        setUserData(data?.data);
        setUpdatedUserData({...data?.data});
      } else {
        const errorData = await response.json();
        console.error('Error fetching user data:', errorData);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  const handleInputChange = (field, value) => {
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddressInputChange = (field, value) => {
    setUpdatedUserData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [field]: value,
      },
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/update-account', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        const data = await response.json();
        setEditing(false);
        console.log(data);
      } else {
        console.error('Error updating user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFileInfo(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (fileInfo) {
      updateImage();
    }
  }, [fileInfo]);

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', fileInfo);

      const response = await fetch('http://localhost:8000/api/v1/users/updateAvatar', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
          // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error updating user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center w-full shadow-md p-4 bg-gray-400 ">
        <span className="text-4xl font-bold text-white font-lato">Profile</span>
        <IoIosArrowForward color="white" size={32} />
        <span className="text-4xl font-bold text-white font-lato ">
          {userData && `${userData.username[0].toUpperCase()+userData.username.slice(1)}`}
        </span>
      </div>
      {/* User Details */}
      <div className="w-3/4 p-4">
        {userData ? (
          <div>
            <div className="w-full flex items-center mb-4">
              <div className=" text-center flex justify-center items-center gap-4 w-full">
                <form action="" className='w-full flex justify-center' encType='multipart/form-data'>
                  <div className="mt-4 relative w-[100px] h-[100px] rounded-[50%]">
                    {!(
                      selectedImage || userData?.avatar
                    ) ? (
                      <>
                        <img
                          src={selectedImage ? selectedImage : userData?.avatar}
                          alt=""
                          className="h-full w-full rounded-[50%] transition duration-300 transform hover:scale-105 object-center"
                        />
                        <label className="flex items-center justify-center rounded-[50%] h-full w-full bg-black text-white absolute cursor-pointer left-0 top-0 transform opacity-50 hover:opacity-70 transition duration-300">
                          <input
                            type="file"
                            accept="image/*"
                            name="avatar"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <MdOutlineAddAPhoto size={24} />
                        </label>
                      </>
                    ) : (
                      <>
                        <img
                          src={selectedImage ? selectedImage : userData?.avatar}
                          alt=""
                          className="h-full w-full rounded-[50%] transition duration-300 transform hover:scale-105"
                        />

                        <label className="flex items-center justify-center rounded-[50%] h-full w-full bg-black text-white absolute cursor-pointer left-0 top-0 transform opacity-0 hover:opacity-70 transition duration-300">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <MdOutlineAddAPhoto size={24} />
                        </label>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {editing ? (
              <form>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                      type="text"
                      id="fullName"
                      value={updatedUserData?.fullName}
                      onChange={(e) =>
                        handleInputChange('fullName', e.target.value)
                      }
                      className="border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      disabled
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={updatedUserData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange('phoneNumber', e.target.value)
                      }
                      className="border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="street">Street:</label>
                    <input
                      type="text"
                      id="street"
                      value={updatedUserData.address.street}
                      onChange={(e) =>
                        handleAddressInputChange('street', e.target.value)
                      }
                      className="border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      id="city"
                      value={updatedUserData.address.city}
                      onChange={(e) =>
                        handleAddressInputChange('city', e.target.value)
                      }
                      className="border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="state">State:</label>
                    <input
                      type="text"
                      id="state"
                      value={updatedUserData.address.state}
                      onChange={(e) =>
                        handleAddressInputChange('state', e.target.value)
                      }
                      className="border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipcode">Zipcode:</label>
                    <input
                      type="text"
                      id="zipcode"
                      value={updatedUserData.address.zipcode}
                      onChange={(e) =>
                        handleAddressInputChange('zipcode', e.target.value)
                      }
                      className="border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="country">Country:</label>
                    <input
                      type="text"
                      id="country"
                      value={updatedUserData.address.country}
                      onChange={(e) =>
                        handleAddressInputChange('country', e.target.value)
                      }
                      className="border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
                  onClick={submitHandler}
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 transition duration-300 transform hover:scale-105 w-full">
              <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
              <div className="flex flex-wrap w-full">
                <div className="mb-4 px-2 w-1/2 sm:w-1/2 md:w-1/3">
                  <p className="text-lg font-semibold">Name:</p>
                  <p>{userData.fullName}</p>
                </div>
                <div className="mb-4 px-2 w-full sm:w-1/2 md:w-1/3 text-wrap">
                  <p className="text-lg font-semibold">Email:</p>
                  <p className="break-words">{userData.email}</p>
                </div>
                <div className="mb-4 px-2 w-full sm:w-1/2 md:w-1/3">
                  <p className="text-lg font-semibold">Phone:</p>
                  <p className='break-word'>{userData.phoneNumber}</p>
                </div>
                <div className="mb-4 px-2 w-full">
                  <p className="text-lg font-semibold">Address:</p>
                  <address>
                    {userData.address.street}, {userData.address.city}, {userData.address.state},{' '}
                    {userData.address.zipcode}, {userData.address.country}
                  </address>
                </div>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Edit Profile
              </button>
            </div>
            
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
