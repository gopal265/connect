import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../../components/profile/Profile'
import Posts from '../../components/Posts/Posts'
import Navbar from '../../components/common/Navbar/Navbar'
import FriendList from '../../components/friendList/FriendList'
import { useDispatch,useSelector} from 'react-redux'
import { getUser, getUserFriends } from '../../actions/User'
import { getUserPosts } from '../../actions/Posts'
const ProfilePage = () => {

  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const profileUser = useSelector(state=> state.auth.profileUser)
  const dispatch = useDispatch()

  useEffect(()=>{
  dispatch(getUser({id:userId,token:token}))
  dispatch(getUserPosts(userId))
  dispatch(getUserFriends({id:userId,token:token}))
   
  },[])
  return (
   <>
     {!profileUser ? (
      <>
      </>
     ) :(
      < >
      <Navbar />
      <div className='container  '>
        <div className='row'>
          <div className='col-4 home-item'>
          <Profile isProfile={true} />
          </div>
          <div className='col-4 home-item'>
            <Posts isProfile={true} />
          </div>
         
            <FriendList isProfile={true}/>
          </div>
          
        </div>
        {profileUser.userName}
        
      
             
    </>
     )}
      
  </>
  )
}

export default ProfilePage
