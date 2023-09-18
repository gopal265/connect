import { createSlice } from "@reduxjs/toolkit";
import { commentPost, createPost, deletePost, getPosts, likePost,getUserPosts } from "../actions/Posts";

const initialState = {
    posts : [],
    error :null
}

export const postsSlice = createSlice({
    name :"posts",
    initialState,
    reducers:{

    },
    extraReducers: (builder) =>{
        builder
        .addCase(createPost.fulfilled,(state,action)=>{
            state.posts = action.payload
        })
        .addCase(createPost.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(getPosts.fulfilled,(state,action) =>{
            state.posts = action.payload

        })
        .addCase(getPosts.rejected,(state,action) =>{
            state.error = action.payload
        })
        .addCase(getUserPosts.fulfilled,(state,action) =>{
            state.posts = action.payload
        })
        .addCase(getUserPosts.rejected,(state,action) =>{
            state.error = action.payload
        })
        .addCase(likePost.fulfilled,(state,action) =>{
            state.posts = state.posts.map(post => post._id ===  action.payload._id ? action.payload : post)
        })
        .addCase(likePost.rejected,(state,action) =>{
            state.error = action.payload
        })
        .addCase(commentPost.fulfilled,(state,action)=>{
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            
        })
        .addCase(commentPost.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(deletePost.fulfilled,(state,action) =>{
            state.posts = action.payload
        })
        .addCase(deletePost.rejected,(state,action) =>{
            state.error = action.payload
        })

    }
})

export default postsSlice.reducer