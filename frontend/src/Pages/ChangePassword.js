import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch('https://flash-wash-l6v3.onrender.com/api/v1/users/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(accessToken)}`
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        toast.success(data.message)
        setOldPassword('');
        setNewPassword('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    
    <div className="max-w-md mx-auto my-8">
    <form onSubmit={handleSubmit} className="bg-[#1c212acd] shadow-md  rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl mb-4 font-semibold">Change Password</h2>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="oldPassword">
          Old Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="oldPassword"
          type="password"
          name="oldPassword"
          value={oldPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="newPassword">
          New Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="newPassword"
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Change Password
        </button>
      </div>
    </form>
  </div>
  )
}

export default ChangePassword