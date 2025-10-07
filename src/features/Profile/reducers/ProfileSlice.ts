/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const ProfileSlice = createSlice({
    name: 'ProfileSlice',
    initialState: {
        data: [],
    },
    reducers: {
        getProfile: (state, action) => {
            state.data = action.payload;
        },
        getStaffId: (state, action) => {
            state.data = action.payload;
        },
        updateProfile: (state: any, action) => {
            if (state.data) {
                state.data = {
                    ...state.data,
                    ...action.payload,
                    contact_info: {
                        ...state.data.contact_info,
                        ...action.payload.contact_info
                    }
                }
            }
        },
    },
});

export const { getProfile, updateProfile, getStaffId } = ProfileSlice.actions;
export default ProfileSlice.reducer;
