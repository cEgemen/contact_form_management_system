import { createSlice } from "@reduxjs/toolkit";
 
  const initialState = {userData:{id :null , username:null,password:null,role:null,image:null}}
 
 const userReducer =  createSlice({
    name:"user",
    initialState,
    reducers:{
        addUserInformation(state,action){
            state.userData = action.payload
        },
        removeUserInformation(state){
             state.userData = {userData:{id :null , username:null,password:null,role:null,image:null}}
        }
    }
  })

  export const actions = userReducer.actions;
  export const uReducer =  userReducer.reducer