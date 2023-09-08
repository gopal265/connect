import React, { useEffect, useState } from 'react'
import "./post.css"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import {  commentPost, likePost } from '../../../actions/Posts'
import Avatar from '../../common/avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { addRemoveFriend, getUserFriends } from '../../../actions/User'

const Post = ({ post }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showComments,setShowComments] = useState(false)
  const [commentText,setCommentText] = useState('add comment')
  const token = useSelector(state => state.auth.token)
  const { user: currentUser } = useSelector(state => state.auth)
  console.log(currentUser)
  const friends = useSelector(state => state.auth.user.friends)

  const [isFriend, setIsFriend] = useState(null)

  console.log(currentUser, friends)
  const handleClick = () => {
    dispatch(addRemoveFriend({ id: currentUser._id, friendId: post.userId, token: token }))
    setIsFriend(!isFriend)


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
  }, [])

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

        <img src={post.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">{post.description}</p>
          <div className='post-buttons'>
            <div className='post-buttons'>
              <p onClick={handleLike}><i class="fa-solid fa-thumbs-up"></i>{Object.keys(post.likes).length}</p>
              <p onClick={toggleComments}><i class="fa-regular fa-message">{post.comments.length}</i></p>
            </div>
            <p><i class="fa-solid fa-trash-can"></i></p>
          </div>
          {showComments && (
                <div className="comments " >

                  {post.comments.map((comment) => (
                    <div  className="mb-3">
                      <img
                        src= {comment.user.picture}
                        alt='wait'
                        className="mr-3"
                        width={64}
                        height={64}
                      />
                      <div>
                        <h5 className="mt-0">{comment.user.userName}</h5>
                        {comment.text}
                      </div>
                    </div>
                  ))}

                  <form className="mt-3">
                    <>
                      <input
                        type="textarea"
                        rows={3}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                    </>
                    <p onClick={addComment}  >
                    <i class="fa-solid fa-paper-plane"></i>
                    </p>
                  </form>
                </div>
              )}

        </div>
      </div>
    </div>

  )
}

export default Post
