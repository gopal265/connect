import axios from "axios";
import {loginStart , loginSuccess , loginFailure , logout} from "./userReducer";

export const login = async(dispatch , user)=>{
          dispatch(loginStart());
          try {
                   const res = await axios.post("http://localhost:5000/api/user/login" , user);
                   dispatch(loginSuccess(res.data)); 
          } catch (error) {
                    dispatch(loginFailure(error.response.data.error));
          }
}

export const VerifyEmail = async(dispatch , user)=>{
          dispatch(loginStart());
          try {
                   const res = await axios.post("http://localhost:5000/api/user/verify/email" , user);
                   res.data.Status = "";
                   dispatch(loginSuccess(res.data)); 
          } catch (error) {
                    dispatch(loginFailure());
          }
}


export const signup = async(dispatch , user)=>{
          dispatch(loginStart());
          try {
                   const res = await axios.post("http://localhost:5000/api/user/create/user" , user);
                   dispatch(loginSuccess(res.data)); 
          } catch (error) {
                    dispatch(loginFailure("register failed"));
          }
}

export const update = async(dispatch , user)=>{
    dispatch(loginStart());
    try {
             const res = await axios.post("http://localhost:5000/api/user/create/user" , user);
             dispatch(loginSuccess(res.data)); 
    } catch (error) {
              dispatch(loginFailure("update failed"));
    }
}

export const createPost = async(dispatch,post) =>{

    dispatch()
}