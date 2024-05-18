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
    setShowMenu(!showMenu); // Toggle the value of showMenu
  };

  return (
    <div className="flex justify-between items-center px-8 text-lg text-white myNav">
      <FiMenu
        size={32}
        className="sm:hidden block"
        onClick={toggleMenu} // Call toggleMenu when the icon is clicked
      />
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" className="w-40 h-32" loading="lazy" />
        </Link>
      </div>
      <div className={`${showMenu ? "block" : "hidden"} sm:block hidden animateBorder` }>
        <ul className="flex gap-16">
          <li className="text-2xl ">
            <Link to="/">Home</Link>
          </li>
          <li className="text-2xl ">
            <Link to="/about">About</Link>
          </li>
          <li className="text-2xl ">
            <Link to="/contact">Contacts</Link>
          </li>
          <li className="text-2xl ">
            <Link to="/service">Services</Link>
          </li>
        </ul>
      </div>
      <div className="btns flex gap-12">
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
              <FaCircleUser />
            </Link>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
