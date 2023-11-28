import React, { useEffect } from 'react'
import "./profileleftbar.css";
import image from "../Images/Profile.png";
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Followers from '../Followers/Followers';
export default function ProfileLeftbar() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const {user,token} = useSelector((state) => state.user);
  const [Follow, setUnFollow] = useState([user?.Following.includes(id) ? "Unfollow" : "Follow"]);

  const [users, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`https://connect-01yh.onrender.com/api/user/post/user/details/${id}`)
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  let followersCounter = users?.Followers?.length;
  let followingCounter = users?.Following?.length;

  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(`https://connect-01yh.onrender.com/api/post/following/${id}`);
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error")
      }
    }
    getFollowing();
  }, [id])

  const handleFollow = async () => {
    if (Follow === "Follow") {
      await fetch(`https://connect-01yh.onrender.com/api/user/following/${id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: token }, body: JSON.stringify({ user: `${user._id}` }) })
      setUnFollow("UnFollow")
    } else {
      await fetch(`https://connect-01yh.onrender.com/api/user/following/${id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: token }, body: JSON.stringify({ user: `${user._id}` }) })
      setUnFollow("Follow")
    }
  }


  return (
    <div className='container-fluid  pt-4 full-width px-0'>
      <div className='profile-container px-2 py-2 full-width'>
        <img src={`${image}`} className="ProfilepageCover full-width" alt="" />
        <div className='profile-head absolute' >
          <img src={`${users.profile}`} className="Profilepageimage" alt="" />
          <div className='ps-2'>
            <p>{users.username}</p>
            <p>{users.work}</p>
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
        {user._id !== id ? <div onClick={handleFollow}><button className='btn btn-success full-width'>{ Follow === "Follow" ? "Unfollow" : "Follow"}</button></div> : <div><button  className='btn btn-success full-width'>Edit Bio</button></div>}


      </div>

      <div className='profile-container px-2 py-2 full-width mt-3'>
        <h3>Followings</h3>
        <div className='center-sb px-2'>
          <p >Friends</p>
          <p className='see-all'>See all</p>
        </div>
        <div style={{ display: 'flex', flexWrap: "wrap", marginLeft: 5 }}>
          {Followinguser.map((item) => (
            <Link to={location.pathname.includes("Profile") ? `/Profile/${item._id}` : `/profileinfo/${item._id}`} >
              <div style={{ marginLeft: 4, cursor: "pointer" }} key={item._id}>
                <img src={`${item.profile}`} className="friendimage" alt="" />
                <p style={{ marginTop: -2 }}>{item.username}</p>
              </div>
            </Link>
          ))}



        </div>
      </div>
      
      <div className='d-block d-md-none'>
            <Followers />
      </div>

    </div>
  )
}
