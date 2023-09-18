import axios from "axios";

 const url ="https://connect-01yh.onrender.com/users";


export const getUser =(id,config) => axios.get(`${url}/${id}`,config)

export const getUserFriends  = (id,config) => axios.get(`${url}/${id}/friends`,config)

export const searchUser = (userName) => axios.get(`${url}/${userName}/search`)

export const addRemoveFriend = (id,friendId,config) => axios.patch(`${url}/${id}/${friendId}`,'',config)

export const updateUser = (id,data,config) => axios.patch(`${url}/${id}`,data,config)

export const viewedProfile = (id,userId,config) => axios.patch(`${url}/${id}/profileviewed`,userId,config)

export const likedProfile = (id,userLikedId,config) => axios.patch(`${url}/${id}/${userLikedId}/profileliked`,'',config)