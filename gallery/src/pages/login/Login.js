import React, { useState } from 'react'
import "./Login.css"
import Navbar from '../../components/common/Navbar/Navbar'
import LoginForm from '../../components/login/loginForm/LoginForm'


const Login = () => {
  const [signUp, setSignUp] = useState(false)
  return (
    <div className='login-page '>
      <Navbar signUp={signUp} setSignUp={setSignUp}  />
      <LoginForm signUp={signUp} setSignUp={setSignUp} />


    </div>
  )
}

export default Login
