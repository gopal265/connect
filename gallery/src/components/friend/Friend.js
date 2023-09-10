import React, { useEffect, useState } from 'react'
import Avatar from "../common/avatar/Avatar"
import "./Friend.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addRemoveFriend } from '../../actions/User'
import {setAddRemoveFriends} from "../../state/index"
const Friend = ({ friend }) => {


    const [isFriend, setIsFriend] = useState(true)
    const dispatch = useDispatch()
    const { user: currentUser } = useSelector(state => state.auth)
    const  addRemoveFriends = useSelector(state=>state.auth.status.addRemoveFriends)
    const token = useSelector(state => state.auth.token)

    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(addRemoveFriend({ id: currentUser._id, friendId: friend._id,token:token }))
 
     
    }
    useEffect(()=>{
        if(addRemoveFriends){
            console.log("AddRemove is pending")
        }
        else{
            setIsFriend(!isFriend)
            dispatch(setAddRemoveFriends())
        }
    },[addRemoveFriends,isFriend])
    return (
        <div className='friend-wrapper profile-head'>
            {console.log(friend)}
            <div className='profile-avatar'>
                <div onClick={() => navigate(`/profile/${friend._id}`)}><Avatar userName={friend.userName} picture={friend.picture}/></div>
                <div className='profile-avatar-content'>
                    <h6 className='profile-avatar-name'>{friend.userName}</h6>
                    <p> {friend.occupation} </p>
                </div>
            </div>

            <div onClick={handleClick}>
                {
                isFriend ? (
                    <div>
                        <span ><i class="fa-solid fa-user-minus"></i></span>
                    </div>
                ) : (
                    <div>
                        <span ><i class="fa-solid fa-user-plus"></i></span>
                    </div>
                )
}
                </div>
            
        </div>
    )
}

export default Friend
