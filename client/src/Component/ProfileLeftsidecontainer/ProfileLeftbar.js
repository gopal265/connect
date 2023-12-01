import React, { useEffect } from 'react'
import "./profileleftbar.css";
import image from "../Images/Profile.png";
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {  useLocation, useNavigate } from 'react-router-dom';
import Followers from '../Followers/Followers';
import Following from '../Following/Following';
export default function ProfileLeftbar() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const { user, token } = useSelector((state) => state.user);
  console.log(user.Following)
  const [users, setuser] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${id}`)
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [id])
  let followersCounter = users?.Followers?.length;
  let followingCounter = users?.Following?.length;

  const [Followinguser, setFollowinguser] = useState([]);

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  }


  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/following/${id}`);
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error")
      }
    }
    getFollowing();
  }, [id])

  const handleFollow = async () => {
    if (user.Following.includes(id)) {
      await fetch(`http://localhost:5000/api/user/following/${id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: token }, body: JSON.stringify({ user: `${user._id}` }) })
      window.location.reload(true)
    } else {
      await fetch(`http://localhost:5000/api/user/following/${id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: token }, body: JSON.stringify({ user: `${user._id}` }) })
      window.location.reload(true)
    }
  }


  return (
    <div className='container-fluid  pt-4 full-width px-0'>
      <div className='profile-container px-2 py-2 full-width'>
        <img src={`${image}`} className="ProfilepageCover full-width" alt="" />
        <div className='profile-head absolute' >
        {             
                    users.profile ?    !imageError ?
                          (
                            <img src={`${users?.profile}`} className="profileimage" alt="" onError={handleImageError} />
                          ) :
                          (
                            <div className='imagebackup'>{users.username ? users.username.substring(0, 1) :""}</div>
                          )
                          : <></>
                      }          <div className='center-col ps-2'>
            <p className='text-white m-0'>{users.username}</p>
            <p className='text-success'>{users.work}</p>
          </div>
        </div>
        <div className='center-sb mt-5 profile-midpart'>
          <p >Followings</p>
          <p>{followingCounter}</p>
        </div>

        <div className='center-sb profile-midpart'>
          <p >Followers</p>
          <p >{followersCounter}</p>
        </div>

        <div >
          <h6 >User bio</h6>
          <p >{users.about ? users.about : "Hi ,All lets connect"}</p>
        </div>
        {user._id !== id ? <div onClick={handleFollow}><button className='btn btn-success full-width'>{user?.Following.includes(id) ? "Unfollow" : "Follow"}</button></div> : <div><button className='btn btn-success full-width' onClick={()=> navigate("/updateprofile")}>Edit Bio</button></div>}


      </div>

      <div className='profile-container px-2 py-2 full-width mt-3'>
        <div className='center-sb px-2'>
          <h3>Followings</h3>

          <p className='see-all'>See all</p>
        </div>
        <div style={{ display: 'flex', flexWrap: "wrap", marginLeft: 5 }}>

          {Followinguser.length !== 0 ?  
          (Followinguser.map((item) => (
              <Following item={item} />)
           )
           ) : 
              
              (
              <div className='py-4 text-center'>Following no one</div>
              )
          }



        </div>
      </div>

      <div className='d-block d-md-none'>
        <Followers />
      </div>

    </div>
  )
}
