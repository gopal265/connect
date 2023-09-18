import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../../components/profile/Profile'
import Posts from '../../components/Posts/Posts'
import Navbar from '../../components/common/Navbar/Navbar'
import FriendList from '../../components/friendList/FriendList'
import { useDispatch,useSelector} from 'react-redux'
import {  getUserFriends } from '../../actions/User'
import { getUserPosts } from '../../actions/Posts'

const ProfilePage = () => {

  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const profileUser = useSelector(state=> state.auth.profileUser)
  const dispatch = useDispatch()

  useEffect(()=>{

  dispatch(getUserPosts(userId))
  dispatch(getUserFriends({id:userId,token:token}))
  
  },[profileUser])
  return (
   <div className='home'>
     {!profileUser ? (
      <>
      </>
     ) :(
      < >
      <Navbar />
      <div className='container-fluid pl-3 pr-3  '>
        <div className='row'>
          
          <div className='col-md-4 col-sm-4 '>
          <Profile isProfile={true} />
          <FriendList isProfile={true}/>
          </div>
          
          <div className='col-md-4 col-sm-6'>
            <Posts isProfile={true} />
          </div>
         
        </div>
          
        </div>
        
      
             
    </>
     )}
      
  </div>
  )
}

export default ProfilePage
