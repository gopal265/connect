import { async } from '@firebase/util';
import React, { useState } from 'react'

export default function Forgotpassword() {
  const [email , setEmail] = useState('');

const handleclick = async(e)=>{
  e.preventDefault();
  await fetch(`http://localhost:5000/api/user/forgot/password` , {method:"POST" , headers:{"Content-Type":"application/JSON"} , body:JSON.stringify({email:email})}).then(()=>{
    alert("We sent you a token email")
  }).catch(()=>{
    alert("Fail to proccess")
  })
}
  return (
    <div className='full-width screenH center' >
            <div className='resetcontainer'>
                <p className='resethead' >Enter your Email</p>
                <form >
                    <input type={"text"} placeholder="Email" className='resetInput' onChange={(e)=>setEmail(e.target.value)} />
                    <button className='btn btn-info' onClick={handleclick}>Send</button>
         
                </form>
            </div>
        </div>
  )
}
