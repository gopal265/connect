import axios from "axios";

const url ="http://localhost:5000/posts";

export const getPosts = () => axios.get(url)

export const getUserPosts = (id) => axios.get(`${url}/${id}`)

export const createPost = (newPost) => axios.post(url,newPost)

export const likePost = (id,userId) => axios.patch(`${url}/${id}`,{userId:userId})

export const deletePost = (id) => axios.patch(`${url}/${id}`)

