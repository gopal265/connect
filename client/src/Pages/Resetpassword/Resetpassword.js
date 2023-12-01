import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./Resetpassword.css"
export default function Resetpassword() {
  const location = useLocation();
  const code = location.search.split("?")[1];
  console.log(code);
  const [password , setpassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const handleClick = async(e)=>{
    e.preventDefault();
    
    if(confirm !== password){
      alert("Password Mismatch");
      return;
    }
    await fetch(`http://localhost:5000/api/user/reset/password?${code}` , {method:"PUT" , headers:{'Content-Type':"application/JSON"} , body:JSON.stringify({password:password})}).then((data)=>{
       navigate("/login")
    })
    .catch(err =>{
      setError("Password reset failed")
    })
  };
  return (
    <div className='full-width screenH center'>
            <div className='resetcontainer'>
                <p className='resethead'>Enter Your New Password</p>
                <form >
                    <input type={"password"} placeholder="**********" className='resetInput'  onChange={(e)=>setpassword(e.target.value)}/>
                    <input type={"password"} placeholder="Confirm Password" className='resetInput'  onChange={(e)=>setConfirm(e.target.value)}/>

                    <button className='btn btn-info' onClick={handleClick}>Set Password</button>
                </form>
            </div>
        </div>
  )
}
