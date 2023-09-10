import React, { useEffect, useState } from 'react'
import "./post.css"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import {  commentPost, deletePost, likePost } from '../../../actions/Posts'
import Avatar from '../../common/avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { addRemoveFriend, getUserFriends } from '../../../actions/User'
import { setAddRemoveFriends } from '../../../state'
import Comment from '../../comments/comment'

const Post = ({ post }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showComments,setShowComments] = useState(false)
  const [commentText,setCommentText] = useState('')
  const token = useSelector(state => state.auth.token)
  const { user: currentUser } = useSelector(state => state.auth)
  const addRemoveFriends = useSelector(state => state.auth.status.addRemoveFriends)
  console.log(currentUser)
  const friends = useSelector(state => state.auth.user.friends)

  const [isFriend, setIsFriend] = useState(null)

  console.log(currentUser, friends)
  const handleClick = () => {
    dispatch(addRemoveFriend({ id: currentUser._id, friendId: post.userId, token: token }))
        if(addRemoveFriends){
            console.log("AddRemove is pending")
        }
        else{
            setIsFriend(!isFriend)
            dispatch(setAddRemoveFriends())
        }
   


  }
  const handleLike = () => {
    dispatch(likePost({ id: post._id, userId: currentUser._id }))

  }
  const toggleComments = () =>{
    setShowComments(!showComments)
  }
  const addComment = () =>{

       dispatch(commentPost({id :post._id,data : {userId:currentUser._id,commentText:commentText}}))
  }
  useEffect(() => {

    if (friends.includes(post.userId)) {
      setIsFriend(true)
    }
    else {
      setIsFriend(false)
    }
  }, [friends])

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
                  (isFriend) ? (
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
            ) : (
              <></>
            )
          }

        </div>
        <p className="card-text p-2 icon-small">{post.description}</p>
        <img src={post.image} className="card-img-top" alt="..." />
        <div className="card-body">
         
          <div className='post-buttons'>
            <div className='post-buttons'>
              <p className="icon-medium mr-3" onClick={handleLike}><i class="fa-regular fa-thumbs-up "></i> {Object.keys(post.likes).length}</p>
              <p onClick={toggleComments} className='icon-medium'><i class="fa-regular fa-message"></i> {post.comments.length}</p>
            </div>
            {
              currentUser._id === post.userId && 
              <p onClick={() => dispatch(deletePost(post._id))}><i class="fa-solid fa-trash-can icon-small"></i></p>
            }
            
          </div>
          {showComments && (
            
                <div className="comments " >
                  <div className='center-v pr-2 pt-3 pb-3'>
                      <input
                      className='full-width mr-2 comment-text'
                        type="text"
                        value={commentText}
                        placeholder="Add a comment"
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                   
                    <p onClick={addComment}   >
                    <i class="fa-solid fa-paper-plane"></i>
                    </p>
                    </div>

                  {post.comments.map((comment) => (
                    <Comment comment ={comment} />
                  ))}

                 
                    
                  
                </div>
              )}

        </div>
      </div>
    </div>

  )
}

export default Post
