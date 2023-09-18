import * as api from "../api/user"
import { createAsyncThunk } from "@reduxjs/toolkit"



export const getUser = createAsyncThunk(
    "getUser",
    async (data) =>{
        try {
            let config = {
                headers :{
                    Authorization : `Bearer ${data.token}`
                }
            }
            const response = await api.getUser(data.id,config)
        
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }
)

export const getUserFriends = createAsyncThunk(
    'getUserFriends',
    async (data) =>{
        try {
            let config = {
                headers :{
                    Authorization : `Bearer ${data.token}`
                }
            }
            
            const response = await api.getUserFriends(data.id,config)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const addRemoveFriend = createAsyncThunk(
    "addRemoveFriend",
    async (data) =>{
        try {
            let config = {
                headers :{
                    Authorization : `Bearer ${data.token}`
                }
            }
            const response = await api.addRemoveFriend(data.id,data.friendId,config)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const updateUser = createAsyncThunk(
    "updateUser",
    async (data) =>{
        try {
            let config = {
                headers :{
                    Authorization : `Bearer ${data.token}`
                }
            }
            const response = await api.updateUser(data.id,data.data,config)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const searchUser = createAsyncThunk(
    'searchUser',
    async (userName) =>{
        try {
            // let config = {
            //     headers :{
            //         Authorization : `Bearer ${data.token}`
            //     }
            // }
            const response = await api.searchUser(userName)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const viewedProfile = createAsyncThunk(
    'viewedProfile',
    async(data,{rejectWithValue}) =>{
        try {
            let config = {
                headers :{
                    Authorization : `Bearer ${data.token}`
                }
            }
            const response = await api.viewedProfile(data.id,data.userId,config)
            return response.data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const likedProfile = createAsyncThunk(
    "likedProfile",
    async (data) =>{
        try {
            let config = {
                headers :{
                    Authorization : `Bearer ${data.token}`
                }
            }
            const response = await api.likedProfile(data.id,data.userLikedId,config)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)