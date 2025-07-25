import { createSlice } from "@reduxjs/toolkit";


const communitySlice = createSlice({
  name: 'communities',
  initialState: {
    data: [],
    loading: true
  },
  reducers: {
    setCommunities: (state, action) => {
      state.data = action.payload;
    },
    setMessage: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setCommunities, setMessage } = communitySlice.actions;
export default communitySlice.reducer;
