import React from "react";
import { useState, useEffect } from "react";
// import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useProfile } from "../utils/useProfile";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const Profile = () => {
  const [editing, setEditing] = useState(false);
  const { userData, updatedUserData, setUpdatedUserData } = useProfile(
    "https://flash-wash-l6v3.onrender.com/api/v1/users/profile"
  );

  const accessToken = localStorage.getItem("accessToken");

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
      const response = await fetch(
        "https://flash-wash-l6v3.onrender.com/api/v1/users/update-account",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("currentUser", JSON.stringify(data?.data));

        setEditing(false);
        console.log(data);
      } else {
        console.error("Error updating user profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
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
      formData.append("avatar", fileInfo);

      const response = await fetch(
        "https://flash-wash-l6v3.onrender.com/api/v1/users/updateAvatar",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${JSON.parse(accessToken)}`,
            // 'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Error updating user profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      {/* <div className="flex gap-4 items-center w-full shadow-md p-4 bg-[#1c212a] rounded-lg ">
        <span className="text-4xl font-bold text-white font-lato">Profile</span>
        <IoIosArrowForward color="white" size={32} />
        <span className="text-4xl font-bold text-white font-lato ">
          {userData &&
            `${
              userData.username[0].toUpperCase() + userData.username.slice(1)
            }`}
        </span>
      </div> */}
      {/* User Details */}
      <div className="w-full md:w-1/2 bg-[#1c212acd] rounded-lg shadow-lg p-8">
        {userData ? (
          <div className="w-full">
            <div className="w-full flex mb-4">
              <div className=" text-center flex justify-center items-center gap-4 w-full">
                <form
                  action=""
                  className="w-full flex justify-center"
                  encType="multipart/form-data"
                >
                  <div className="mt-4 relative w-[100px] h-[100px] rounded-[50%]">
                    {!(selectedImage || userData?.avatar) ? (
                      <>
                        <img
                          src={selectedImage ? selectedImage : userData?.avatar}
                          alt=""
                          className="h-full w-full rounded-[50%] transition duration-300 transform object-center"
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
          
            <hr />
            <br/>
            {editing ? (
              <form>
                <div className="grid grid-cols-2 gap-4 text-left text-white">
                  <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                      type="text"
                      id="fullName"
                      value={updatedUserData?.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="border font-semibold text-gray-500 p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="border font-semibold text-gray-500 p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={updatedUserData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="border font-semibold text-gray-500 p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="street">Street:</label>
                    <input
                      type="text"
                      id="street"
                      value={updatedUserData.address.street}
                      onChange={(e) =>
                        handleAddressInputChange("street", e.target.value)
                      }
                      className="border font-semibold text-gray-500 p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      id="city"
                      value={updatedUserData.address.city}
                      onChange={(e) =>
                        handleAddressInputChange("city", e.target.value)
                      }
                      className="border font-semibold text-gray-500 p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="state">State:</label>
                    <input
                      type="text"
                      id="state"
                      value={updatedUserData.address.state}
                      onChange={(e) =>
                        handleAddressInputChange("state", e.target.value)
                      }
                      className="font-semibold text-gray-500 border p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipcode">Zipcode:</label>
                    <input
                      type="text"
                      id="zipcode"
                      value={updatedUserData.address.zipcode}
                      onChange={(e) =>
                        handleAddressInputChange("zipcode", e.target.value)
                      }
                      className="border font-semibold text-gray-500 p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="country">Country:</label>
                    <input
                      type="text"
                      id="country"
                      value={updatedUserData.address.country}
                      onChange={(e) =>
                        handleAddressInputChange("country", e.target.value)
                      }
                      className="border font-semibold text-gray-500 p-2 w-full rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
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
              <div className="rounded-lg shadow p-3 w-full text-white">
                <h2 className="text-2xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="flex flex-col w-full justify-start">
                  <div className="mb-4 px-2 w-full flex items-center gap-2">
                    <MdEmail color="white" size={20} />
                   
                    <span className="font-semibold  text-white">{userData.email}</span>
                  </div>
                  <div className="mb-4 px-2 w-full flex items-center gap-2">
                    
                  <FaPhoneAlt size={20}/>
                    <span className="font-semibold text-white ">{userData.phoneNumber}</span>
                  </div>
                  <div className="mb-4 px-2 w-full flex items-center gap-2">
                  <FaLocationDot size={20}/>
                    <address className="font-semibold text-white">
                      {userData.address.street}, {userData.address.city},{" "}
                      {userData.address.state}, {userData.address.zipcode},{" "}
                      {userData.address.country}
                    </address>
                  </div>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="bg-[#171e1fb4] text-white py-2 px-4 mt-4 hover:bg-[#0f1715] transition duration-300"
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
    </div>
  );
};

export default Profile;
