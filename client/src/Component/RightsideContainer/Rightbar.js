import React, { useEffect } from 'react'
import "./rightbar.css"
import axios from 'axios';
import { useState } from 'react';
import Follow from './Follow';
import { useSelector } from 'react-redux';
export default function Rightbar() {
  const {user} = useSelector((state)=>state.user);
 const [users , setUsers] = useState([]);
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res  = await axios.get(`https://connect-01yh.onrender.com/api/user/all/user/${user._id}`)
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  return (
    <div className=''>
      <div className=''>
      </div>

      <div className='rightcontainer2'>
        <h3 style={{textAlign:"start" , marginLeft:"10px"}}>Suggested for you</h3>
        {users.map((item)=>(
          <Follow userdetails={item}/>
          ))}
        

        

      </div>


    </div>
  )
}
