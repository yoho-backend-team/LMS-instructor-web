import { createSlice } from '@reduxjs/toolkit';

const PaymentSlice = createSlice({
    name: 'PaymentSlice',
    initialState: {
        data: [],
    },
    reducers: {
        getPayment: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { getPayment } = PaymentSlice.actions;
export default PaymentSlice.reducer;
