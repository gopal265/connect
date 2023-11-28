import React, { useEffect, useState } from 'react'
import "./profilerightbar.css"
import axios from 'axios';
import Follow from '../RightsideContainer/Follow';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Followers from '../Followers/Followers';
export default function ProfileRightbar() {
  const {user,token} = useSelector((state) => state.user);
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`https://connect-01yh.onrender.com/api/user/all/user/${user._id}`)
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  console.log(users)

  return (
    <div className='container-fluid full-width py-4 px-0'>
      <Followers />

      <div className='followers-container mt-3 full-width ps-2'>
        <h5>Suggested for you</h5>
        <div className='pt-3'>
          {users.map((item) => (
            <Follow userdetails={item} />
          ))}
        </div>
      </div>


    </div>
  )
}
