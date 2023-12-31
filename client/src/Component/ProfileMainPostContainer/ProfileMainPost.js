import React, { useEffect } from 'react'
import "./profilemainPost.css";
import Coverimage from "../Images/Profile.png"
import ContentPost from "../ContentPostContainer/ContentPost"
import Post from '../PostContainer/Post';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function ProfileMainPost() {
  const [post , setPost] = useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  useEffect(() => {
    const getPost = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/post/get/post/${id}`)
        const sorted =  res.data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
        console.log(res.data,sorted)
        setPost(sorted);
      } catch (error) {
        console.log("error occured")
      }
    }
    getPost();
  }, [id])
  
  return (
    <div className='container-fluid'>
      <div className='center-col'>
        <img src={`${Coverimage}`} className="profileCoverimage full-width" alt="" />
        <h2 style={{marginTop:-43 , color:"white" , textAlign:"start" , marginLeft:"34px"}}>Your Profile</h2>
      </div>
      <div className='container-fluid'>
        <div className='px-2'>
        <ContentPost/>
        </div>
      <div className='row'>
      {post.map((item)=>(
        <div className='col-12'>
          <Post post={item}/>
          </div>
      ))}
      </div>
    </div>
    </div>
  )
}
