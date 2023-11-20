import React from 'react'
import image1 from "../Images/image3.jpg";
import image2 from "../Images/image2.jpg";
import image5 from "../Images/image5.jpg";
import image4 from "../Images/image4.jpg";
import image6 from "../Images/image6.jpg";
import image7 from "../Images/image1.jpg";
import addFriends from "../Images/add-user.png";
import UserToFollow from "../Images/afterFollowImg.png"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Follow({userdetails}) {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  // console.log(user);
  let id = user?.other?._id;
  // console.log(id);

    const accessToken = user?.accessToken;
    const [Follow , setFollow] = useState(addFriends);
    const handleFollow= async(e)=>{
            await fetch(`http://localhost:5000/api/user/following/${userdetails._id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , token:accessToken} , body:JSON.stringify({user:`${id}`})})
            setFollow(UserToFollow);
      }
  return (
          <div className=''>
          <div className='center-sb'>
            <Link to={`/Profile/${userdetails._id}`}>
            <div className='center'>
              <img src={`${userdetails.profile}`} className="Profileimage" alt="" />
              <div className='reccomend-details ps-2 '>
                <p className='m-0 pt-2'>{userdetails.username}</p>
                <p  className=''>Suggested for you</p>
              </div>
            </div>
            </Link>
            <div className='follow-icon-container center me-2' onClick={e=>handleFollow(userdetails._id)}>
              <img src={`${Follow}`} className='follow-icon' alt=""  />
            </div>
          </div>
        </div>
  )
}
