import * as api  from "../api/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const registerUser = createAsyncThunk(
    "register",
    async (user) =>{
        try {
            const response = await api.register(user)
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }
)


export const  login = createAsyncThunk(
    "login",
    async (user)  =>{
        try {
            const {data} = await api.login(user)
            return data
        } catch (error) {
            console.log(error)
            }
        }
    
)

