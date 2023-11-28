import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
          name:"User",
          initialState:{
                    user:null,
                    loading:false,
                    status : null,
                    error: null
          },
          reducers:{
                    loginStart:(state)=>{
                              state.loading = true
                    },
                    loginSuccess:(state , action)=>{
                              state.loading = false;
                              state.user = action.payload.user;
                              state.token = action.payload.token;
                              state.error = null;
                    },
                    loginFailure:(state,action)=>{
                              state.loading = false;
                              state.error =  action.payload
                    },
                    logout:(state)=>{
                              state.user = null
                              state.error = null
                    },
          },
})

export const {loginStart , loginSuccess , loginFailure , logout} = userReducer.actions;

export default userReducer.reducer;