import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../utils/AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import logo from "../images/logo_new.png";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    navigate("/api/v1/users/login");
    toast.success("Logged Out");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex justify-between items-center px-8 text-lg text-white  py-4">
      <FiMenu
        size={32}
        className="sm:hidden block cursor-pointer"
        onClick={toggleMenu}
      />
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" className="w-40 h-32" loading="lazy" />
        </Link>
      </div>
      <div className={`${showMenu ? "block" : "hidden"} sm:block animateBorder`}>
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-16">
          <li className="text-2xl relative group ">
            <Link to="/">Home</Link>
            <span className="absolute  inset-x-0 -bottom-1 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </li>
          <li className="text-2xl relative group">
            <Link to="/about">About</Link>
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </li>
          <li className="text-2xl relative group">
            <Link to="/contact">Contacts</Link>
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </li>
          <li className="text-2xl relative group">
            <Link to="/service">Services</Link>
            <span className="absolute inset-x-0 -bottom-1 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </li>
        </ul>
      </div>
      <div className="btns flex gap-4 sm:gap-12">
        {!isLoggedIn ? (
          <>
            <Link to="/api/v1/users/login">
              <button className="btn text-2xl">Login</button>
            </Link>
            <Link to="/api/v1/users/register">
              <button className="btn text-2xl">Register</button>
            </Link>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/api/v1/users/profile">
              <FaCircleUser className="text-2xl" />
            </Link>
            <button className="btn text-2xl" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;