import React,{useState,useEffect} from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'


const Posts = () => {
  const posts = useSelector((state) => state.posts.posts)

  console.log("post-render")
  return (
    <>
      <div className='container-fluid posts-wrapper'>
        <div className='row '>
          {posts.map(post => (
     
            <Post post={post}  />
           
          
          ))}
        </div>
      </div>
    </>
  )
}

export default Posts
