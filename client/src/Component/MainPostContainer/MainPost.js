import React from 'react'
import "./mainPost.css";
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from '../PostContainer/Post';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
export default function MainPost() {
  const {user,token} = useSelector((state)=>state.user);
  const [post , setPost] = useState([]);
  useEffect(() => {
   const getPost = async()=>{
    try {
      const res = await axios.get(`https://connect-01yh.onrender.com/api/user/flw/${user._id}` , {
        headers:{
          token: token
        }
      })
      setPost(res.data);
    } catch (error) {
      
    }
   }
   getPost();
  }, [])

  console.log(post);
  
  return (
    <div className='container-fluid'>
      <ContentPost/>
      <div className='row'>
      {post.map((item)=>(
        <div className='col-12'>
          <Post post={item}/>
          </div>
      ))}
      </div>
      
    </div>
  )
}
