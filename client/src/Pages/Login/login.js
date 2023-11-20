import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./login.css"
import { useState } from 'react';
import { login } from '../../Component/ReduxContainer/apiCall';
export default function Login() {
  const dispatch = useDispatch();
  const {isFetching  , error} = useSelector((state)=>state.user);
  const [email , setemail]= useState('');
  const [password , setPassword] = useState('');
const handleClick = (e)=>{
  e.preventDefault();
  login(dispatch ,{email , password});
}
  return (
    <div className='outer-login-container center'>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-6 center-col'>
          <p className='logo-text'>Con<span className='logo-part'>nect</span></p>
          <p className='intro-text pt-3'>Connect with your <span className='logo-part'>family and friends </span></p>
        </div>
        <div className='col-lg-6 center'>
          <div className='login-form-container'>
          <p className='form-head'>Login Account</p>
          <input type="email" name="" id="email" placeholder='Email' onChange={(e)=>setemail(e.target.value)} className='input-text full-width' />
          <input type="password" placeholder='******' name="" onChange={(e)=>setPassword(e.target.value)} id="password" className='input-text full-width' />
          <div className='pt-4'>
          <button className='login-button btn btn-info full-width' onClick={handleClick}>Login</button>
          </div>
          <Link to={"/forgot/password"}>
          <p className='pt-3'>Forgot password</p>
          </Link>
          <Link to={"/signup"}>
          <p >Create New Account</p>
          </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
