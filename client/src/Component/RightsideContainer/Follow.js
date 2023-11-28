import React from 'react'
import addFriends from "../Images/add-user.png";
import UserToFollow from "../Images/afterFollowImg.png"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Follow({ userdetails }) {

  const { user,token } = useSelector((state) => state.user);
  const [Follow, setFollow] = useState(addFriends);

  const handleFollow = async (e) => {
    await fetch(`https://connect-01yh.onrender.com/api/user/following/${userdetails._id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: token }, body: JSON.stringify({ user: `${user._id}` }) })
    setFollow(UserToFollow);
    window.location.reload();
  }
  
  return (
    <div className=''>
      <div className='center-sb'>
        <Link to={`/Profile/${userdetails._id}`}>
          <div className='center'>
            <img src={`${userdetails.profile}`} className="Profileimage" alt="" />
            <div className='reccomend-details ps-2 '>
              <p className='m-0 pt-2'>{userdetails.username}</p>
              <p className=''>Suggested for you</p>
            </div>
          </div>
        </Link>
        <div className='follow-icon-container center me-2' onClick={e => handleFollow(userdetails._id)}>
          <img src={`${Follow}`} className='follow-icon' alt="" />
        </div>
      </div>
    </div>
  )
}
