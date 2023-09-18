import React, { useEffect, useState } from 'react'
import Avatar from "../common/avatar/Avatar"
import "./Friend.css"
import { useNavigate } from 'react-router-dom'
import AddRemoveFriend from '../AddRemoveFriend/AddRemoveFriend'
import { getUser } from '../../actions/User'
import { useDispatch, useSelector } from 'react-redux'
const Friend = ({ friend }) => {

    const { user: currentUser } = useSelector(state => state.auth)
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const navigateTOProfile = () =>{
  
        dispatch(getUser({id:friend._id,token:token}))
          navigate(`/profile/${friend._id}`)
      
     }

    return (
        
        <div className='friend-wrapper profile-head mb-3'>
            {console.log(friend)}

            <div className='profile-avatar'>
                <div onClick={navigateTOProfile}><Avatar userName={friend.userName} picture={friend.picture}/></div>
                <div className='profile-avatar-content'>
                    <h6 className='profile-avatar-name'>{friend.userName}</h6>
                    <p> {friend.occupation} </p>
                </div>
            </div>
            {
                currentUser._id !== friend._id && <AddRemoveFriend postUserId={friend._id} />
            }
            
            
        </div>
    )
}

export default React.memo(Friend)