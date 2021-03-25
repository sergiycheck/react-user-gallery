import { createSlice } from '@reduxjs/toolkit';

export const messageCounterSlice = createSlice({
  name: 'messageCounter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
	 increment, 
	 decrement, 
	 incrementByAmount } = messageCounterSlice.actions;

//selector
export const selectCount = state => state.messageCounter.value;

export default messageCounterSlice.reducer;