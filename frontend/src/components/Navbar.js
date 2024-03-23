import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../utils/AuthContext';
import { FaCircleUser } from "react-icons/fa6";
import logo from '../assets/logo.gif'
const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const {setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{

  },[isLoggedIn])

  return (
    <div className='flex justify-between items-center px-8 shadow-lg bg-[#18201e] text-white text-xl'>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" className='w-24 h-24' loading='lazy' />
        </Link>
      </div>
      <div className="links">
        <ul className='flex gap-8'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contacts</Link></li>
        </ul>
      </div>
      <div className="btns flex gap-4">
        {!isLoggedIn && (
          <>
            <Link to="/api/v1/users/login">
              <button className='btn'>
                Login
              </button>
            </Link>
            <Link to="/api/v1/users/register">
              <button className='btn'>
                Register
              </button>
            </Link>
          </>
        )}
          
        {isLoggedIn && (
          <div className='flex gap-4 items-center'>
          <Link to="/api/v1/users/profile">
            <FaCircleUser/>
          </Link>
            <button className='btn' onClick={() => {
              setIsLoggedIn(!isLoggedIn);
              localStorage.removeItem("accessToken")
              navigate("/api/v1/users/login")
              toast.success("Logged Out");
            }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
