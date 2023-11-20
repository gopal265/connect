import React, { useEffect } from 'react'
import "./profileleftbar.css";
import image from "../Images/Profile.png";
import image2 from "../Images/image2.jpg"
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
export default function ProfileLeftbar() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const [Follow, setUnFollow] = useState([user.other.Following.includes(id) ? "Unfollow" : "Follow"]);
  const accessToken = user.accessToken;
  console.log(accessToken)
  let username = user?.other?.username;

  const [users, setuser] = useState([]);
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
  }, [])
  let followersCounter = users?.Followers?.length;
  let followingCounter = users?.Following?.length;

  const [Followinguser, setFollowinguser] = useState([]);
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
  }, [])

  const handleFollow = async () => {
    if (Follow === "Follow") {
      await fetch(`http://localhost:5000/api/user/following/${id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: accessToken }, body: JSON.stringify({ user: `${user.other._id}` }) })
      setUnFollow("UnFollow")
    } else {
      await fetch(`http://localhost:5000/api/user/following/${id}`, { method: 'PUT', headers: { 'Content-Type': "application/JSON", token: accessToken }, body: JSON.stringify({ user: `${user.other._id}` }) })
      setUnFollow("Follow")
    }
  }

  console.log(Followinguser)

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
          <p >{user.about ? users.about : "Hi ,All lets connect"}</p>
        </div>
        {user.other._id !== id ? <div onClick={handleFollow}><button className='btn btn-success full-width'>{Follow}</button></div> : <div><button  className='btn btn-success full-width'>Edit Bio</button></div>}


      </div>

      <div className='profile-container px-2 py-2 full-width mt-3'>
        <h3>Followings</h3>
        <div className='center-sb px-2'>
          <p >Friends</p>
          <p className='see-all'>See all</p>
        </div>
        <div style={{ display: 'flex', flexWrap: "wrap", marginLeft: 5 }}>
          {Followinguser.map((item) => (
            <Link to={`/Profile/${item._id}`}>
              <div style={{ marginLeft: 4, cursor: "pointer" }} key={item._id}>
                <img src={`${item.profile}`} className="friendimage" alt="" />
                <p style={{ marginTop: -2 }}>{item.username}</p>
              </div>
            </Link>
          ))}



        </div>
      </div>

    </div>
  )
}
