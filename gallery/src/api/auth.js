import axios from "axios"

const url ="http://localhost:5000/auth";

export const register = (newUser) =>axios.post(`${url}/register`,newUser)

export const login = (user) => axios.post(`${url}/login`,user)
