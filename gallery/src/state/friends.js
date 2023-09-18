import { createSlice } from "@reduxjs/toolkit";
import { getUserFriends,addRemoveFriend } from "../actions/User";

const initialState = {
    friends : [],
    friendsIds:[],
    error : null,
    status : {
        addRemoveFriends : true
    }
}

const friendsSlice = createSlice({
    name :"friends",
    initialState,
    reducers:{
        setAddRemoveFriends : (state)=>{
            state.status.addRemoveFriends = true
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getUserFriends.fulfilled,(state,action) =>{
            state.friends = action.payload.friends
            state.friendsIds =action.payload.friendsIds
        })
        .addCase(getUserFriends.rejected,(state,action) => {
            state.error = action.payload
        })
        .addCase(addRemoveFriend.pending,(state) =>{
            state.status.addRemoveFriends = true
        })
        .addCase(addRemoveFriend.fulfilled,(state,action)=>{
            state.friends = action.payload.friendsList
            state.friendsIds = action.payload.friends
        })
        .addCase(addRemoveFriend.rejected,(state,action) =>{
            state.error = action.payload
        })

    }
})
export const {setAddRemoveFriends} = friendsSlice.actions
export default friendsSlice.reducer