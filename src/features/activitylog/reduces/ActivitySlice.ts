import { createSlice } from "@reduxjs/toolkit";

const ActivitySlice =createSlice({
    name:'ActivitySlice',
    initialState:{
        data:[],
        loading: true,
    },
    reducers:{
       setActivityLogs: (state, action) => {
      state.data = action.payload;
    },
        setLoading: (state, action) => {
      state.loading = action.payload;
    },
       }
    })

export const {setActivityLogs,setLoading} =ActivitySlice.actions;   
export default ActivitySlice.reducer; 