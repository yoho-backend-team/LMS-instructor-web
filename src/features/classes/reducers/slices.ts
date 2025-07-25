import { createSlice } from "@reduxjs/toolkit";


const ClassSlice = createSlice({
    name: 'classSlice',
     initialState: {
        data: [],
    },
    reducers: {
        getclassdetails: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { getclassdetails } = ClassSlice.actions;
export default ClassSlice.reducer;