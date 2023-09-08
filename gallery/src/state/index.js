import {createSlice} from "@reduxjs/toolkit"
import { registerUser,login } from "../actions/Auth";
import { commentPost, getPosts, likePost } from "../actions/Posts";
import { addRemoveFriend, getUser, getUserFriends, updateUser } from "../actions/User";
import { getUserPosts } from "../actions/Posts";


const initialState = {

    mode : "light",
    loading:true,
    user : null,
    token: null,
    error:null,
    success : false,
    posts : [],
    friends : [],
    profileUser: null,
    status :{
        updateUser : true,

    }
   
}

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setMode : (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setUserStatus : (state) =>{
            state.status.updateUser = true
        },
        setLogOut : (state) =>{
            state.user = null
            state.token  = null
        }

    },
    extraReducers : (builder) =>{
        builder
        .addCase(registerUser.fulfilled,(state,action) =>{
            state.loading = false
            state.success = true

        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(login.fulfilled,(state,action) =>{
            state.loading = false
            state.user =  action.payload.user
            state.token = action.payload.token
           
        })
        .addCase(login.rejected,(state,action) =>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(getPosts.fulfilled,(state,action) =>{
            state.posts = action.payload

        })
        .addCase(getPosts.rejected,(state,action) =>{
            state.error = action.payload
        })
        .addCase(getUserFriends.fulfilled,(state,action) =>{
            state.friends = action.payload
        })
        .addCase(getUserFriends.rejected,(state,action) => {
            state.error = action.payload
        })
        .addCase(addRemoveFriend.fulfilled,(state,action)=>{
            state.friends = action.payload
        })
        .addCase(addRemoveFriend.rejected,(state,action) =>{
            state.error = action.payload
        })
        .addCase(getUser.fulfilled,(state,action) =>{
            state.profileUser = action.payload
        })
        .addCase(getUser.rejected,(state,action) =>{
            state.error =  action.payload
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
        .addCase(updateUser.pending,(state,action) =>{
            state.status.updateUser = true
        })
        .addCase(updateUser.fulfilled,(state,action) =>{
            state.user =  action.payload
            state.status.updateUser = false
        })
        .addCase(updateUser.rejected,(state,action) =>{
            state.error = action.payload
            state.loading = false
        })
        .addCase(commentPost.fulfilled,(state,action)=>{
            
        })
        .addCase(commentPost.rejected,(state,action)=>{
            state.error = action.payload
        })

    }
})

export const {setMode,setUserStatus,setLogOut} = authSlice.actions;
export default  authSlice.reducer;