import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import Avatar from '../common/avatar/Avatar'
import "./Profile.css"
import { likedProfile } from '../../actions/User'
import LikeProfile from '../likeProfile/LikeProfile'

const Profile = ({isProfile=false}) => {
    console.log("profile")
    const { user } = useSelector(state => state.auth)
    const friendsIds = useSelector(state => state.friends.friendsIds)
    const profileUser  = useSelector(state => state.auth.profileUser)
    const currentUser = isProfile ? profileUser : user
    const dispatch = useDispatch()
    
   

    const navigate = useNavigate()
    // useEffect(()=>{
    //     if (!currentUser) {
    //         navigate("/")
    //     }
    //     if (isProfile){
    //         setCurrenUser(profileUser)
    //     }
       
      
    // },[isProfile,user])

   

    return (
        
        <div className='profile-wrapper'>
            
            <div className='profile-head'>

                <div className='profile-avatar'>
                    <Avatar userName={currentUser.userName} picture={currentUser.picture} />
                    <div className='profile-avatar-content'>
                        <h5 className='profile-avatar-name'>{currentUser.userName}</h5>
                        <p>{friendsIds.length} friends</p>
                    </div>
                </div>
                
               <LikeProfile  isProfile={isProfile}/>
                
            </div>
            <hr />
            {
                currentUser.location || currentUser.occupation ? (
                    <div className='profile-info'>
                        <div>
                            <i class="fa-solid fa-location-dot"></i>
                            <p>{currentUser.location}</p>
                        </div>
                        <div>
                            <i class="fa-solid fa-briefcase"></i>
                            <p>{currentUser.occupation}</p>
                        </div>

                    </div>

                ) : (
                    <></>
                )
            }

            <hr />
            <div>
                {/* <div>Profile Views :  {currentUser.viewedProfile.length}</div> */}
                <div>Profile Likes :  {currentUser.impressions.length}</div>
            </div>
            {currentUser.socialProfile.length !==0 ? (

                <div>
                    <h6>Social Meida Profiles</h6>
                    <div className='social-profiles-list'>
                        {currentUser.socialProfile.map(profile =>{
                            <>
                            <div className='profile-list-item'>
                            <p><i class="fa-brands fa-instagram"></i></p>
                            <p>{profile}</p>
                        </div>
                        <i class="fa-solid fa-pencil"></i>
                        </>
                        })}
                        
                        </div>
                </div>

            ) : (
                <></>
            )

            }



        </div>

    )
}

export default React.memo(Profile)
