import React, { useEffect, useState } from 'react'
import "./post.css"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import {  commentPost, deletePost, likePost } from '../../../actions/Posts'
import Avatar from '../../common/avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import Comment from '../../comments/comment'
import AddRemoveFriend from '../../AddRemoveFriend/AddRemoveFriend'
import { getUser } from '../../../actions/User'
const Post = ({ post }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showComments,setShowComments] = useState(false)
  const [commentText,setCommentText] = useState('')
  const { user: currentUser } = useSelector(state => state.auth)  
  const token = useSelector(state => state.auth.token)
  console.log(post)
 
 const navigateTOProfile = () =>{
  
    dispatch(getUser({id:post.userId,token:token}))
      navigate(`/profile/${post.userId}`)
  
 }
  const handleLike = () => {
    dispatch(likePost({ id: post._id, userId: currentUser._id }))

  }
  const toggleComments = () =>{
    setShowComments(!showComments)
  }
  const addComment = () =>{

       dispatch(commentPost({id :post._id,data : {userId:currentUser._id,commentText:commentText}}))
       setCommentText('')
  }

  return (

    <div className='col-12 card-wrapper'>
      <div className="card">
        <div className='post-head'>
          <div className='profile-avatar' onClick={navigateTOProfile}>
            <Avatar userName={post.userName} image={post.picture} />
            <div className='profile-avatar-content'>
              <h6 className='profile-avatar-name'>{post.userName}</h6>
              <p className="time-indicator">{moment(post.createdAt).fromNow()}</p>
            </div>
          </div>
          {
            currentUser._id !== post.userId ? (
             <AddRemoveFriend  postUserId={post.userId} />
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
              <p className={`icon-medium mr-3 ${post.likes[currentUser._id] ? "blue" : " "}`} onClick={handleLike}><i class={`fa-regular fa-thumbs-up `}></i> {Object.keys(post.likes).length}</p>
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

export default React.memo(Post)
