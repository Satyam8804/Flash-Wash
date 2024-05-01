import React from "react";
import Template from "../Template/Template";
import Navbar from "../components/Navbar";
const SignUp = () => {
  return (
    <div className="flex signupDiv pb-8 flex-column">
      <Navbar />
      <div className="flex items-center justify-center p-4">  
        <Template
          title="Register Here"
          subTitle={"Create A New Account"}
          formtype="signup"
        />
      </div>
    </div>
  );
};

export default SignUp;