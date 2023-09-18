import React from 'react'
import {  useSelector } from 'react-redux'
import Friend from '../friend/Friend'

const FriendList = () => {
    const friends = useSelector(state => state.friends.friends)
  return (
    <div className='friends-list  '>
      <h5>Friends</h5>
      { friends ? friends.map(friend =>(

        <Friend key={friend._id} friend={friend} />
      )):
      <></>}
      {console.log(friends)}
    </div>
  )
}

export default FriendList
