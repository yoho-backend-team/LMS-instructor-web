import { createSlice } from '@reduxjs/toolkit';

const   TicketSlice = createSlice({
	name: 'TicketSlice',
	initialState: {
		data: [],
        
	},
	reducers: {
		getticketdetails: (state, action) => {
			state.data = action.payload;

		},
		createticketdeatils: (state,action) =>{
			state.data = action.payload;
		}
		
	},
});

export const { getticketdetails, createticketdeatils } = TicketSlice.actions;
export default TicketSlice.reducer;
