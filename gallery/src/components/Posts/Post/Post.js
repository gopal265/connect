import React, { useEffect,useState } from 'react'
import "./post.css"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost } from '../../../actions/Posts'
import Avatar from '../../common/avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { addRemoveFriend, getUserFriends } from '../../../actions/User'

const Post = ({ post }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)
  const { user: currentUser } = useSelector(state => state.auth)
  console.log(currentUser)
  const friends = useSelector(state => state.auth.user.friends)

  const [isFriend, setIsFriend] = useState(null)

  console.log(currentUser,friends)
  const handleClick = () => {
    dispatch(addRemoveFriend({ id: currentUser._id, friendId: post.userId, token: token }))
    setIsFriend(!isFriend)
    

  }
  const handleLike = () =>{
    dispatch(likePost({id:post._id,userId :currentUser._id}))

  }
  useEffect(()=>{
   
    if (friends.includes(post.userId)){
      setIsFriend(true)
    }
    else{
      setIsFriend(false)
    }
  },[])
 
  return (

    <div className='col-12 card-wrapper'>
      <div className="card">
        <div className='post-head'>
          <div className='profile-avatar' onClick={() => navigate(`/profile/${post.userId}`)}>
            <Avatar userName={post.userName} image={post.picture} />
            <div className='profile-avatar-content'>
              <h6 className='profile-avatar-name'>{post.firstName}</h6>
              <p className="time-indicator">{moment(post.createdAt).fromNow()}</p>
            </div>
          </div>
          {
            currentUser._id !== post.userId ? (
              <div onClick={handleClick} className='icon'>
              {
                ( isFriend ) ? (
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
            ) :(
              <></>
            )
          }
         
        </div>

        <img src={post.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">{post.description}</p>
          <div className='post-buttons'>

           <p onClick={handleLike}><i class="fa-solid fa-thumbs-up"></i>{Object.keys(post.likes).length}</p> 
            <p><i class="fa-solid fa-trash-can"></i></p>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Post
