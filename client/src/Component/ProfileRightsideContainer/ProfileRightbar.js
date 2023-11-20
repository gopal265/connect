import React, { useEffect, useState } from 'react'
import "./profilerightbar.css"
import axios from 'axios';
import Follow from '../RightsideContainer/Follow';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
export default function ProfileRightbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  let idforSuggest = user?.other?._id
  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/followers/${id}`);
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error")
      }
    }
    getFollowing();
  }, [])

  console.log(Followinguser)

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/all/user/${idforSuggest}`)
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
      <div className='followers-container full-width p-2'>
        <h3>Followers</h3>
        <div className='pt-3'>
          {Followinguser.map((item) => (
            <div>
              <div className='center-sb'>
                <img src={`${item.profile}`} className="Friendsimage" alt="" />
                <p >{item.username} </p>
              </div>
            </div>
          ))}



        </div>

      </div>

      <div className='followers-container mt-3 full-width'>
        <h3>Suggested for you</h3>
        <div className='pt-3'>
          {users.map((item) => (
            <Follow userdetails={item} />
          ))}
        </div>
      </div>


    </div>
  )
}
