import React from 'react'
import { likedProfile } from '../../actions/User'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const LikeProfile = ({isProfile}) => {

    const { user,token } = useSelector(state => state.auth)
    const profileUser  = useSelector(state => state.auth.profileUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleProfileLike = () =>{
        dispatch(likedProfile({id:profileUser._id,userLikedId:user._id,token:token}))
    }
  return (
    <div>
       {
                    isProfile && user._id !== profileUser._id ?(
                            <div>
                            <div onClick={handleProfileLike}><i class={`fa-solid fa-thumbs-up ${profileUser.impressions.includes(user._id) ? "blue" : ""}` }></i></div>
                            </div>
                    ) : (
                        <div onClick={()=> navigate('/updateProfile')} >
                        <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                    )
                }
    </div>
  )
}

export default LikeProfile
