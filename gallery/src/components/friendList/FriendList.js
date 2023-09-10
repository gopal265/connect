import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Friend from '../friend/Friend'
import { getUserFriends } from '../../actions/User'

const FriendList = ({isProfile=false}) => {
    const {user : currentUser} = useSelector(state => state.auth)
    const token = useSelector(state=> state.auth.token)
    const friends = useSelector(state => state.auth.friends)
    const dispatch = useDispatch()
  
  useEffect(() =>{
    dispatch(getUserFriends({id:currentUser._id,token:token}))
  },[currentUser.friends])
    

   
  return (
    <div className='friends-list  '>
      <h5>Friends</h5>
      { friends ? friends.map(friend =>(

        <Friend friend={friend} />
      )):
      <></>}
      {console.log(friends)}
    </div>
  )
}

export default FriendList
