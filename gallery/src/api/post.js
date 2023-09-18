import axios from "axios";

const url ="https://connect-01yh.onrender.com/posts";

export const getPosts = () => axios.get(url)

export const getUserPosts = (id) => axios.get(`${url}/${id}`)

export const createPost = (newPost) => axios.post(url,newPost)

export const likePost = (id,userId) => axios.patch(`${url}/${id}`,{userId:userId})

export const commentPost = (id,data) => axios.patch(`${url}/${id}/comments`,data)

export const deletePost = (id) => axios.delete(`${url}/${id}`)

