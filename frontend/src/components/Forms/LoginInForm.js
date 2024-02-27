import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { AuthContext } from '../../utils/AuthContext';
import Loader from '../Loader';


const LoginInForm = () => {
  const {setIsLoggedIn , setToken } = useContext(AuthContext)
  const [loader ,setLoader] = useState(false)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

  const  submitHandler= async(event)=>{
    event.preventDefault();
    setLoader(true)
    try {
      
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        localStorage.setItem("currentUser",JSON.stringify(data?.data))
        localStorage.setItem("accessToken",JSON.stringify(data?.data?.accessToken))

        setLoader(false)
        toast.success(data?.message);
        navigate('/')
        console.log(data)
      } else {
        toast.error("Form submission failed:");
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <form className="flex flex-col gap-4 w-full font-lato" onSubmit={submitHandler}>
      <label className="flex flex-col gap-2">
        <span className='text-sm text-slate-500'>Email or Username <sup>*</sup></span>
        <input
          type="text"
          required
          value={formData.email}
          onChange={changeHandler}
          placeholder='Enter Email or Username'
          name='email'
          className="h-10 rounded px-4 text-sm border"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className='text-sm text-slate-500'>Password <sup>*</sup></span>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={changeHandler}
            placeholder='Enter Password'
            name='password'
            className="h-10 rounded px-4 text-sm border w-full"
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
        <Link to="#" className="block mt-2">
          <span className='text-sm text-blue-500 font-bold'>Forgot Password ?</span>
        </Link>

      </label>

        <button className="h-8 px-4 text-white border-none bg-[#0B4F6C] hover:bg-[#0d5c7eeb] mt-4 relative">
        {loader && <Loader className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
        {!loader && 'Login'}
      </button>
    </form>
  );
};

export default LoginInForm;
