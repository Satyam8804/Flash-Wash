import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../utils/AuthContext';
import { FaCircleUser } from "react-icons/fa6";
import logo from '../images/logo_new.png'

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const {setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(()=>{

  },[isLoggedIn])

  return (
    <div className='flex justify-between items-center px-8 text-lg text-white myNav'>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" className='w-40 h-30' loading='lazy' />
        </Link>
      </div>
      <div className="links">
        <ul className='flex gap-8'>
          <li className='text-xl '><Link to="/" >Home</Link></li>
          <li className='text-xl '><Link to="/about">About</Link></li>
          <li className='text-xl '><Link to="/contact">Contacts</Link></li>
        </ul>
      </div>
      <div className="btns flex gap-4">
        {!isLoggedIn && (
          <>
            <Link to="/api/v1/users/login">
              <button className='btn text-xl'>
                Login
              </button>
            </Link>
            <Link to="/api/v1/users/register">
              <button className='btn text-xl'>
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
