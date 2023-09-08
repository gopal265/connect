import React,{useState,useEffect} from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/Posts'

const Posts = () => {
  const posts = useSelector((state) => state.auth.posts)
  const dispatch = useDispatch()
  console.log("post-render")

  useEffect(() =>{
    dispatch(getPosts())
    console.log("post-effect")
  },[])
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
