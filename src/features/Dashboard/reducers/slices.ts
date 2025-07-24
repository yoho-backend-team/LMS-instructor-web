import { createSlice } from "@reduxjs/toolkit";

const DashBoardSlice = createSlice({
    name: 'DashBoard',
    initialState: {
        data: []
    },
    reducers: {
        setDashBoard: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { setDashBoard } = DashBoardSlice.actions

export default DashBoardSlice.reducer