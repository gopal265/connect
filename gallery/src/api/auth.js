import axios from "axios"

const url ="http://localhost:5000/auth";

export const register = (newUser) =>axios.post(`${url}/register`,newUser)

export const login = (user) => axios.post(`${url}/login`,user)

export const forgetPassword = (email) => axios.post(`${url}/forgetpassword`,email)

export const confirmOtp = (data) => axios.post(`${url}/verifyotp`,data)

export const resetPassword = (data) => axios.patch(`${url}/resetpassword`,data)