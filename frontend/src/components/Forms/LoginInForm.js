import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../utils/AuthContext";
import Loader from "../Loader";

const LoginInForm = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  // console.log(role)

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoader(true);

    try {
      const response = await fetch("https://flash-wash-l6v3.onrender.com/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);

        localStorage.setItem("currentUser", JSON.stringify(data?.data));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(data?.data?.accessToken)
        );
        localStorage.setItem("role", JSON.stringify(data?.data?.user?.role));
        setLoader(false);
        toast.success(data?.message);
        if (data?.data?.user?.role === "employee") {
          navigate("/api/v1/employee");
        } else if (data?.data?.user?.role === "admin") {
          navigate("/api/v1/admin");
        } else {
          navigate("/", { state: { loginProp: true } });
        }
      } else {
        toast.error("Form submission failed:");
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full font-lato "
      onSubmit={submitHandler}
    >
      <label className="flex flex-col gap-2 items-start">
        <span className="text-sm text-white">
          Email or Username <sup>*</sup>
        </span>
        <input
          type="text"
          required
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email or Username"
          name="email"
          className="h-10 rounded px-4 text-sm border w-full"
        />
      </label>

      <label className="flex flex-col gap-1 items-start">
        <span className="text-sm text-white ">
          Password <sup>*</sup>
        </span>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter Password"
            name="password"
            className="h-10 rounded px-4 text-sm border w-full"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </div>
        
      </label>

      <button className="h-8 px-4 text-white border-none bg-[#373737] hover:bg-black mt-4 relative">
        {loader && (
          <Loader className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
        {!loader && "Login"}
      </button>
    </form>
  );
};

export default LoginInForm;