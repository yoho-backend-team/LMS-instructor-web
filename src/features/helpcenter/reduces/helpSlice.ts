import { createSlice } from "@reduxjs/toolkit";


const helpSlice=createSlice({
    name:'helpSlice',
    initialState:{
 data:[],
    },
    reducers:{
        getHelp:(state,action)=>{
            state.data=action.payload;
        },
        
    }
});

export const {getHelp}=helpSlice.actions;

export default helpSlice.reducer;