import React from "react";
import Template from "../Template/Template";
import Navbar from "../components/Navbar";
const SignIn = () => {
  return (
    <div className="flex signinDiv pb-16">
      <Navbar />
      <div className="flex items-center justify-center">
        <Template
          title="Welcome Back"
          subTitle={"Sign in to Your account"}
          formtype="login"
        />
      </div>
    </div>
  );
};

export default SignIn;