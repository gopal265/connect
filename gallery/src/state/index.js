import {createSlice} from "@reduxjs/toolkit"
import { registerUser,login, forgetPassword, confirmOtp, resetPassword } from "../actions/Auth";

import { addRemoveFriend, getUser, getUserFriends, likedProfile, searchUser, updateUser, viewedProfile } from "../actions/User";





const initialState = {

    mode : "light",
    loading:true,
    user : null,
    token: null,
    error:null,
    success : false,
    message:'',
    friends : [],
    profileUser: null,
    searchUser:null,
    status :{
        updateUser : true,
        searchUser : true,
        profileUser:true

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
        },
        setSearchUser : (state) =>{
            state.status.searchUser = true
        },
        setProfilUser: (state) =>{
            state.status.profileUser =true
        }

    },
    extraReducers : (builder) =>{
        builder
        .addCase(registerUser.fulfilled,(state,action) =>{
            state.loading = false
            state.success = true
            state.error = null

        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(login.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(login.rejected,(state,action) =>{
            state.loading = false
            state.error = action.payload
           
        })
        .addCase(login.fulfilled,(state,action) =>{
            state.loading = false
            state.user =  action.payload.user
            state.token = action.payload.token
            state.error = null
           
        })
        .addCase(getUser.pending,(state,action)=>{
            state.status.profileUser = true
        })
        .addCase(getUser.fulfilled,(state,action) =>{
            state.profileUser = action.payload
            state.status.profileUser = false
        })
        .addCase(getUser.rejected,(state,action) =>{
            state.error =  action.payload
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
        .addCase(searchUser.fulfilled,(state,action)=>{
            state.searchUser = action.payload
            state.status.searchUser = false
        })
        .addCase(searchUser.rejected,(state,action) =>{
            state.error = action.payload
        })
        .addCase(viewedProfile.fulfilled,(state,action)=>{
            state.user = action.payload
            state.error = null
            
        })
        .addCase(viewedProfile.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(likedProfile.fulfilled,(state,action) =>{
            state.profileUser = action.payload
        })
        .addCase(likedProfile.rejected,(state,action) =>{
            state.error = action.payload
        })
        .addCase(forgetPassword.fulfilled,(state,action) =>{
            state.message = action.payload.message
        })
        .addCase(forgetPassword.rejected,(state,action) =>{
            state.error = action.payload
        })
        .addCase(confirmOtp.fulfilled,(state,action) => {
            state.message = action.payload.message
        })
        .addCase(resetPassword.fulfilled,(state,action) =>{
            state.message = action.payload.message
        })

    }
})

export const {setMode,setUserStatus,setLogOut,setSearchUser,setProfilUser} = authSlice.actions;
export default  authSlice.reducer;