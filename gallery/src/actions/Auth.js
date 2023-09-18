import * as api  from "../api/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registerUser = createAsyncThunk(
    "register",
    async (user,{rejectWithValue}) =>{
        try {
            const response = await api.register(user)
            return response.data
        } catch (error) {
            console.log(error.response.data)
            return rejectWithValue(error.response.data.message)
        }
        
    }
)


export const  login = createAsyncThunk(
    "login",
    async (user,{rejectWithValue})  =>{
        try {
            const {data} = await api.login(user)
            return data
        } catch (error) {
       
            return rejectWithValue(error.response.data.message)
            }
        }
    
)

export const forgetPassword = createAsyncThunk(
    'forgetPassword',
    async(email) =>{
        try {
            const {data} = await api.forgetPassword(email)
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const confirmOtp = createAsyncThunk(
    'confirmOtp',
    async (d) =>{
        try {
            const {data} = await api.confirmOtp(d)
            return data

        } catch (error) {
            
        }
    }
)

export const resetPassword = createAsyncThunk(
    'resetPassword',
    async (d) =>{
        try {
            const {data} = await api.resetPassword(d)
            return data
        } catch (error) {
            
        }
    }
)