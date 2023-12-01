import React from 'react'
import Post from '../../Component/PostContainer/Post'
import { useLocation } from 'react-router-dom'
import Navbar from '../../Component/Navbar/Navbar';
import "./PostPage.css"
const PostPage = () => {
    const {state} = useLocation();
    console.log(state)
    return (

    <div className='center-col'>
        <Navbar />
        <div className='postpagecontainer'>
        <Post post={state} />
        </div>
    </div>
  )
}

export default PostPage
