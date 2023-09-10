import * as api from "../api/post" 
import { createAsyncThunk } from "@reduxjs/toolkit";
// action creators

export const getPosts = createAsyncThunk(
    "getPosts",
    async () =>{
        try {
            const response = await api.getPosts()
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }
)

export const createPost = (newPost) => async(dispatch) =>{
    try {
        const {data} = await api.createPost(newPost);
        dispatch({type:"Create",payload:data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserPosts = createAsyncThunk(
    "getUserPosts",
    async (id) =>{
        try {
            const response = await api.getUserPosts(id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const likePost = createAsyncThunk(
    "likePost",
    async (data) =>{
        try {
            const response = await api.likePost(data.id,data.userId)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

)

export const commentPost = createAsyncThunk(
    "commentPost",
    async (data) =>{
        try {
            const response = await api.commentPost(data.id,data.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deletePost = createAsyncThunk(
    'deletePost',
    async (id) =>{
        try {
            const response = await api.deletePost(id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)