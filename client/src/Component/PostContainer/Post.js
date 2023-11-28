import React, { useState } from 'react'
import "./post.css";
import ProfileImage from "../Images/Profile.png"
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import Shareicon from "../Images/share.png";
import Moreoption from "../Images/more.png";
import anotherlikeicon from "../Images/setLike.png"
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function Post({post}) {
  const {user,token} = useSelector((state)=>state.user);
  const [postUser , setPostUser] = useState([]);
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res  = await axios.get(`https://connect-01yh.onrender.com/api/user/post/user/details/${post.user}`)
        setPostUser(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  const [Like, setLike] = useState([post.like.includes(user._id) ? anotherlikeicon : LikeIcon]);
  const [count, setCount] = useState(post.like.length);
  const [Comments, setComments] = useState(post.comments);
  const [commentwriting, setcommentwriting] = useState('');
  const [show, setshow] = useState(false);
  
  
  const handleLike = async() => {
    if (Like == LikeIcon) {
      await fetch(`https://connect-01yh.onrender.com/api/post/${post._id}/like` , {method:"PUT" , headers:{'Content-Type':"application/Json" , token:token}})
      setLike(anotherlikeicon);
      setCount(count + 1);
    } else {
      await fetch(`https://connect-01yh.onrender.com/api/post/${post._id}/like` , {method:"PUT" , headers:{'Content-Type':"application/Json" , token: token}})
      setLike(LikeIcon)
      setCount(count - 1);
    }
  }

  const addComment = async() => {
    const comment = {
      "postid": `${post._id}`,
      "username": `${user?.username}`,
      "comment": `${commentwriting}`,
      "profile":`${user?.profile}`
    }
    await fetch(`https://connect-01yh.onrender.com/api/post/comment/post` , {method:"PUT" , headers:{'Content-Type':"application/Json" , token:token} , body:JSON.stringify(comment)})
    setComments(Comments.concat(comment));
  }

  const handleComment = () => {
    addComment();
  }

const handleshow = ()=>{
  if(show === false){
    setshow(true)
  }else{
    setshow(false)
  }
}

  return (
    <div className='container-fluid py-3'>
      <div className='post-outer-container'>
        <div className='full-width'>
          <div className='post-head pb-3'>
            {postUser.profile == ""? <img src={`${ProfileImage}`} className="PostImage" alt="" /> : <img src={`${postUser.profile}`} className="PostImage" alt="" />}
            
            <div className='ps-3'>
              <p className='post-user'>{postUser.username}</p>
              {/* <p className=''></p> */}
            </div>
            <img src={`${Moreoption}`} className="moreicons" alt="" />
          </div>
          <p className='ps-4'>{post.title}</p>
          {post.image !== '' ? 
           <img src={`${post.image}`} className="full-width" alt="" />: post.video !== '' ? <video className="PostImages" width="500" height="500" controls >
           <source src={`${post.video}`} className='full-width' type="video/mp4"/>
          </video> : ''
          }
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-auto center'>
                <img src={`${Like}`} className="iconsforPost" onClick={handleLike} alt="" />
                <p className='pt-3 ps-2'>{count} Likes</p>
              </div>
              <div className='col-auto center'>
                <img src={`${CommentIcon}`} className="iconsforPost" onClick={handleshow} alt="" />
                <p className='pt-3 ps-2'>{Comments.length} Comments</p>
              </div>
              <div className='col-auto center share-option'>
              <img src={`${Shareicon}`} className="iconsforPost" alt="" />
              <p className='pt-3 ps-2'>Share</p>
            </div>
            </div>
          
          </div>
          {show === true ?
          <div style={{padding:'10px'}}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${user.profile}`} className="PostImage" alt="" />
              <input type="text" className='commentinput' placeholder='Write your thought' onChange={(e) => setcommentwriting(e.target.value)} />
              <button className='addCommentbtn' onClick={handleComment}>Post</button>
            </div>
            {Comments.map((item) => (
              <div style={{ alignItems: "center" }}>
                <div style={{display:"flex" , alignItems:"center"}}> 
                {item.profile === '' ? 
                  <img src={`https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} className="PostImage" alt="" /> : <img src={`${item.profile}`} className="PostImage" alt="" />
                }
                  <p style={{ marginLeft: "6px" , fontSize:18, marginTop:6 }}>{item.username}</p>
                </div>
                <p style={{ marginLeft: "55px" , textAlign:'start' , marginTop:-16 }}>{item.comment}</p>
                <p style={{ marginLeft: "55px" , textAlign:'start' , marginTop:-10 , color:"#aaa" , fontSize:11}}>Reply</p>
                
              </div>

            ))}
          </div>:''
           }
        </div>
      </div>
    </div>
  )
}
