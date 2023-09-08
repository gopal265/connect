import axios from "axios";

 const url ="http://localhost:5000/users";


export const getUser =(id,config) => axios.get(`${url}/${id}`,config)

export const getUserFriends  = (id,config) => axios.get(`${url}/${id}/friends`,config)

export const addRemoveFriend = (id,friendId,config) => axios.patch(`${url}/${id}/${friendId}`,'',config)

export const updateUser = (id,data,config) => axios.patch(`${url}/${id}`,data,config)