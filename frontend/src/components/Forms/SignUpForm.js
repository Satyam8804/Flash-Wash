import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import Loader from '../Loader';

const SignUpForm = () => {
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(AuthContext)
  const [loader ,setLoader] = useState(false)

  const [formData, setFormData] = useState({
    fName: "",
    LName: "",
    email: "",
    password: "",
    cPass: "",
    username:"",
    phoneNumber:"",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    avatar :""
  });
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value
      };
    });
  }

  const  handleSubmit=async(e)=>{
    e.preventDefault();
    if (formData.password !== formData.cPass) {
      toast.error("Password doesn't match");
      return;
    }
    setLoader(true)
    const accData = {
      ...formData
    };
    console.log(accData)

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/register',{
        method :'POST',
        headers :{
          'Content-Type' : 'application/json'
        },
        body :JSON.stringify(accData)
      })


      if (response.ok) {
        const data = await response.json();
        //setIsLoggedIn(true);
        //localStorage.setItem("currentUser",JSON.stringify(data?.data))
        //localStorage.setItem("accessToken",JSON.stringify(data?.data?.accessToken))
        setLoader(false)
        toast.success(data?.message);
        navigate('/api/v1/users/login')
        console.log('Form submitted successfully:', data);
      } else {
        toast.error("Form submission failed:");
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);

    }
  }

  return (
    <div className="flex flex-col w-full">
      <form className="text-gray-500 text-sm flex flex-col" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <div className="w-1/2">
            <label>
              <p>First Name <sup>*</sup></p>
              <input
                required
                placeholder='Enter First Name'
                type="text"
                name='fName'
                value={formData.fName}
                onChange={changeHandler}
                className="h-10 w-full rounded px-4 border font-semibold text-sm"
              />
            </label>
          </div>
          <div className='w-1/2'>
            <label>
              <p>Last Name <sup>*</sup></p>
              <input
                required
                placeholder='Enter Last Name'
                type="text"
                name='LName'
                value={formData.LName}
                onChange={changeHandler}
                className="h-10 w-full rounded px-4 border font-semibold text-sm"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
        <label className="block mt-4">
          <p>Username <sup>*</sup></p>
          <input
            required
            placeholder='Username'
            type="username"
            name='username'
            value={formData.username}
            onChange={changeHandler}
            className="h-10 w-full rounded px-4 border font-semibold text-sm"
          />
        </label>
        <label className="block mt-4">
          <p>Email Id <sup>*</sup></p>
          <input
            required
            placeholder='Enter Email Id'
            type="email"
            name='email'
            value={formData.email}
            onChange={changeHandler}
            className="h-10 w-full rounded px-4 border font-semibold text-sm"
          />
        </label>
        <label className="block mt-4">
          <p>Mob. No : <sup>*</sup></p>
          <input
            required
            placeholder='Phone Number'
            type="phoneNumber"
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={changeHandler}
            className="h-10 w-full rounded px-4 border font-semibold text-sm"
          />
        </label>
        <div className="password">
          <label className=" mt-4 w-full">
            <p>Password <sup>*</sup></p>
            <div className="relative">
              <input
                required
                placeholder='Enter Password'
                type={showPassword ? "text" : "password"}
                name='password'
                value={formData.password}
                onChange={changeHandler}
                className="h-10 w-full rounded px-4 border font-semibold text-sm"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setShowPassword(prev => !prev);
                }}
              >
                {showPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}
              </span>
            </div>
          </label>
          <label className="block mt-4 w-full">
            <p>Confirm Password <sup>*</sup></p>
            <div className="relative">
              <input
                required
                placeholder='Confirm Password'
                type={showPassword ? "text" : "password"}
                name='cPass'
                value={formData.cPass}
                onChange={changeHandler}
                className="h-10 w-full rounded px-4 border font-semibold text-sm"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  setShowPassword(prev => !prev);
                }}
              >
                {showPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}
              </span>
            </div>
          </label>
          <button className="w-full h-8 px-4 text-white border-none bg-[#0B4F6C] hover:bg-[#0d5c7eeb] mt-4 relative">
          {loader && <Loader className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
          {!loader && 'Register'}
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
