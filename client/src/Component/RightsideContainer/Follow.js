import React from 'react'
import addFriends from "../Images/add-user.png";
import UserToFollow from "../Images/afterFollowImg.png"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
export default function Follow({ userdetails }) {

  const { user,token } = useSelector((state) => state.user);
  const [Follow, setFollow] = useState(addFriends);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  }
  const handleFollow = async (e) => {
    await fetch(`http://localhost:5000/api/user/following/${userdetails._id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: token }, body: JSON.stringify({ user: `${user._id}` }) })
    setFollow(UserToFollow);
    window.location.reload();
  }
  
  return (
    <div className=''>
      <div className='center-sb'>
        <div onClick={()=>navigate(`/Profile/${userdetails._id}`)}>
          <div className='center'>
          {
                        !imageError  ?
                          (
                            <img src={`${userdetails?.profile}`} className="profileimage" alt="" onError={handleImageError} />
                          ) :
                          (
                            <div className='imagebackup'>{userdetails?.username ? userdetails?.username.substring(0, 1) : ""}</div>
                          )
                      }
            <div className='reccomend-details ps-2 '>
              <p className='m-0 text suggestname'>{userdetails.username}</p>
            </div>
          </div>
        </div>
        <div className='follow-icon-container center me-2' onClick={e => handleFollow(userdetails._id)}>
          <img src={`${Follow}`} className='follow-icon' alt="" />
        </div>
      </div>
    </div>
  )
}
