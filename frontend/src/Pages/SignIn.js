import React, { useContext } from 'react'
import Template from '../Template/Template'
const SignIn = () => {
  
  return (
    <div className='flex items-center justify-center'>
      <Template
      title="Welcome Back"
      subTitle={"Sign in to Your account"}
      formtype="login"
      />
    </div>
  )
}

export default SignIn