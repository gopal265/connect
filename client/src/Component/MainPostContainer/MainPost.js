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
      const res = await axios.get(`http://localhost:5000/api/user/flw/${user._id}` , {
        headers:{
          token: token
        }
      })
      const sorted =  res.data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
      console.log(res.data,sorted)
      setPost(sorted);
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
          <Post post={item} key={item._id}/>
          </div>
      ))}
      </div>
      
    </div>
  )
}
